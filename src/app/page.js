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

const socialStats = [
  {
    platform: "YouTube",
    handle: "@nikoschultz4306",
    followers: 22100,
    href: "https://youtube.com/@nikoschultz4306",
    accent: "youtube",
  },
  {
    platform: "Instagram",
    handle: "@nikoschultzzz",
    followers: 27400,
    href: "https://instagram.com/nikoschultzzz",
    accent: "instagram",
  },
];

const progressMilestones = [
  {
    year: "2018–2021",
    stage: "Plainfield South",
    title: "Built the foundation",
    detail:
      "Started his path in Joliet, Illinois, building the range and resilience that would carry him into Division I competition.",
  },
  {
    year: "2021–2025",
    stage: "Nebraska",
    title: "Division I development",
    detail:
      "Competed for Nebraska, sharpened his middle-distance focus, and earned a University of Nebraska–Lincoln degree.",
  },
  {
    year: "2025",
    stage: "Penn State & Puerto Rico",
    title: "A new chapter",
    detail:
      "Transferred to Penn State while beginning his international chapter as a Puerto Rico–eligible athlete.",
  },
  {
    year: "2026",
    stage: "NCAA & international racing",
    title: "Breakthrough season",
    detail:
      "Ran 1:45.24 for 800m, earned First-Team All-American honors, and represented Puerto Rico on the international stage.",
  },
];

const sponsors = [
  { name: "Bicarb 3.0", className: "sponsor-bicarb" },
  { name: "Kettle & Fire", className: "sponsor-kettle" },
  {
    name: "Andersen Endurance Sports Management",
    className: "sponsor-andersen",
  },
];

