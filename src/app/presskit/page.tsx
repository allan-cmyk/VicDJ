import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"
import { CopyButton, MixList, PressPromo } from "./press-client"
import {
  PRESS_LIVE,
  bookingEmailBody,
  fullBio,
  pressClients,
  pressFacts,
  pressLead,
  pressLogo,
  pressMixes,
  pressPhotos,
  pressReel,
  pressServices,
  shortBio,
} from "./press-data"
import s from "./press.module.css"

/*
 * /presskit: one-page press kit for promoters, venues and planners (mixes, bio, press photos, booking).
 * Standalone like /vic: no site header or footer. Content lives in press-data.ts.
 */

const description =
  "Press kit for DJ Trey, Austin's open-format MC/DJ. Mixes, bio, press photos and booking in one page."
const ogImage = { url: "/media/gallery/cruise-dj-trey-booth.jpg", width: 1290, height: 1366, alt: "DJ Trey in the booth" }

export const metadata: Metadata = {
  title: { absolute: "DJ Trey · Presskit" },
  description,
  robots: PRESS_LIVE ? { index: true, follow: true } : { index: false, follow: false },
  alternates: { canonical: "/presskit" },
  openGraph: {
    type: "website",
    url: "/presskit",
    title: "DJ Trey · Presskit",
    description: "Austin open-format MC/DJ. Weddings · Corporate · Nightlife · Cruise. Mixes, bio, photos & booking.",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: "DJ Trey · Presskit", description, images: [ogImage] },
}

const { contact, socials } = siteConfig
const bookingMailto = `${contact.emailHref}?subject=${encodeURIComponent("Booking request: DJ Trey")}&body=${encodeURIComponent(bookingEmailBody)}`
const smsHref = `sms:${contact.phoneE164}`

const contactRows = [
  { label: "Phone", value: contact.phone, href: contact.phoneHref },
  { label: "Email", value: contact.email, href: contact.emailHref },
  { label: "Instagram", value: socials.instagram.handle, href: socials.instagram.url, out: true },
  { label: "TikTok", value: socials.tiktok.handle, href: socials.tiktok.url, out: true },
  { label: "YouTube", value: socials.youtube.handle, href: socials.youtube.url, out: true },
  { label: "Website", value: "djtr3y.com", href: "/" },
]

const navLinks = [
  { href: "#listen", label: "Listen" },
  { href: "#bio", label: "Bio" },
  { href: "#photos", label: "Photos" },
  { href: "#clients", label: "Clients" },
  { href: "#book", label: "Book" },
]

