import Image from "next/image";

const personalBests = [
  { event: "400m", time: "47.91", place: "Collegiate personal best" },
  { event: "600m", time: "1:15.22", place: "Short Track — Feb. 27, 2026" },
  { event: "800m", time: "1:45.24", place: "Virginia Challenge — Apr. 17, 2026" },
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
  { src: "/images/IMG_2203.jpeg", alt: "Niko Schultz crossing the finish line" },
  { src: "/images/IMG_2211.jpeg", alt: "Niko Schultz preparing to race" },
  { src: "/images/IMG_2207.jpeg", alt: "Niko Schultz training on the track" },
  { src: "/images/IMG_2208.jpeg", alt: "Niko Schultz after a race" },
  { src: "/images/IMG_2209.jpeg", alt: "Niko Schultz competing in the 800 meters" },
  { src: "/images/IMG_2210.jpeg", alt: "Portrait of Niko Schultz in team kit" },
];

export default function HomePage() {
  return (
    <main>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-cream-line/0 bg-cream/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="bib-label">
            Niko Schultz
          </a>

          <ul className="hidden gap-8 font-body text-sm font-semibold uppercase tracking-wide text-ink sm:flex">
            <li>
              <a href="#about" className="hover:text-clay">
                About
              </a>
            </li>
            <li>
              <a href="#bests" className="hover:text-clay">
                Bests
              </a>
            </li>
            <li>
              <a href="#news" className="hover:text-clay">
                News
              </a>
            </li>
            <li>
              <a href="#gallery" className="hover:text-clay">
                Gallery
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-clay">
                Contact
              </a>
            </li>
          </ul>

          <a href="#contact" className="btn-primary hidden sm:inline-flex">
            Get in touch
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="grid items-center gap-12 sm:grid-cols-2">
          <div className="animate-fadeUp">
            <span className="bib-label">800m Athlete · Puerto Rico</span>

            <h1 className="section-heading mt-6 text-6xl sm:text-7xl">
              Niko
              <br />
              Schultz
            </h1>

            <p className="mt-6 max-w-md text-balance font-body text-lg text-ink-soft">
              Niko Schultz is a Puerto Rico–eligible 800m runner, Penn State
              student-athlete, and NCAA First-Team All-American. A Joliet,
              Illinois native, he owns a 1:45.24 personal best and finished
              sixth in the 2026 NCAA Division I Outdoor 800m final.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#news" className="btn-primary">
                Recent news
              </a>
              <a href="#bests" className="btn-secondary">
                Personal bests
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-cream-soft">
            <Image
              src="/images/hero.jpg"
              alt="Niko Schultz racing the 800 meters"
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

      {/* PERSONAL BESTS */}
      <section id="bests" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-heading">Personal Bests</h2>

        <p className="mt-3 max-w-lg text-ink-soft">
          Proven range from the 400m through the 800m.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {personalBests.map((pb) => (
            <div key={pb.event} className="split-chip">
              <span className="font-mono text-xs uppercase tracking-widest2 text-cream/70">
                {pb.event}
              </span>
              <span className="split-time">{pb.time}</span>
              <span className="font-body text-sm text-cream/80">
                {pb.place}
              </span>
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
              Niko Schultz is a Puerto Rico–eligible middle-distance runner
              specializing in the 800m. Originally from Joliet, Illinois, he
              ran for Plainfield South High School before competing at the
              University of Nebraska–Lincoln and later transferring to Penn
              State.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              In 2026, Schultz earned First-Team All-American honors after
              finishing sixth in the NCAA Division I Outdoor 800m final. He
              owns a 1:45.24 personal best in the 800m and brings range from
              the 400m through the 1,000m. Off the track, Niko is a business
              marketing graduate and digital creator who shares his training,
              racing, and athlete journey.
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
      <section id="news" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="section-heading">Recent News</h2>

        <p className="mt-3 max-w-lg text-ink-soft">
          Race updates, international competition, and life beyond the track.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-ink/10">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-ink text-cream">
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">
                  Date
                </th>
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">
                  Update
                </th>
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">
                  Location
                </th>
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">
                  Category
                </th>
                <th className="px-5 py-4 font-body text-xs font-semibold uppercase tracking-widest2">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {news.map((row, i) => (
                <tr
                  key={row.title}
                  className={i % 2 === 0 ? "bg-cream" : "bg-cream-soft"}
                >
                  <td className="px-5 py-4 font-mono text-sm">
                    {row.date}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    {row.title}
                  </td>

                  <td className="px-5 py-4 text-ink-soft">
                    {row.location}
                  </td>

                  <td className="px-5 py-4 text-ink-soft">
                    {row.category}
                  </td>

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
              For sponsorships, media, race invitations, or collaborations,
              reach out directly.
            </p>

            <a
              href="mailto:nikoschultzbranding@gmail.com"
              className="btn-primary mt-8 inline-flex"
            >
              nikoschultzbranding@gmail.com
            </a>
          </div>

          <div className="sm:justify-self-end">
            <span className="bib-label">Follow along</span>

            <ul className="mt-4 space-y-2 font-body text-lg font-semibold">
              <li>
                <a
                  href="https://instagram.com/nikoschultzzz"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-clay"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@nikojschultz"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-clay"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@nikoschultz"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-clay"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-ink-soft sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} Niko Schultz. All rights reserved.
          </span>

          <span className="font-mono">800M · PENN STATE</span>
        </div>
      </footer>
    </main>
  );
}
