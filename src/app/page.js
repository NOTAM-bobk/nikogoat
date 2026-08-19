import Image from "next/image";

const personalBests = [
  { event: "400m", time: "47.82", place: "Drake Relays, 2025" },
  { event: "800m", time: "1:44.61", place: "USATF Champs, 2025" },
  { event: "1500m", time: "3:38.02", place: "Bislett Games, 2024" },
];

const schedule = [
  { date: "Feb 14, 2026", meet: "Millrose Games", location: "New York, NY", event: "800m", status: "Confirmed" },
  { date: "Mar 07, 2026", meet: "USATF Indoor Champs", location: "Albuquerque, NM", event: "800m", status: "Confirmed" },
  { date: "May 02, 2026", meet: "Drake Relays", location: "Des Moines, IA", event: "800m", status: "Pending" },
  { date: "Jun 20, 2026", meet: "USATF Outdoor Champs", location: "Eugene, OR", event: "800m", status: "Confirmed" },
  { date: "Jul 12, 2026", meet: "Bislett Games", location: "Oslo, Norway", event: "800m", status: "Pending" },
];

const galleryImages = [
  { src: "/images/IMG_2203.jpeg", alt: "Niko Schultz crossing the finish line" },
  { src: "/images/IMG_2208.jpeg", alt: "Niko Schultz in the starting blocks" },
  { src: "/images/gallery-03.jpg", alt: "Niko Schultz training on the track" },
  { src: "/images/gallery-04.jpg", alt: "Niko Schultz celebrating a win" },
  { src: "/images/gallery-05.jpg", alt: "Niko Schultz mid-race, lane three" },
  { src: "/images/gallery-06.jpg", alt: "Niko Schultz portrait in team kit" },
];

export default function HomePage() {
  return (
    <main>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-cream-line/0 bg-cream/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="bib-label">
            NS · 800M
          </a>
          <ul className="hidden gap-8 font-body text-sm font-semibold uppercase tracking-wide text-ink sm:flex">
            <li><a href="#about" className="hover:text-clay">About</a></li>
            <li><a href="#bests" className="hover:text-clay">Bests</a></li>
            <li><a href="#schedule" className="hover:text-clay">Schedule</a></li>
            <li><a href="#gallery" className="hover:text-clay">Gallery</a></li>
            <li><a href="#contact" className="hover:text-clay">Contact</a></li>
          </ul>
          <a href="#contact" className="btn-primary hidden sm:inline-flex">Get in touch</a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <div className="animate-fadeUp">
            <span className="bib-label">Middle Distance · Est. 2019</span>
            <h1 className="section-heading mt-6 text-6xl sm:text-7xl">
              Niko
              <br />
              Schultz
            </h1>
            <p className="mt-6 max-w-md text-balance font-body text-lg text-ink-soft">
              Professional 800m runner racing for the two-lap gap between
              a controlled first 400 and an uncontrolled last 150.
              Based in Minneapolis. Racing worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#schedule" className="btn-primary">See race schedule</a>
              <a href="#bests" className="btn-secondary">Personal bests</a>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-cream-soft">
            {/* Replace with a real hero photo at /public/images/hero.jpg */}
            <Image
              src="/images/hero.jpg"
              alt="Niko Schultz racing the 800m"
              fill
              priority
              sizes="(min-width: 640px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* PERSONAL BESTS — scoreboard */}
      <section id="bests" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-heading">Personal Bests</h2>
        <p className="mt-3 max-w-lg text-ink-soft">
          Three events, three splits. Updated after every season.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {personalBests.map((pb) => (
            <div key={pb.event} className="split-chip">
              <span className="font-mono text-xs uppercase tracking-widest2 text-cream/70">
                {pb.event}
              </span>
              <span className="split-time">{pb.time}</span>
              <span className="font-body text-sm text-cream/80">{pb.place}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-start gap-12 sm:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-cream-soft sm:order-2">
            {/* Replace with a real profile photo at /public/images/profile.jpg */}
            <Image
              src="/images/profile.jpg"
              alt="Portrait of Niko Schultz"
              fill
              sizes="(min-width: 640px) 480px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="sm:order-1">
            <h2 className="section-heading">About</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Niko Schultz is a professional middle-distance runner
              specializing in the 800m. He started running the two-lap
              race in high school after a coach clocked his 400m split
              and refused to let him move up to the mile.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              He now trains out of Minneapolis, splitting his season
              between the US indoor circuit and summer meets across
              Europe. Off the track, he coaches youth sprinters on
              weekends and is slowly working through every marathon
              in the state park system — on foot, not in competition.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="bib-label">Minneapolis, MN</span>
              <span className="bib-label">Team Northline AC</span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* SCHEDULE */}
      <section id="schedule" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-heading">Race Schedule</h2>
        <p className="mt-3 max-w-lg text-ink-soft">
          Upcoming meets and results, updated through the season.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-ink/10">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-ink text-cream">
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">Date</th>
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">Meet</th>
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">Location</th>
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">Event</th>
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => (
                <tr
                  key={row.meet}
                  className={i % 2 === 0 ? "bg-cream" : "bg-cream-soft"}
                >
                  <td className="px-5 py-4 font-mono text-sm">{row.date}</td>
                  <td className="px-5 py-4 font-semibold">{row.meet}</td>
                  <td className="px-5 py-4 text-ink-soft">{row.location}</td>
                  <td className="px-5 py-4 text-ink-soft">{row.event}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide " +
                        (row.status === "Confirmed"
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
      <section id="gallery" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-heading">Gallery</h2>
        <p className="mt-3 max-w-lg text-ink-soft">
          Race day, training, and everything in between.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className="relative aspect-square overflow-hidden rounded-2xl bg-cream-soft"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 320px, 50vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        <div className="lane-divider" />
      </div>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="section-heading">Get in Touch</h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              For sponsorships, media, or race invites, reach out directly.
              Responses within a few business days.
            </p>
            <a
              href="mailto:hello@nikoschultz.com"
              className="btn-primary mt-8 inline-flex"
            >
              hello@nikoschultz.com
            </a>
          </div>
          <div className="sm:justify-self-end">
            <span className="bib-label">Follow along</span>
            <ul className="mt-4 space-y-2 font-body text-lg font-semibold">
              <li><a href="#" className="hover:text-clay">Instagram</a></li>
              <li><a href="#" className="hover:text-clay">Strava</a></li>
              <li><a href="#" className="hover:text-clay">X / Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-ink-soft sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} Niko Schultz. All rights reserved.</span>
          <span className="font-mono">800M · MINNEAPOLIS, MN</span>
        </div>
      </footer>
    </main>
  );
}
