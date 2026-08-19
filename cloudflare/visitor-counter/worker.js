const ALLOWED_ORIGINS = new Set([
  "https://nikoschultz.com",
  "https://www.nikoschultz.com",
]);

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
    "Cache-Control": "no-store",
  };
}

function isAllowedOrigin(request) {
  const origin = request.headers.get("Origin");
  return origin && ALLOWED_ORIGINS.has(origin) ? origin : null;
}

function isBot(userAgent) {
  return /bot|crawler|spider|slurp|headless|preview/i.test(userAgent);
}

async function visitorHash(ipAddress, userAgent, salt) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(salt),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`${ipAddress}|${userAgent}`),
  );

  return [...new Uint8Array(signature)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default {
  async fetch(request, env) {
    const origin = isAllowedOrigin(request);

    if (request.method === "OPTIONS") {
      if (!origin) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const { pathname } = new URL(request.url);
    if (pathname !== "/track" || request.method !== "POST") {
      return new Response("Not found", { status: 404 });
    }

    if (!origin) {
      return new Response("Origin not allowed", { status: 403 });
    }

    const ipAddress = request.headers.get("CF-Connecting-IP");
    const userAgent = request.headers.get("User-Agent") || "";

    if (!ipAddress || isBot(userAgent)) {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const now = new Date().toISOString();
    const hash = await visitorHash(ipAddress, userAgent, env.HASH_SALT);

    await env.VISITOR_DB.prepare(
      `INSERT INTO visitors (visitor_hash, first_seen, last_seen)
       VALUES (?, ?, ?)
       ON CONFLICT(visitor_hash)
       DO UPDATE SET last_seen = excluded.last_seen`,
    )
      .bind(hash, now, now)
      .run();

    // Retain only pseudonymous visit markers from the last 180 days.
    // The raw IP and User-Agent are used only in this request and are never written.
    if (Math.random() < 0.02) {
      await env.VISITOR_DB.prepare(
        "DELETE FROM visitors WHERE last_seen < datetime('now', '-180 days')",
      ).run();
    }

    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  },
};