export default function PressKitPage() {
  return (
    <div className={s.page}>
      <header className={s.bar}>
        <div className={`${s.wrap} ${s.barInner}`}>
          <Link href="/" aria-label="DJ Trey home">
            <Image src={pressLogo.src} alt="DJ Trey" width={pressLogo.width} height={pressLogo.height} priority className={s.barLogo} />
          </Link>
          <nav className={s.nav} aria-label="Press kit sections">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a className={`${s.btn} ${s.gold} ${s.sm}`} href="#book">
            Book DJ Trey
          </a>
        </div>
      </header>

      <main>
        <div className={s.hero}>
          <Image src={pressReel.poster} alt="" fill priority sizes="100vw" className={s.heroMedia} />
          <video className={`${s.heroMedia} ${s.heroVideo}`} autoPlay muted loop playsInline poster={pressReel.poster} aria-hidden>
            <source src={pressReel.src} type="video/mp4" />
          </video>
          <div className={`${s.wrap} ${s.heroInner}`}>
            <div className={s.eyebrow}>Press kit · Austin, TX · Since {siteConfig.since}</div>
            <h1 className={s.h1}>DJ Trey</h1>
            <p className={s.lead}>{pressLead}</p>
            <div className={s.cta}>
              <a className={`${s.btn} ${s.gold}`} href="#book">
                Check a date
              </a>
              <a className={s.btn} href="#listen">
                ▶ Listen
              </a>
              <a className={s.btn} href="#photos">
                Press photos
              </a>
            </div>
            <PressPromo />
          </div>
        </div>

        <div className={`${s.wrap} ${s.factsWrap}`}>
          <div className={s.facts}>
            {pressFacts.map((f) => (
              <div key={f.label}>
                <b>{f.value}</b>
                <span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <section id="listen" className={s.section}>
          <div className={s.wrap}>
            <div className={s.eyebrow}>Listen</div>
            <h2 className={s.h2}>Mixes</h2>
            {pressMixes.length ? (
              <MixList mixes={pressMixes} />
            ) : (
              <div className={s.empty}>
                New mixes are on the way. Meanwhile, catch live sets on{" "}
                <a href={socials.youtube.url} target="_blank" rel="noopener noreferrer">YouTube</a> and reels on{" "}
                <a href={socials.instagram.url} target="_blank" rel="noopener noreferrer">Instagram</a>.
              </div>
            )}
            <div className={s.reel}>
              <video controls playsInline preload="metadata" poster={pressReel.poster}>
                <source src={pressReel.src} type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <section id="bio" className={s.section}>
          <div className={s.wrap}>
            <div className={s.eyebrow}>Bio</div>
            <h2 className={s.h2}>
              Twenty-three years behind the decks.
              <br />
              One obsession: the room.
            </h2>
            <div className={s.bio}>
              <div className={s.card}>
                <h3 className={s.cardHead}>
                  Short bio <CopyButton targetId="bio-short" />
                </h3>
                <p id="bio-short">{shortBio}</p>
              </div>
              <div className={s.card}>
                <h3 className={s.cardHead}>
                  Full bio <CopyButton targetId="bio-long" />
                </h3>
                <div id="bio-long">
                  {fullBio.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="photos" className={s.section}>
          <div className={s.wrap}>
            <div className={s.eyebrow}>Press photos</div>
            <h2 className={s.h2}>Ready for the flyer</h2>
            <p className={s.note}>
              Free to use for promotion with credit to DJ Trey. Tap a photo&rsquo;s Download button for the full-size file.
            </p>
            <div className={s.photos}>
              {pressPhotos.map((p) => (
                <figure key={p.src} className={s.photo}>
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 820px) 50vw, 360px" />
                  <a href={p.src} download>
                    Download
                  </a>
                </figure>
              ))}
            </div>
            <div className={s.logoRow}>
              <Image src={pressLogo.src} alt="DJ Trey logo" width={pressLogo.width} height={pressLogo.height} className={s.logoImg} />
              <a className={`${s.btn} ${s.sm}`} href={pressLogo.src} download>
                Download logo (PNG)
              </a>
            </div>
          </div>
        </section>

        <section id="clients" className={s.section}>
          <div className={s.wrap}>
            <div className={s.eyebrow}>What he plays</div>
            <h2 className={s.h2}>One DJ. Open format, every room.</h2>
            <div className={s.grid4}>
              {pressServices.map((sv) => (
                <div key={sv.title} className={s.card}>
                  <h3 className={s.h4}>{sv.title}</h3>
                  <p>{sv.text}</p>
                </div>
              ))}
            </div>
            <div className={s.card} style={{ marginTop: 12 }}>
              <h3 className={s.cardHead}>Production</h3>
              <p>
                Self-contained: DJ Trey brings sound, lighting and staging through his own production company, AV
                Productionz. Full tech specs available on request.
              </p>
            </div>
            <h3 className={`${s.eyebrow} ${s.clientsHead}`}>Selected clients &amp; venues</h3>
            <ul className={s.clients}>
              {pressClients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="book" className={s.section}>
          <div className={`${s.wrap} ${s.book}`}>
            <div>
              <div className={s.eyebrow}>Booking</div>
              <h2 className={s.h2}>Let&rsquo;s design your night.</h2>
              <p style={{ color: "var(--muted)" }}>
                Send the date, venue and type of event. You&rsquo;ll hear back within 24 hours with availability,
                packages and a quote.
              </p>
              <div className={s.cta} style={{ marginTop: 20 }}>
                <a className={`${s.btn} ${s.gold}`} href={bookingMailto}>
                  Email a booking request
                </a>
                <a className={s.btn} href={smsHref}>
                  Text
                </a>
                <a className={s.btn} href={contact.phoneHref}>
                  Call
                </a>
              </div>
            </div>
            <div className={`${s.card} ${s.contact}`}>
              {contactRows.map((r) =>
                r.href === "/" ? (
                  <Link key={r.label} href="/">
                    {r.label} <span>{r.value}</span>
                  </Link>
                ) : (
                  <a key={r.label} href={r.href} {...(r.out ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {r.label} <span>{r.value}</span>
                  </a>
                )
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={s.wrap}>© DJ Trey · AV Productionz · Austin, TX</div>
      </footer>
    </div>
  )
}
