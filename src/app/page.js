"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const personalBests = [
  { event: "400m", time: "47.91", place: "Collegiate personal best" },
  { event: "600m", time: "1:15.22", place: "Short Track — Feb. 27, 2026" },
  {
    event: "800m",
    time: "1:45.24",
    place: "Virginia Challenge — Apr. 17, 2026",
  },
];

const news = [
  {
    date: "Aug. 2026",
    title: "Competed for Puerto Rico at the CAC Championships",
    location: "Santo Domingo, Dominican Republic",
    category: "International Racing",
    status: "Race",
  },
  {
    date: "Jul. 2026",
    title: "Raced the men's 800m at the Edmonton Athletics Invitational",
    location: "Edmonton, Canada",
    category: "International Racing",
    status: "Race",
  },
  {
    date: "Jun. 2026",
    title: "Earned First-Team All-American honors in the NCAA 800m final",
    location: "Eugene, Oregon",
    category: "Championship Racing",
    status: "Race",
  },
  {
    date: "May 2026",
    title: "Won bronze in the Big Ten Outdoor 800m",
    location: "Big Ten Outdoor Championships",
    category: "Championship Racing",
    status: "Race",
  },
  {
    date: "2026",
    title: "Continues creator content and Bicarb partnership work",
    location: "Digital",
    category: "Partnership",
    status: "Update",
  },
];

const galleryImages = [
  {
    src: "/images/IMG_2203.jpeg",
    alt: "Niko Schultz crossing the finish line",
  },
  { src: "/images/IMG_2211.jpeg", alt: "Niko Schultz preparing to race" },
  { src: "/images/IMG_2207.jpeg", alt: "Niko Schultz training on the track" },
  { src: "/images/IMG_2208.jpeg", alt: "Niko Schultz after a race" },
  {
    src: "/images/IMG_2209.jpeg",
    alt: "Niko Schultz competing in the 800 meters",
  },
  { src: "/images/IMG_2210.jpeg", alt: "Portrait of Niko Schultz in team kit" },
];

function TrackTimeCounter({ value }) {
  const counterRef = useRef(null);
  const [display, setDisplay] = useState(
    value.includes(":") ? "0:00.00" : "0.00",
  );
  const [hasStarted, setHasStarted] = useState(false);

  const targetCentiseconds = useMemo(() => {
    if (value.includes(":")) {
      const [minutes, seconds] = value.split(":");
      return Number(minutes) * 6000 + Math.round(Number(seconds) * 100);
    }

    return Math.round(Number(value) * 100);
  }, [value]);

  useEffect(() => {
    const node = counterRef.current;
    if (!node) return undefined;

    const formatTime = (centiseconds) => {
      if (!value.includes(":")) {
        return (centiseconds / 100).toFixed(2);
      }

      const minutes = Math.floor(centiseconds / 6000);
      const seconds = ((centiseconds % 6000) / 100).toFixed(2).padStart(5, "0");
      return `${minutes}:${seconds}`;
    };

    const runCounter = () => {
      if (hasStarted) return;
      setHasStarted(true);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(value);
        return;
      }

      const duration = 1750;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(formatTime(Math.round(targetCentiseconds * eased)));

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        } else {
          setDisplay(value);
        }
      };

      window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.55 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasStarted, targetCentiseconds, value]);

  return (
    <span
      ref={counterRef}
      className="split-time tabular-nums"
      aria-label={value}
    >
      {display}
    </span>
  );
}

