# Privacy-Conscious Visitor Counter

This folder contains a small Cloudflare Worker and D1 database schema for counting **unique website visitors**. It is designed for the free Cloudflare plan and can be configured from the Cloudflare dashboard without using a terminal.

The Worker does **not** save raw IP addresses. When a visitor opens the site, Cloudflare provides the IP only to the Worker during that request. The Worker combines that temporary value with the browser user agent, creates an HMAC-SHA-256 hash using your private secret, and stores only that irreversible hash with timestamps. This means repeat opens by the same browser/IP combination update one record rather than increasing the total. The Worker automatically removes entries older than 180 days.

> This is a lightweight count, not a perfect person-level identity system. People on a shared network may be grouped together, while a visitor who changes browsers or networks may be counted more than once. That tradeoff avoids storing directly identifiable IP addresses.

## What you will create

| Item        | Name to use            | Purpose                                                        |
| ----------- | ---------------------- | -------------------------------------------------------------- |
| D1 database | `niko-visitor-count`   | Stores one pseudonymous marker for each visitor.               |
| Worker      | `niko-visitor-counter` | Receives the page-open event and updates the database.         |
| D1 binding  | `VISITOR_DB`           | Connects the Worker to the D1 database.                        |
| Secret      | `HASH_SALT`            | Makes the visitor hashes irreversible and unique to your site. |

## Dashboard-only setup

1. Sign in to [Cloudflare](https://dash.cloudflare.com/) and open **Workers & Pages**. Select **D1 SQL Database**, then **Create Database**. Name it `niko-visitor-count` and select **Create**.

2. Open the database you created, select **Console**, paste every line from [`schema.sql`](./schema.sql), and select **Execute**. This creates the private `visitors` table.

3. Return to **Workers & Pages**, select **Create application**, choose **Start with Hello World**, give it the name `niko-visitor-counter`, and select **Deploy**. Open the Worker and use **Edit code** to replace the default code with the complete content of [`worker.js`](./worker.js). Select **Save and deploy**.

4. In the same Worker, open **Settings** > **Bindings** > **Add binding**. Choose **D1 database**, enter `VISITOR_DB` as the variable name, select `niko-visitor-count`, then save the binding.

5. Still in the Worker settings, open **Variables and Secrets** > **Add** > **Secret**. Set the name to `HASH_SALT`. Use Cloudflare’s **Generate** option if available, or paste a long random value that you keep private. Save the secret and deploy the Worker again.

6. Open the Worker’s **Settings** > **Domains & Routes** and copy its `workers.dev` URL. Add `/track` to the end. For example: `https://niko-visitor-counter.<your-subdomain>.workers.dev/track`.

7. In the dashboard for the service that publishes this website, add a public environment variable named `NEXT_PUBLIC_VISITOR_COUNTER_ENDPOINT`. Paste the complete `/track` URL as its value, then trigger a new deployment. If you publish the site with Cloudflare Pages, open the Pages project, select **Settings** > **Variables and Secrets**, add the variable for **Production**, save it, then go to **Deployments** and redeploy the latest version.

8. Visit the deployed website once. In Cloudflare, open **D1 SQL Database** > `niko-visitor-count` > **Console**. Run the following query to see the all-time pseudonymous visitor total:

```sql
SELECT COUNT(*) AS unique_visitors FROM visitors;
```

To see visitors active in the previous 30 days, run:

```sql
SELECT COUNT(*) AS unique_visitors_last_30_days
FROM visitors
WHERE last_seen >= datetime('now', '-30 days');
```

## Important configuration notes

The Worker accepts browser requests only from `https://nikoschultz.com` and `https://www.nikoschultz.com`. If you test with a different production domain, edit the `ALLOWED_ORIGINS` values near the top of `worker.js` before pasting it into Cloudflare.

Do not expose the D1 database, `HASH_SALT`, database query console, or visitor total as a public endpoint. The included Worker never returns the count to website visitors. This reduces scraping and prevents the stored pseudonymous markers from becoming a public tracking surface.

## Free-plan suitability

Cloudflare documents that the free Workers plan currently includes 100,000 Worker requests per day. Its included D1 allocation is also sufficient for a small site counter. Check the current limits in the Cloudflare dashboard before enabling the Worker; plan limits can change.

## References

[1]: https://developers.cloudflare.com/d1/get-started/ "Cloudflare D1: Getting started"
[2]: https://developers.cloudflare.com/workers/get-started/dashboard/ "Cloudflare Workers: dashboard setup"
[3]: https://developers.cloudflare.com/d1/worker-api/ "Cloudflare D1 Worker Binding API"
[4]: https://developers.cloudflare.com/workers/platform/pricing/ "Cloudflare Workers pricing"
[5]: https://www.cloudflare.com/web-analytics/ "Cloudflare Web Analytics"
