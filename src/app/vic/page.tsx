import type { Metadata, Viewport } from "next";
import { CARD_COVER_SITE_CHROME, CARD_INSTAGRAM, CARD_TIKTOK, CARD_PATH, CARD_SITE, CARD_THEME_COLOR, CARD_VCF, card, cardHas, cardName, cardTel } from "./card-data";
import { ShareButton } from "./ShareButton";
import s from "./card.module.css";

/*
 * /vic — Vic's digital business card behind the QR codes. Phone first: photo, name, title and the Save contact
 * button fit on a 375 px screen without scrolling; the whole page is the dark brand colour in light and dark mode.
 * Kept out of search and out of the sitemap. Built from the digital-business-card skill's Next.js template.
 */

const headline = cardHas(card.title) ? `${cardName} — ${card.title}` : cardName;
const description = `${cardHas(card.title) ? `${card.title}. ` : ""}Save my contact to your phone in one tap.`;
const ogImage = { url: `${CARD_PATH}/og.jpg`, width: 1200, height: 630, alt: headline };

export const metadata: Metadata = {
  metadataBase: new URL(CARD_SITE),
  title: { absolute: `${cardName} · Contact card` },
  description,
  robots: { index: false, follow: true },
  alternates: { canonical: CARD_PATH },
  openGraph: {
    type: "profile",
    url: CARD_PATH,
    title: headline,
    description,
    firstName: card.givenName,
    lastName: card.familyName,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: headline, description, images: [ogImage] },
};

export const viewport: Viewport = { themeColor: CARD_THEME_COLOR };

/* Arrows: right = another page on this site, up-right = leaves the site or opens a new tab. */
function Arrow({ out = false }: { out?: boolean }) {
  return (
    <svg className={s.icon} viewBox="0 0 16 16" aria-hidden="true">
      <path d={out ? "M5 11l6-6M6 5h5v5" : "M2 8h11M9 4l4 4-4 4"} />
    </svg>
  );
}

type Action = { href: string; label: string; out?: boolean; arrow?: boolean };

// A blank field drops its button: no mobile means no Call or Text.
const actions: Action[] = [
  ...(cardTel ? [{ href: `tel:${cardTel}`, label: "Call" }, { href: `sms:${cardTel}`, label: "Text" }] : []),
  ...(cardHas(card.email) ? [{ href: `mailto:${card.email}`, label: "Email", arrow: true, out: true }] : []),
  ...(cardHas(card.website) ? [{ href: card.website as string, label: "Website", arrow: true, out: !card.website?.startsWith(CARD_SITE) }] : []),
  ...(cardHas(card.linkedin) ? [{ href: card.linkedin as string, label: "LinkedIn", arrow: true, out: true }] : []),
  // Page-only extra (see CARD_INSTAGRAM in card-data.ts).
  ...(cardHas(CARD_INSTAGRAM) ? [{ href: CARD_INSTAGRAM, label: "Instagram", arrow: true, out: true }] : []),
  ...(cardHas(CARD_TIKTOK) ? [{ href: CARD_TIKTOK, label: "TikTok", arrow: true, out: true }] : []),
];

export default function ContactCard() {
  return (
    // If the site's root layout already wraps pages in <main>, make this a <div> (here and in qr/page.tsx), and drop
    // id="main" if the layout already uses that id.
    <main id="main" className={`${s.theme} ${s.page} ${CARD_COVER_SITE_CHROME ? s.cover : ""}`}>
      <section className={s.top} aria-labelledby="card-name">
        <div className={s.who}>
          <p className={s.kicker} data-card="kicker">
            Contact card
          </p>
          {card.photo ? (
            <div className={s.photo} data-card="photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.photo.src} alt={card.photo.alt} width={card.photo.width} height={card.photo.height} />
            </div>
          ) : null}
          <div className={s.text}>
            <h1 className={s.name} id="card-name" data-card="name">
              {card.givenName} {card.familyName}
              {cardHas(card.suffix) ? <span>, {card.suffix}</span> : null}
            </h1>
            {cardHas(card.title) ? <p className={s.title} data-card="title">{card.title}</p> : null}
            {cardHas(card.company) ? <p className={s.title} data-card="company">{card.company}</p> : null}
          </div>
        </div>
        {/* A plain link with no download attribute, so an iPhone opens the New Contact sheet instead of a download. */}
        <a className={`${s.btn} ${s.primary} ${s.save}`} href={CARD_VCF} data-card="save">
          Save contact
        </a>
      </section>

      <ul className={s.actions} aria-label="More ways to reach me" data-card="actions">
        {actions.map((a) => (
          <li key={a.label}>
            <a className={`${s.btn} ${s.secondary}`} href={a.href}>
              {a.label}
              {a.arrow ? <Arrow out={a.out} /> : null}
            </a>
          </li>
        ))}
        <li>
          <ShareButton className={`${s.btn} ${s.secondary}`} url={`${CARD_SITE}${CARD_PATH}`} title={cardName} text={headline} />
        </li>
        {/* The QR code full screen, in its own tab, for someone to scan. */}
        <li className={s.wide}>
          <a className={`${s.btn} ${s.secondary}`} href={`${CARD_PATH}/qr`} target="_blank" rel="noopener noreferrer" data-card="show-qr">
            Show QR code
            <Arrow out />
            <span className={s.sr}> (opens in a new tab)</span>
          </a>
        </li>
      </ul>
    </main>
  );
}