function CustomCursor() {
  const [cursor, setCursor] = useState({
    x: -100,
    y: -100,
    visible: false,
    active: false,
  });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const moveCursor = (event) => {
      const isInteractive =
        event.target instanceof Element &&
        event.target.closest(
          "a, button, input, textarea, select, [data-cursor-hover]",
        );

      setCursor({
        x: event.clientX,
        y: event.clientY,
        visible: true,
        active: Boolean(isInteractive),
      });
    };

    const hideCursor = () =>
      setCursor((current) => ({ ...current, visible: false }));

    window.addEventListener("mousemove", moveCursor);
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`site-cursor ${cursor.visible ? "is-visible" : ""} ${cursor.active ? "is-active" : ""}`}
      style={{ left: cursor.x, top: cursor.y }}
    >
      <span />
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealItems = document.querySelectorAll("[data-reveal]");

    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.13, rootMargin: "0px 0px -5% 0px" },
    );

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${(index % 5) * 65}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="site-shell relative isolate overflow-hidden bg-cream text-ink">
      <CustomCursor />

      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />

      {/* NAV */}
      <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="nav-shell mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-ink/10 bg-cream/75 px-4 py-3 backdrop-blur-xl sm:px-5">
          <a
            href="#top"
            className="group flex items-center gap-3"
            data-cursor-hover
          >
            <span className="nav-mark" aria-hidden="true">
              NS
            </span>
            <span className="bib-label transition-colors duration-300 group-hover:text-clay">
              Niko Schultz
            </span>
          </a>

          <ul className="hidden items-center gap-1 font-body text-xs font-bold uppercase tracking-[0.14em] text-ink/70 md:flex">
            {[
              ["About", "#about"],
              ["Bests", "#bests"],
              ["News", "#news"],
              ["Gallery", "#gallery"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="nav-link" data-cursor-hover>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-primary nav-cta" data-cursor-hover>
            <span className="hidden sm:inline">Get in touch</span>
            <span className="sm:hidden">Contact</span>
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 sm:pb-28 sm:pt-24"
      >
        <div className="absolute left-6 top-8 hidden font-mono text-[10px] uppercase tracking-[0.34em] text-ink/35 sm:block">
          41° 38′ N · 88° 05′ W
        </div>
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <div data-reveal>
            <span className="bib-label">800m Athlete · Puerto Rico</span>

            <h1 className="section-heading mt-6 text-6xl leading-[0.88] sm:text-7xl lg:text-8xl">
              Niko
              <br />
              Schultz
            </h1>

            <p className="mt-7 max-w-md text-balance font-body text-lg leading-relaxed text-ink-soft">
              Niko Schultz is a Puerto Rico–eligible 800m runner, Penn State
              student-athlete, and NCAA First-Team All-American. A Joliet,
              Illinois native, he owns a 1:45.24 personal best and finished
              sixth in the 2026 NCAA Division I Outdoor 800m final.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#news" className="btn-primary" data-cursor-hover>
                Recent news <span aria-hidden="true">↓</span>
              </a>
              <a href="#bests" className="btn-secondary" data-cursor-hover>
                Personal bests
              </a>
            </div>
          </div>

          <div className="hero-frame" data-reveal>
            <div className="hero-image-wrap relative aspect-[4/5] w-full overflow-hidden rounded-[1.7rem] bg-ink">
              <Image
                src="/images/hero.jpg"
                alt="Niko Schultz racing the 800 meters"
                fill
                priority
                sizes="(min-width: 640px) 480px, 100vw"
                className="hero-image object-cover"
              />
              <div className="image-wash" aria-hidden="true" />
              <div className="hero-caption">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                  Built for the bell lap
                </span>
                <span className="hero-caption-line" aria-hidden="true" />
                <span className="font-body text-sm font-bold">800M</span>
              </div>
            </div>
            <div className="hero-offset-card" aria-hidden="true">
              <span>PB</span>
              <strong>1:45.24</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* PERSONAL BESTS */}
      <section id="bests" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="section-kicker" data-reveal>
          <span>01</span>
          <span>Performance</span>
        </div>
        <h2 className="section-heading mt-4" data-reveal>
          Personal Bests
        </h2>
        <p className="mt-3 max-w-lg leading-relaxed text-ink-soft" data-reveal>
          Proven range from the 400m through the 800m.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {personalBests.map((pb) => (
            <div
              key={pb.event}
              className="split-chip group"
              data-reveal
              data-cursor-hover
            >
              <span className="chip-topline">
                <span className="font-mono text-xs uppercase tracking-widest2 text-cream/70">
                  {pb.event}
                </span>
                <span className="chip-dot" />
              </span>
              <TrackTimeCounter value={pb.time} />
              <span className="font-body text-sm leading-relaxed text-cream/75">
                {pb.place}
              </span>
              <span className="chip-corner" aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <div
            className="profile-frame relative aspect-square w-full overflow-visible sm:order-2"
            data-reveal
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.7rem] bg-cream-soft">
              <Image
                src="/images/profile.jpg"
                alt="Portrait of Niko Schultz"
                fill
                sizes="(min-width: 640px) 480px, 100vw"
                className="profile-image object-cover"
              />
              <div className="image-wash image-wash-light" aria-hidden="true" />
            </div>
            <div className="profile-label" aria-hidden="true">
              <span>NIKO</span>
              <span>SCHULTZ</span>
            </div>
          </div>

          <div className="sm:order-1" data-reveal>
            <div className="section-kicker">
              <span>02</span>
              <span>About the athlete</span>
            </div>
            <h2 className="section-heading mt-4">About</h2>

            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Niko Schultz is a Puerto Rico–eligible middle-distance runner
              specializing in the 800m. Originally from Joliet, Illinois, he ran
              for Plainfield South High School before competing at the
              University of Nebraska–Lincoln and later transferring to Penn
              State.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              In 2026, Schultz earned First-Team All-American honors after
              finishing sixth in the NCAA Division I Outdoor 800m final. He owns
              a 1:45.24 personal best in the 800m and brings range from the 400m
              through the 1,000m. Off the track, Niko is a business marketing
              graduate and digital creator who shares his training, racing, and
              athlete journey.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="bib-label">Joliet, IL</span>
              <span className="bib-label">Penn State Track &amp; Field</span>
              <span className="bib-label">800m — 1:45.24</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* RECENT NEWS */}
      <section id="news" className="mx-auto max-w-6xl px-6 py-24">
        <div className="section-kicker" data-reveal>
          <span>03</span>
          <span>From the track</span>
        </div>
        <h2 className="section-heading mt-4" data-reveal>
          Recent News
        </h2>
        <p className="mt-3 max-w-lg leading-relaxed text-ink-soft" data-reveal>
          Race updates, international competition, and life beyond the track.
        </p>

        <div
          className="news-table mt-10 overflow-x-auto rounded-[1.35rem] border border-ink/10 bg-cream/70 shadow-[0_18px_55px_-34px_rgba(25,31,27,0.55)]"
          data-reveal
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-ink text-cream">
                {["Date", "Update", "Location", "Category", "Status"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {news.map((row, i) => (
                <tr
                  key={row.title}
                  className={`${i % 2 === 0 ? "bg-cream/70" : "bg-cream-soft/80"} transition-colors duration-300 hover:bg-gold/10`}
                >
                  <td className="px-5 py-4 font-mono text-sm">{row.date}</td>
                  <td className="px-5 py-4 font-semibold">{row.title}</td>
                  <td className="px-5 py-4 text-ink-soft">{row.location}</td>
                  <td className="px-5 py-4 text-ink-soft">{row.category}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide " +
                        (row.status === "Race"
                          ? "bg-sage/20 text-sage-dark"
                          : "bg-gold/20 text-gold")
                      }
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
        <div className="section-kicker" data-reveal>
          <span>04</span>
          <span>In motion</span>
        </div>
        <h2 className="section-heading mt-4" data-reveal>
          Gallery
        </h2>
        <p className="mt-3 max-w-lg leading-relaxed text-ink-soft" data-reveal>
          Race day, training, and everything in between.
        </p>

        <div className="gallery-grid mt-10 grid grid-cols-2 gap-4 sm:auto-rows-[156px] sm:grid-cols-3">
          {galleryImages.map((img, index) => (
            <div
              key={img.src}
              className={`gallery-card relative min-h-[180px] overflow-hidden rounded-2xl bg-cream-soft ${index === 0 || index === 4 ? "sm:col-span-2 sm:row-span-2" : ""}`}
              data-reveal
              data-cursor-hover
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 640px, 50vw"
                className="gallery-image object-cover"
              />
              <div className="gallery-overlay" aria-hidden="true" />
              <span className="gallery-index font-mono">0{index + 1}</span>
              <span className="gallery-caption">
                {index % 2 === 0 ? "Race day" : "The work"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="relative mx-auto max-w-6xl px-6 py-24">
        <div
          className="contact-panel overflow-hidden rounded-[2rem] bg-ink px-7 py-10 text-cream shadow-[0_28px_85px_-40px_rgba(25,31,27,0.95)] sm:px-12 sm:py-14"
          data-reveal
        >
          <div className="contact-glow" aria-hidden="true" />
          <div className="relative grid gap-12 sm:grid-cols-2">
            <div>
              <span className="bib-label text-gold">
                05 · Let&apos;s connect
              </span>
              <h2 className="section-heading mt-5 text-cream">Get in Touch</h2>
              <p className="mt-5 max-w-sm leading-relaxed text-cream/70">
                For sponsorships, media, race invitations, or collaborations,
                reach out directly.
              </p>
              <a
                href="mailto:nikoschultzbranding@gmail.com"
                className="btn-primary mt-8 inline-flex"
                data-cursor-hover
              >
                nikoschultzbranding@gmail.com <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="sm:justify-self-end">
              <span className="bib-label text-cream/60">Follow along</span>
              <ul className="mt-5 space-y-3 font-body text-xl font-semibold">
                {[
                  ["Instagram", "https://instagram.com/nikoschultzzz"],
                  ["TikTok", "https://tiktok.com/@nikojschultz"],
                  ["YouTube", "https://youtube.com/@nikoschultz"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="footer-link"
                      data-cursor-hover
                    >
                      {label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 px-1 text-sm text-ink-soft sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Niko Schultz. All rights reserved.
          </span>
          <span className="font-mono text-xs tracking-[0.18em]">
            800M · PENN STATE
          </span>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .site-shell {
          background-image: linear-gradient(
            115deg,
            rgba(255, 255, 255, 0.24),
            transparent 46%
          );
        }
        @media (pointer: fine) {
          .site-shell,
          .site-shell * {
            cursor: none !important;
          }
        }

        .ambient-grid {
          position: fixed;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          opacity: 0.45;
          background-image: radial-gradient(
            rgba(34, 39, 35, 0.26) 0.75px,
            transparent 0.85px
          );
          background-size: 22px 22px;
          -webkit-mask-image: linear-gradient(
            to bottom,
            black,
            transparent 84%
          );
          mask-image: linear-gradient(to bottom, black, transparent 84%);
          animation: driftGrid 18s linear infinite;
        }
        .ambient-orb {
          position: absolute;
          z-index: -1;
          width: 30rem;
          aspect-ratio: 1;
          border-radius: 999px;
          filter: blur(24px);
          opacity: 0.17;
          pointer-events: none;
          animation: floatOrb 11s ease-in-out infinite alternate;
        }
        .ambient-orb-one {
          top: 7rem;
          right: -14rem;
          background: #d1a83d;
        }
        .ambient-orb-two {
          top: 64rem;
          left: -16rem;
          background: #778c71;
          animation-delay: -5s;
        }
        @keyframes driftGrid {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 88px 66px;
          }
        }
        @keyframes floatOrb {
          from {
            transform: translate3d(0, 0, 0) scale(0.92);
          }
          to {
            transform: translate3d(2rem, -1.5rem, 0) scale(1.06);
          }
        }

        .site-cursor {
          position: fixed;
          z-index: 100;
          width: 28px;
          height: 28px;
          margin: -14px 0 0 -14px;
          pointer-events: none;
          opacity: 0;
          mix-blend-mode: difference;
          transition:
            width 240ms ease,
            height 240ms ease,
            margin 240ms ease,
            opacity 180ms ease;
        }
        .site-cursor span {
          position: absolute;
          inset: 9px;
          border-radius: 999px;
          background: #f4efe4;
          transition:
            inset 240ms ease,
            border 240ms ease,
            background 240ms ease;
        }
        .site-cursor.is-visible {
          opacity: 1;
        }
        .site-cursor.is-active {
          width: 52px;
          height: 52px;
          margin: -26px 0 0 -26px;
        }
        .site-cursor.is-active span {
          inset: 3px;
          border: 1px solid #f4efe4;
          background: transparent;
        }

        [data-reveal] {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          transition:
            opacity 750ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 750ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }
        [data-reveal].is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .nav-shell {
          box-shadow: 0 18px 45px -34px rgba(25, 31, 27, 0.85);
        }
        .nav-mark {
          display: grid;
          place-items: center;
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 0.7rem;
          background: #202720;
          color: #f7f1e4;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: -0.08em;
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.11),
            0 8px 15px -10px rgba(23, 28, 24, 0.85);
        }
        .nav-link {
          display: inline-flex;
          position: relative;
          padding: 0.65rem 0.72rem;
          transition: color 220ms ease;
        }
        .nav-link::after {
          position: absolute;
          content: "";
          right: 0.72rem;
          bottom: 0.45rem;
          left: 0.72rem;
          height: 1px;
          transform: scaleX(0);
          transform-origin: right;
          background: #b76849;
          transition: transform 240ms ease;
        }
        .nav-link:hover {
          color: #b76849;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        .nav-cta {
          gap: 0.65rem;
          align-items: center;
          padding: 0.65rem 0.9rem;
          font-size: 0.75rem;
        }

        .section-kicker {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          color: rgba(35, 42, 37, 0.58);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .section-kicker span:first-child {
          display: grid;
          place-items: center;
          width: 1.85rem;
          height: 1.85rem;
          border: 1px solid rgba(35, 42, 37, 0.19);
          border-radius: 999px;
          color: #b76849;
          font-size: 0.57rem;
        }
        .hero-frame {
          position: relative;
          padding: 0.6rem;
          border-radius: 2rem;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.94),
            rgba(217, 206, 184, 0.5)
          );
          box-shadow: 0 26px 70px -42px rgba(35, 42, 37, 0.9);
        }
        .hero-image-wrap {
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
        }
        .hero-image,
        .profile-image,
        .gallery-image {
          transition:
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 600ms ease;
        }
        .hero-frame:hover .hero-image {
          transform: scale(1.045);
          filter: saturate(1.08) contrast(1.04);
        }
        .image-wash {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(20, 26, 23, 0) 44%,
            rgba(20, 26, 23, 0.68) 100%
          );
          mix-blend-mode: multiply;
        }
        .image-wash-light {
          background: linear-gradient(
            135deg,
            rgba(183, 104, 73, 0.18),
            transparent 40%,
            rgba(26, 33, 28, 0.2)
          );
        }
        .hero-caption {
          position: absolute;
          right: 1.25rem;
          bottom: 1.2rem;
          left: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #f7f1e4;
        }
        .hero-caption-line {
          flex: 1;
          height: 1px;
          background: rgba(247, 241, 228, 0.48);
        }
        .hero-offset-card {
          position: absolute;
          bottom: -1.35rem;
          left: -1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
          padding: 0.75rem 1rem;
          border: 1px solid rgba(247, 241, 228, 0.15);
          border-radius: 0.9rem;
          background: #202720;
          color: #f7f1e4;
          box-shadow: 0 15px 32px -18px rgba(25, 31, 27, 0.95);
        }
        .hero-offset-card span {
          color: #d1a83d;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
        }
        .hero-offset-card strong {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 1rem;
        }
        .profile-frame::after {
          position: absolute;
          z-index: -1;
          right: -1rem;
          bottom: -1rem;
          width: 72%;
          height: 72%;
          border: 1px solid rgba(183, 104, 73, 0.36);
          border-radius: 1.7rem;
          content: "";
        }
        .profile-frame:hover .profile-image {
          transform: scale(1.06);
          filter: saturate(1.05);
        }
        .profile-label {
          position: absolute;
          right: -1.1rem;
          top: 1rem;
          display: flex;
          gap: 0.2rem;
          padding: 0.45rem;
          border: 1px solid rgba(35, 42, 37, 0.16);
          border-radius: 0.55rem;
          background: rgba(247, 241, 228, 0.88);
          box-shadow: 0 10px 25px -18px rgba(25, 31, 27, 0.8);
          color: #202720;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          writing-mode: vertical-rl;
        }

        .split-chip {
          position: relative;
          display: flex;
          min-height: 13.25rem;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          border: 1px solid rgba(247, 241, 228, 0.1);
          border-radius: 1.3rem;
          padding: 1.35rem;
          background: #202720;
          box-shadow: 0 18px 38px -28px rgba(25, 31, 27, 0.96);
          transition:
            transform 350ms cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 350ms ease,
            background 350ms ease;
        }
        .split-chip::before {
          position: absolute;
          top: -5rem;
          right: -3rem;
          width: 11rem;
          aspect-ratio: 1;
          border-radius: 999px;
          background: rgba(209, 168, 61, 0.12);
          content: "";
          transition: transform 500ms ease;
        }
        .split-chip:hover {
          transform: translateY(-7px);
          background: #273128;
          box-shadow: 0 30px 50px -30px rgba(25, 31, 27, 0.98);
        }
        .split-chip:hover::before {
          transform: scale(1.22);
        }
        .chip-topline {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .chip-dot {
          width: 0.45rem;
          height: 0.45rem;
          border-radius: 999px;
          background: #d1a83d;
          box-shadow: 0 0 0 5px rgba(209, 168, 61, 0.1);
        }
        .split-time {
          position: relative;
          z-index: 1;
          color: #f7f1e4;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 700;
          letter-spacing: -0.08em;
          line-height: 1;
        }
        .chip-corner {
          position: absolute;
          right: 0.65rem;
          bottom: 0.65rem;
          width: 1.3rem;
          height: 1.3rem;
          border-right: 1px solid rgba(247, 241, 228, 0.34);
          border-bottom: 1px solid rgba(247, 241, 228, 0.34);
        }
        .news-table tr + tr {
          border-top: 1px solid rgba(35, 42, 37, 0.07);
        }
        .gallery-card {
          transform: translateZ(0);
          box-shadow: 0 14px 30px -24px rgba(25, 31, 27, 0.8);
        }
        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 46%,
            rgba(20, 26, 23, 0.7) 100%
          );
          opacity: 0.82;
          transition: opacity 400ms ease;
        }
        .gallery-card:hover .gallery-image {
          transform: scale(1.09);
          filter: saturate(1.14) contrast(1.04);
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-index {
          position: absolute;
          top: 0.75rem;
          left: 0.85rem;
          color: rgba(247, 241, 228, 0.9);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
        }
        .gallery-caption {
          position: absolute;
          right: 0.85rem;
          bottom: 0.7rem;
          color: #f7f1e4;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(6px);
          transition:
            opacity 280ms ease,
            transform 280ms ease;
        }
        .gallery-card:hover .gallery-caption {
          opacity: 1;
          transform: translateY(0);
        }
        .contact-panel {
          position: relative;
        }
        .contact-glow {
          position: absolute;
          top: -10rem;
          right: -6rem;
          width: 26rem;
          aspect-ratio: 1;
          border-radius: 999px;
          background: radial-gradient(
            circle,
            rgba(209, 168, 61, 0.34),
            transparent 66%
          );
        }
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          transition:
            color 240ms ease,
            transform 240ms ease;
        }
        .footer-link:hover {
          color: #d1a83d;
          transform: translateX(5px);
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
        @media (max-width: 639px) {
          .hero-offset-card {
            left: 0.8rem;
            bottom: -1rem;
          }
          .profile-label {
            right: 0.6rem;
          }
          .gallery-caption {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </main>
  );
}
