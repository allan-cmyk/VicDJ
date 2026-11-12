import type { Metadata, Viewport } from "next";
import { CARD_COVER_SITE_CHROME, CARD_PATH, CARD_SITE, CARD_THEME_COLOR, card, cardHas, cardName } from "../card-data";
import s from "../card.module.css";
import q from "./qr.module.css";

/*
 * /vic/qr — the card's QR code as big as the screen allows, for the owner to show at events (the card page's
 * "Show QR code" button opens it). The image (public/vic/qr.svg) comes from make-card.mjs and opens
 * <site>/vic?src=qr. Kept out of search and out of the sitemap.
 */
export const metadata: Metadata = {
  metadataBase: new URL(CARD_SITE),
  title: { absolute: `My QR · ${cardName}` },
  description: `Scan to save ${cardName}'s contact.`,
  robots: { index: false, follow: false },
  alternates: { canonical: `${CARD_PATH}/qr` },
};

export const viewport: Viewport = { themeColor: CARD_THEME_COLOR };

export default function CardQr() {
  return (
    // If the site's root layout already wraps pages in <main>, make this a <div> (and drop id="main" if it's taken).
    <main id="main" className={`${s.theme} ${q.page} ${CARD_COVER_SITE_CHROME ? s.cover : ""}`}>
      <div className={q.code} data-card="qr">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${CARD_PATH}/qr.svg`} alt={`QR code that opens ${cardName}'s contact card`} width={1024} height={1024} />
      </div>
      <h1 className={q.cta} data-card="qr-cta">
        Scan to save my contact
      </h1>
      <p className={q.name} data-card="qr-name">
        {card.givenName} {card.familyName}
        {cardHas(card.suffix) ? <span>, {card.suffix}</span> : null}
      </p>
    </main>
  );
}