const futureGoals = [
  "Future Olympian",
  "Future Entrepreneur",
  "Future 1 Million Followers",
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

function AnimatedAudienceCounter({ value, start }) {
  const counterRef = useRef(null);
  const hasStarted = useRef(false);
  const [display, setDisplay] = useState("0.0K");

  useEffect(() => {
    if (!start) return undefined;

    const node = counterRef.current;
    if (!node) return undefined;

    const formatAudience = (count) => `${(count / 1000).toFixed(1)}K`;

    const animate = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setDisplay(formatAudience(value));
        return;
      }

      const start = performance.now();
      const duration = 1450;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplay(formatAudience(Math.round(value * eased)));

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.7 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [start, value]);

  return (
    <span
      ref={counterRef}
      className="audience-count tabular-nums"
      aria-label={`${formatNumber(value)} followers`}
    >
      {display}
    </span>
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId;
    const updateProgress = () => {
      const scrollableHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      setProgress(Math.min(1, Math.max(0, window.scrollY / scrollableHeight)));
      frameId = undefined;
    };
    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      className={`scroll-progress ${progress > 0.015 ? "is-active" : ""}`}
      aria-hidden="true"
    >
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

function SiteLoader() {
  return (
    <div
      className="site-loader"
      role="status"
      aria-label="Loading the Niko Schultz website"
    >
      <div className="site-loader-inner">
        <span className="site-loader-name">Niko Schultz</span>
        <div className="loader-line loader-line-long" />
        <div className="loader-line loader-line-medium" />
        <div className="loader-stat-row">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

function TypedName({ start }) {
  const fullName = "Niko Schultz";
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    if (!start) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTypedName(fullName);
      return undefined;
    }

    let characterIndex = 0;
    const typeName = () => {
      characterIndex += 1;
      setTypedName(fullName.slice(0, characterIndex));

      if (characterIndex < fullName.length) {
        window.setTimeout(typeName, characterIndex === 5 ? 210 : 105);
      }
    };

    const startDelay = window.setTimeout(typeName, 280);
    return () => window.clearTimeout(startDelay);
  }, [start]);

  const [firstName, lastName] = typedName.split(" ");

  return (
    <h1
      className="signature-name mt-6 text-6xl leading-[0.88] sm:text-7xl lg:text-8xl"
      aria-label={fullName}
    >
      <span>{firstName || "\u00A0"}</span>
      <br />
      <span>{lastName || "\u00A0"}</span>
      <span className="typing-caret" aria-hidden="true" />
    </h1>
  );
}

function RepellingDotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext("2d");
    const pointer = { x: -1000, y: -1000 };
    const spacing = 40;
    const repulsionRadius = 190;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frameId;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const setPointer = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const clearPointer = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const driftX = reducedMotion ? 0 : Math.sin(time / 5500) * 1.5;
      const driftY = reducedMotion ? 0 : Math.cos(time / 6500) * 1.1;

      for (let y = -spacing; y < height + spacing; y += spacing) {
        for (let x = -spacing; x < width + spacing; x += spacing) {
          const dotX = x + driftX;
          const dotY = y + driftY;
          const distanceX = dotX - pointer.x;
          const distanceY = dotY - pointer.y;
          const distance = Math.hypot(distanceX, distanceY);
          const influence = Math.max(0, 1 - distance / repulsionRadius);
          const push = influence * influence * 22;
          const safeDistance = Math.max(distance, 1);
          const displacedX = dotX + (distanceX / safeDistance) * push;
          const displacedY = dotY + (distanceY / safeDistance) * push;
          const radius = 1.65 + influence * 0.9;

          context.beginPath();
          context.arc(displacedX, displacedY, radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(27, 35, 29, ${0.3 + influence * 0.22})`;
          context.fill();
        }
      }

      if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", setPointer, { passive: true });
    window.addEventListener("pointerleave", clearPointer);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", setPointer);
      window.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-grid" aria-hidden="true" />;
}

function ProgressTimeline() {
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;

    let frameId;
    const updateTimeline = () => {
      const rect = timeline.getBoundingClientRect();
      const anchor = window.innerHeight * 0.58;
      const progress = Math.min(
        1,
        Math.max(0, (anchor - rect.top) / Math.max(rect.height, 1)),
      );
      timeline.style.setProperty("--journey-progress", `${progress * 100}%`);
      frameId = undefined;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateTimeline);
    };

    const stops = timeline.querySelectorAll("[data-milestone-index]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.milestoneIndex));
          }
        });
      },
      { threshold: 0.58, rootMargin: "0px 0px -20% 0px" },
    );

    stops.forEach((stop) => observer.observe(stop));
    updateTimeline();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="journey-timeline" ref={timelineRef}>
      <div className="timeline-rail" aria-hidden="true">
        <span className="timeline-rail-progress" />
        <span className="timeline-runner">
          <Image src="/images/ns.png" alt="" fill sizes="40px" priority />
        </span>
      </div>

      <div className="timeline-stops">
        {progressMilestones.map((milestone, index) => (
          <article
            key={milestone.year}
            data-milestone-index={index}
            className={`timeline-stop ${activeIndex === index ? "is-active" : ""}`}
          >
            <span className="timeline-marker" aria-hidden="true" />
            <div className="timeline-copy">
              <span className="timeline-year">{milestone.year}</span>
              <span className="timeline-stage">{milestone.stage}</span>
              <h3>{milestone.title}</h3>
              <p>{milestone.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SponsorCarousel() {
  const sponsorLoop = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="sponsor-carousel" aria-label="Partners and sponsors">
      <div className="sponsor-carousel-label">Partners</div>
      <div className="sponsor-viewport">
        <div className="sponsor-track">
          {sponsorLoop.map((sponsor, index) => (
            <span
              className={`sponsor-wordmark ${sponsor.className}`}
              key={`${sponsor.name}-${index}`}
              aria-hidden={index >= sponsors.length}
            >
              {sponsor.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FutureGoals() {
  return (
    <section className="future-goals" aria-label="Future goals">
      <span className="future-goals-label">On the horizon</span>
      <div className="future-goals-list">
        {futureGoals.map((goal) => (
          <span key={goal}>{goal}</span>
        ))}
      </div>
    </section>
  );
}

function DeveloperSupportPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const trigger = document.querySelector("[data-support-trigger]");
    if (!trigger) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.65 },
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      className={`developer-support ${isVisible && !isDismissed ? "is-visible" : ""}`}
      aria-label="Support the developer"
      aria-live="polite"
    >
      <button
        type="button"
        className="developer-support-close"
        onClick={() => setIsDismissed(true)}
        aria-label="Dismiss support prompt"
      >
        ×
      </button>
      <span className="developer-support-label">Support the dev</span>
      <p>Enjoying the site? Help keep this fan-built project moving forward.</p>
      <div className="developer-support-actions">
        <a
          href="https://gogetfunding.com/niko-schultz-fan-club-website/#campaign-story"
          target="_blank"
          rel="noreferrer"
          data-cursor-hover
        >
          Support on GoGetFunding <span aria-hidden="true">↗</span>
        </a>
        <a
          href="mailto:sawyerbobk563@gmail.com?subject=Support%20for%20the%20Niko%20Schultz%20website"
          data-cursor-hover
        >
          Contact the developer <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 1050;
    const timer = window.setTimeout(() => setIsLoading(false), delay);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return undefined;

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
      item.style.setProperty(
        "--reveal-shift",
        index % 2 === 0 ? "-30px" : "30px",
      );
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return undefined;

    const sections = document.querySelectorAll("[data-section]");
    const timers = [];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.remove("section-is-active");
          window.requestAnimationFrame(() => {
            entry.target.classList.add("section-is-active");
            timers.push(
              window.setTimeout(
                () => entry.target.classList.remove("section-is-active"),
                1450,
              ),
            );
          });
        });
      },
      { threshold: 0.2, rootMargin: "-12% 0px -58% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [isLoading]);

  return (
    <main className="site-shell relative isolate overflow-hidden bg-cream text-ink">
      {isLoading && <SiteLoader />}
      <ScrollProgress />
      <CustomCursor />

      <RepellingDotGrid />
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-three" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-four" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-five" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-six" aria-hidden="true" />

      {/* HERO */}
      <section
        id="top"
        className="hero-section relative mx-auto max-w-6xl overflow-visible px-6 pb-28 pt-10 sm:pb-36 sm:pt-16"
      >
        <div className="audience-strip" data-reveal>
          <span className="audience-intro">Follow the journey</span>
          <div className="audience-list">
            {socialStats.map((stat) => (
              <a
                key={stat.platform}
                href={stat.href}
                target="_blank"
                rel="noreferrer"
                className={`audience-card audience-${stat.accent}`}
                data-cursor-hover
              >
                <span className="audience-platform">{stat.platform}</span>
                <AnimatedAudienceCounter
                  value={stat.followers}
                  start={!isLoading}
                />
                <span className="audience-label">
                  followers · {stat.handle}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-background" aria-hidden="true">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 640px) 72vw, 100vw"
            className="hero-background-image object-cover"
          />
          <div className="hero-background-fade" />
        </div>

        <div className="hero-content relative z-10" data-reveal>
          <span className="bib-label">800m Athlete · Puerto Rico</span>

          <TypedName start={!isLoading} />

          <p className="mt-7 max-w-md text-balance font-body text-lg leading-relaxed text-ink-soft">
            Niko Schultz is a Puerto Rico–eligible 800m runner, Penn State
            student-athlete, and NCAA First-Team All-American. A Joliet,
            Illinois native, he owns a 1:45.24 personal best and finished sixth
            in the 2026 NCAA Division I Outdoor 800m final.
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
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* PERSONAL BESTS */}
      <section
        id="bests"
        data-section
        className="relative mx-auto max-w-6xl px-6 py-24"
      >
        <h2 className="section-heading section-title" data-reveal>
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
      <section id="about" data-section className="mx-auto max-w-6xl px-6 py-24">
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
          </div>

          <div className="sm:order-1" data-reveal>
            <h2 className="section-heading section-title">About</h2>

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

      <SponsorCarousel />
      <FutureGoals />

      {/* PROGRESSION */}
      <section
        id="journey"
        data-section
        className="journey-section relative mx-auto max-w-6xl px-6 py-24"
      >
        <div className="max-w-2xl">
          <h2 className="section-heading section-title" data-reveal>
            The Journey
          </h2>
          <p
            className="mt-3 max-w-xl leading-relaxed text-ink-soft"
            data-reveal
          >
            From high school laps in Illinois to NCAA finals and international
            racing — scroll through the milestones that shaped the journey.
          </p>
        </div>
        <ProgressTimeline />
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* RECENT NEWS */}
      <section
        id="news"
        data-section
        className="relative mx-auto max-w-6xl px-6 py-24"
      >
        <h2 className="section-heading section-title" data-reveal>
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
      <section
        id="gallery"
        data-section
        className="relative mx-auto max-w-6xl px-6 py-24"
      >
        <h2 className="section-heading section-title" data-reveal>
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
      <footer
        id="contact"
        data-section
        data-support-trigger
        className="relative mx-auto max-w-6xl px-6 py-24"
      >
        <div
          className="contact-panel overflow-hidden rounded-[2rem] bg-ink px-7 py-10 text-cream shadow-[0_28px_85px_-40px_rgba(25,31,27,0.95)] sm:px-12 sm:py-14"
          data-reveal
        >
          <div className="contact-glow" aria-hidden="true" />
          <div className="relative grid gap-12 sm:grid-cols-2">
            <div>
              <h2 className="section-heading section-title text-cream">
                Get in Touch
              </h2>
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
              <ul className="space-y-3 font-body text-xl font-semibold">
                {[
                  ["Instagram", "https://instagram.com/nikoschultzzz"],
                  ["TikTok", "https://tiktok.com/@nikojschultz"],
                  ["YouTube", "https://youtube.com/@nikoschultz4306"],
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
        <p className="footer-legal">
          By viewing this page, you agree to the{" "}
          <a
            href="https://www.termsfeed.com/blog/sample-terms-and-conditions-template/"
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
          >
            Terms of Service
          </a>
          . Built &amp; Designed by <span>{"{ss}"}</span>
        </p>
      </footer>

      <DeveloperSupportPrompt />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .site-shell {
          font-family: var(--font-body), ui-rounded, system-ui, sans-serif;
          background-color: #f7f1e4;
          background-image: radial-gradient(
              circle at 10% 5%,
              rgba(255, 255, 255, 0.48),
              transparent 30%
            ),
            linear-gradient(115deg, rgba(255, 255, 255, 0.17), transparent 46%);
        }
        .site-loader {
          position: fixed;
          z-index: 200;
          inset: 0;
          display: grid;
          place-items: center;
          background: #f7f1e4;
        }
        .site-loader-inner {
          display: grid;
          width: min(32rem, calc(100vw - 3rem));
          gap: 0.95rem;
        }
        .site-loader-name {
          margin-bottom: 0.45rem;
          color: rgba(35, 42, 37, 0.42);
          font-family: var(--font-signature), cursive;
          font-size: clamp(2rem, 7vw, 4.25rem);
          letter-spacing: -0.06em;
        }
        .loader-line,
        .loader-stat-row span {
          overflow: hidden;
          border-radius: 999px;
          background: rgba(35, 42, 37, 0.1);
          animation: skeletonPulse 850ms ease-in-out infinite alternate;
        }
        .loader-line {
          height: 0.8rem;
        }
        .loader-line-long {
          width: 100%;
        }
        .loader-line-medium {
          width: 64%;
          animation-delay: -320ms;
        }
        .loader-stat-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .loader-stat-row span {
          height: 7rem;
        }
        .loader-stat-row span:nth-child(2) {
          animation-delay: -210ms;
        }
        .loader-stat-row span:nth-child(3) {
          animation-delay: -480ms;
        }
        @keyframes skeletonPulse {
          from {
            opacity: 0.54;
            transform: scaleX(0.96);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        .scroll-progress {
          position: fixed;
          z-index: 150;
          top: 0;
          right: 0;
          left: 0;
          height: 4px;
          overflow: hidden;
          background: rgba(247, 241, 228, 0.38);
          opacity: 0;
          transform: translateY(-100%);
          transition:
            opacity 240ms ease,
            transform 240ms ease;
        }
        .scroll-progress.is-active {
          opacity: 1;
          transform: translateY(0);
        }
        .scroll-progress span {
          display: block;
          width: 100%;
          height: 100%;
          transform-origin: left center;
          background: linear-gradient(90deg, #b76849, #d1a83d 58%, #66897a);
          box-shadow: 0 0 1rem rgba(183, 104, 73, 0.56);
          transition: transform 80ms linear;
        }
        .signature-name {
          position: relative;
          color: #202720;
          font-family: var(--font-signature), cursive;
          font-weight: 400;
          letter-spacing: -0.07em;
          text-shadow: 3px 3px 0 rgba(209, 168, 61, 0.22);
        }
        .signature-name > span:not(.typing-caret) {
          display: inline-block;
          min-width: 2.25ch;
        }
        .typing-caret {
          display: inline-block;
          width: 0.07em;
          height: 0.86em;
          margin-left: 0.08em;
          vertical-align: -0.05em;
          border-radius: 999px;
          background: #b76849;
          animation: blinkCaret 850ms step-end infinite;
        }
        @keyframes blinkCaret {
          50% {
            opacity: 0;
          }
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
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          opacity: 0.82;
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
        .ambient-orb-three {
          top: 112rem;
          right: -17rem;
          width: 25rem;
          background: #b76849;
          animation-delay: -3s;
        }
        .ambient-orb-four {
          top: 151rem;
          left: -15rem;
          width: 28rem;
          background: #8e6f9c;
          animation-delay: -8s;
        }
        .ambient-orb-five {
          top: 204rem;
          right: -16rem;
          width: 32rem;
          background: #5d8f8a;
          animation-delay: -6s;
        }
        .ambient-orb-six {
          top: 250rem;
          left: -18rem;
          width: 25rem;
          background: #d18d45;
          animation-delay: -10s;
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
          transform: translate3d(var(--reveal-shift, 0), 24px, 0) scale(0.985);
          transition:
            opacity 780ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 780ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }
        [data-reveal].is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }
        .section-title {
          position: relative;
          display: inline-block;
        }
        .section-title::after {
          position: absolute;
          right: 0;
          bottom: -0.42rem;
          left: 0;
          height: 0.18rem;
          border-radius: 999px;
          background: #b76849;
          content: "";
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left;
        }
        .section-is-active .section-title::after {
          animation: sectionUnderline 1.35s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }
        @keyframes sectionUnderline {
          0% {
            opacity: 0;
            transform: scaleX(0) rotate(-1.5deg);
          }
          14% {
            opacity: 1;
          }
          58% {
            opacity: 1;
            transform: scaleX(1) rotate(0.5deg);
          }
          100% {
            opacity: 0;
            transform: scaleX(0.78) rotate(0);
          }
        }
        .section-kicker {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          color: #b76849;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .section-kicker::before {
          width: 1.75rem;
          height: 2px;
          border-radius: 999px;
          background: currentColor;
          content: "";
        }

        .audience-strip {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          margin-bottom: 4.25rem;
          padding-bottom: 1.15rem;
          border-bottom: 1px solid rgba(35, 42, 37, 0.14);
        }
        .audience-intro {
          color: #b76849;
          font-size: 0.92rem;
          font-weight: 700;
          white-space: nowrap;
        }
        .audience-list {
          display: flex;
          align-items: stretch;
          gap: 0.7rem;
        }
        .audience-card {
          display: grid;
          grid-template-columns: auto auto;
          column-gap: 0.5rem;
          align-items: baseline;
          min-width: 12rem;
          padding: 0.65rem 0.8rem 0.55rem;
          border: 1px solid rgba(35, 42, 37, 0.1);
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.4);
          box-shadow: 0 12px 24px -24px rgba(25, 31, 27, 0.8);
          transition:
            transform 250ms ease,
            background 250ms ease,
            box-shadow 250ms ease;
        }
        .audience-card:hover {
          transform: translateY(-3px) rotate(-0.5deg);
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 18px 30px -22px rgba(25, 31, 27, 0.7);
        }
        .audience-platform {
          font-size: 0.75rem;
          font-weight: 700;
        }
        .audience-youtube .audience-platform {
          color: #bf3d32;
        }
        .audience-instagram .audience-platform {
          color: #aa4a6a;
        }
        .audience-count {
          color: #202720;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.08em;
        }
        .audience-label {
          grid-column: 1 / -1;
          margin-top: 0.12rem;
          color: rgba(35, 42, 37, 0.57);
          font-size: 0.63rem;
          letter-spacing: 0.02em;
        }
        .hero-background {
          position: absolute;
          z-index: 0;
          top: 4.25rem;
          right: -18vw;
          width: min(76vw, 60rem);
          height: clamp(34rem, 62vw, 48rem);
          overflow: hidden;
          pointer-events: none;
          opacity: 0.73;
        }
        .hero-background-image {
          object-position: center 36%;
          filter: saturate(0.78) contrast(0.94);
          transform: scale(1.03);
        }
        .hero-background-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
              90deg,
              #f7f1e4 2%,
              rgba(247, 241, 228, 0.94) 31%,
              rgba(247, 241, 228, 0.25) 60%,
              rgba(247, 241, 228, 0) 78%
            ),
            linear-gradient(
              180deg,
              #f7f1e4 0%,
              rgba(247, 241, 228, 0.14) 24%,
              rgba(247, 241, 228, 0) 62%,
              #f7f1e4 100%
            );
        }
        .hero-content {
          display: flex;
          min-height: 30rem;
          max-width: 36rem;
          flex-direction: column;
          justify-content: center;
        }
        .profile-image,
        .gallery-image {
          transition:
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 600ms ease;
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
        .future-goals {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          margin: 0 auto;
          padding: 3.4rem max(1.5rem, calc((100vw - 72rem) / 2));
          border-bottom: 1px solid rgba(35, 42, 37, 0.12);
          background: rgba(35, 42, 37, 0.96);
          color: #f7f1e4;
        }
        .future-goals-label {
          flex: 0 0 auto;
          color: #d1a83d;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .future-goals-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.55rem 1.45rem;
          font-family: var(--font-display), ui-rounded, sans-serif;
          font-size: clamp(1.35rem, 3.1vw, 2.35rem);
          line-height: 1.1;
        }
        .future-goals-list span:not(:last-child)::after {
          display: inline-block;
          width: 0.37rem;
          height: 0.37rem;
          margin-left: 1.45rem;
          vertical-align: middle;
          border-radius: 999px;
          background: #b76849;
          content: "";
        }
        .sponsor-carousel {
          display: grid;
          grid-template-columns: minmax(7rem, 1fr) minmax(0, 5fr);
          align-items: center;
          gap: 1.5rem;
          margin: 0 calc(50% - 50vw);
          width: 100vw;
          overflow: hidden;
          border-top: 1px solid rgba(35, 42, 37, 0.12);
          border-bottom: 1px solid rgba(35, 42, 37, 0.12);
          background: rgba(255, 255, 255, 0.26);
        }
        .sponsor-carousel-label {
          padding-left: max(1.5rem, calc((100vw - 72rem) / 2));
          color: #b76849;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .sponsor-viewport {
          min-width: 0;
          overflow: hidden;
        }
        .sponsor-track {
          display: flex;
          width: max-content;
          align-items: center;
          gap: clamp(2.25rem, 7vw, 7rem);
          padding: 1.35rem 0;
          animation: sponsorMarquee 26s linear infinite;
        }
        .sponsor-wordmark {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          transition:
            transform 220ms ease,
            opacity 220ms ease;
        }
        .sponsor-wordmark:hover {
          transform: translateY(-2px);
        }
        .sponsor-bicarb {
          color: #1d5a55;
          font-family: var(--font-display), ui-rounded, sans-serif;
          font-size: clamp(1.2rem, 2.6vw, 1.7rem);
          font-weight: 700;
          letter-spacing: -0.06em;
        }
        .sponsor-kettle {
          color: #9c3f32;
          font-family: Georgia, serif;
          font-size: clamp(1.2rem, 2.6vw, 1.7rem);
          font-weight: 700;
          letter-spacing: -0.05em;
        }
        .sponsor-andersen {
          color: #273128;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: clamp(0.76rem, 1.65vw, 1rem);
          font-weight: 700;
          letter-spacing: -0.04em;
        }
        @keyframes sponsorMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
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
        .journey-section {
          overflow: hidden;
        }
        .journey-timeline {
          --journey-progress: 0%;
          position: relative;
          margin-top: 4rem;
        }
        .timeline-rail {
          position: absolute;
          top: 4.25rem;
          bottom: 4.25rem;
          left: 50%;
          width: 2px;
          border-radius: 999px;
          background: rgba(35, 42, 37, 0.18);
          transform: translateX(-50%);
        }
        .timeline-rail-progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--journey-progress);
          border-radius: inherit;
          background: linear-gradient(#b76849, #d1a83d);
          box-shadow: 0 0 0.8rem rgba(183, 104, 73, 0.24);
        }
        .timeline-runner img {
          object-fit: cover;
        }
        .timeline-runner {
          position: absolute;
          z-index: 3;
          top: var(--journey-progress);
          left: 50%;
          display: grid;
          width: 2.45rem;
          height: 2.45rem;
          place-items: center;
          overflow: hidden;
          border: 2px solid #f7f1e4;
          border-radius: 999px;
          background: #202720;
          box-shadow: 0 8px 18px -10px rgba(25, 31, 27, 0.9);
          color: #f7f1e4;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: -0.1em;
          transform: translate(-50%, -50%);
          transition: top 70ms linear;
        }
        .timeline-stops {
          position: relative;
        }
        .timeline-stop {
          position: relative;
          display: grid;
          min-height: 15rem;
          grid-template-columns: minmax(0, 1fr) 6rem minmax(0, 1fr);
          align-items: center;
        }
        .timeline-marker {
          z-index: 2;
          grid-column: 2;
          grid-row: 1;
          justify-self: center;
          width: 1rem;
          height: 1rem;
          border: 3px solid #f7f1e4;
          border-radius: 999px;
          background: #b76849;
          box-shadow: 0 0 0 1px rgba(183, 104, 73, 0.54);
          transition:
            transform 360ms cubic-bezier(0.16, 1, 0.3, 1),
            background 360ms ease,
            box-shadow 360ms ease;
        }
        .timeline-copy {
          grid-column: 3;
          grid-row: 1;
          max-width: 29rem;
          padding: 1.55rem;
          border: 1px solid rgba(35, 42, 37, 0.1);
          border-radius: 1.35rem;
          background: rgba(255, 252, 232, 0.7);
          box-shadow: 0 18px 40px -35px rgba(25, 31, 27, 0.8);
          transition:
            transform 380ms cubic-bezier(0.16, 1, 0.3, 1),
            background 380ms ease,
            box-shadow 380ms ease;
        }
        .timeline-stop:nth-child(odd) .timeline-copy {
          grid-column: 1;
          text-align: right;
        }
        .timeline-year {
          display: block;
          color: #b76849;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
        }
        .timeline-stage {
          display: block;
          margin-top: 0.35rem;
          color: rgba(35, 42, 37, 0.6);
          font-size: 0.82rem;
          font-weight: 700;
        }
        .timeline-copy h3 {
          margin-top: 0.65rem;
          font-family: var(--font-display), ui-rounded, sans-serif;
          font-size: clamp(1.25rem, 2.8vw, 1.75rem);
          line-height: 1.1;
        }
        .timeline-copy p {
          margin-top: 0.7rem;
          color: var(--ink-soft, rgba(35, 42, 37, 0.72));
          line-height: 1.65;
        }
        .timeline-stop.is-active .timeline-marker {
          background: #d1a83d;
          box-shadow: 0 0 0 0.55rem rgba(209, 168, 61, 0.16);
          transform: scale(1.42);
        }
        .timeline-stop.is-active .timeline-copy {
          background: rgba(255, 254, 241, 0.96);
          box-shadow: 0 24px 44px -30px rgba(25, 31, 27, 0.65);
          transform: translateY(-0.35rem) rotate(-0.35deg);
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
        .developer-support {
          position: fixed;
          z-index: 80;
          right: 1.25rem;
          bottom: 1.25rem;
          width: min(22rem, calc(100vw - 2.5rem));
          padding: 1.25rem 3rem 1.15rem 1.25rem;
          border: 1px solid rgba(255, 241, 190, 0.24);
          border-radius: 1.15rem;
          background: rgba(32, 39, 32, 0.96);
          box-shadow: 0 24px 52px -28px rgba(25, 31, 27, 0.92);
          color: #fff1be;
          opacity: 0;
          pointer-events: none;
          transform: translate3d(0, 1.5rem, 0) scale(0.96);
          transition:
            opacity 380ms ease,
            transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .developer-support.is-visible {
          opacity: 1;
          pointer-events: auto;
          transform: translate3d(0, 0, 0) scale(1);
        }
        .developer-support-label {
          color: #d1a83d;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .developer-support p {
          margin-top: 0.4rem;
          color: rgba(255, 241, 190, 0.76);
          font-size: 0.88rem;
          line-height: 1.45;
        }
        .developer-support-actions {
          display: grid;
          gap: 0.52rem;
          margin-top: 0.85rem;
        }
        .developer-support a {
          display: inline-flex;
          gap: 0.4rem;
          color: #fff1be;
          font-size: 0.84rem;
          font-weight: 700;
          transition:
            color 200ms ease,
            transform 200ms ease;
        }
        .developer-support a:hover {
          color: #d1a83d;
          transform: translateX(3px);
        }
        .developer-support-close {
          position: absolute;
          top: 0.65rem;
          right: 0.75rem;
          width: 1.75rem;
          height: 1.75rem;
          border: 0;
          border-radius: 999px;
          background: rgba(255, 241, 190, 0.1);
          color: #fff1be;
          font-size: 1.25rem;
          line-height: 1;
          transition:
            background 200ms ease,
            transform 200ms ease;
        }
        .developer-support-close:hover {
          background: rgba(255, 241, 190, 0.18);
          transform: rotate(90deg);
        }
        .footer-legal {
          margin-top: 1.2rem;
          padding: 1rem 0.25rem 0;
          border-top: 1px solid rgba(35, 42, 37, 0.1);
          color: rgba(35, 42, 37, 0.52);
          font-size: 0.72rem;
          line-height: 1.5;
        }
        .footer-legal a {
          color: #b76849;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 0.2rem;
        }
        .footer-legal span {
          color: #202720;
          font-family: var(--font-mono), ui-monospace, monospace;
          font-weight: 700;
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
          .hero-section {
            overflow: hidden;
          }
          .hero-background {
            top: 8rem;
            right: -13rem;
            width: 35rem;
            height: 38rem;
            opacity: 0.4;
          }
          .hero-background-fade {
            background: linear-gradient(
                90deg,
                #f7f1e4 0%,
                rgba(247, 241, 228, 0.72) 52%,
                rgba(247, 241, 228, 0.12) 100%
              ),
              linear-gradient(180deg, #f7f1e4 0%, transparent 30%, #f7f1e4 100%);
          }
          .hero-content {
            min-height: 32rem;
          }
          .audience-strip {
            align-items: flex-start;
            flex-direction: column;
            margin-bottom: 2.75rem;
          }
          .audience-list {
            width: 100%;
            flex-direction: column;
          }
          .audience-card {
            width: 100%;
          }
          .future-goals {
            align-items: flex-start;
            flex-direction: column;
            gap: 1rem;
            padding: 2.6rem 1.5rem;
          }
          .future-goals-list {
            justify-content: flex-start;
          }
          .future-goals-list span:not(:last-child)::after {
            margin-left: 0.85rem;
          }
          .sponsor-carousel {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 0.75rem 0;
          }
          .sponsor-carousel-label {
            padding: 0 1.5rem 0.4rem;
          }
          .sponsor-track {
            padding: 0.75rem 0;
          }
          .journey-timeline {
            margin-top: 2.5rem;
          }
          .timeline-rail {
            top: 2rem;
            bottom: 2rem;
            left: 0.85rem;
          }
          .timeline-stop {
            min-height: 0;
            grid-template-columns: 1.7rem minmax(0, 1fr);
            padding-bottom: 2rem;
          }
          .timeline-stop:last-child {
            padding-bottom: 0;
          }
          .timeline-marker {
            grid-column: 1;
          }
          .timeline-copy,
          .timeline-stop:nth-child(odd) .timeline-copy {
            grid-column: 2;
            text-align: left;
          }
          .timeline-runner {
            left: 0.85rem;
          }
          .developer-support {
            right: 0.85rem;
            bottom: 0.85rem;
            width: calc(100vw - 1.7rem);
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
