/*
 * Generated files (photo, contact file, QR codes) were made with, from the repo root:
 *   node ~/.claude/skills/digital-business-card/scripts/make-card.mjs --data src/app/vic/card-data.ts --public public --out qr-output --photo public/media/hero-sunset-poster.jpg --crop 370,525,420
 * Rerun it after changing any field. Swap --photo/--crop for a real headshot when Vic has one.
 */
/*
 * Vic's digital business card. The /vic page, /vic/qr, the contact file and the QR codes all come from here.
 * A field left blank ("") or deleted is left out everywhere: no mobile means no Call or Text buttons and no phone
 * in the contact file; no company means no company line. The page reads this file at build time, but the contact
 * file, the photo files and the QR codes are generated: after a change, rerun the digital-business-card skill's
 * make-card.mjs (see that skill's SKILL.md, "Changing a detail later").
 * Plain data and no imports, so the generator script can read this file directly.
 */
export type Card = {
  givenName: string;
  familyName: string;
  /** Goes after the name: "Jordan Example, PhD". */
  suffix?: string;
  title?: string;
  company?: string;
  /** Mobile with its country code, +1XXXXXXXXXX; turns on the Call and Text buttons. */
  mobile?: string;
  email?: string;
  website?: string;
  linkedin?: string;
  /** Square photo in /public for the page (480 px); the contact file embeds its own 400 px copy. */
  photo?: { src: string; alt: string; width: number; height: number };
};

export const card: Card = {
  givenName: "Victor “DJ Trey”",
  familyName: "Gutierrez",
  suffix: "",
  title: "Founder & DJ",
  company: "AV Productionz",
  mobile: "+13619452522",
  email: "vic@djtr3y.com",
  website: "https://djtr3y.com",
  linkedin: "",
  photo: { src: "/vic/headshot.jpg", alt: "Victor “DJ Trey” Gutierrez", width: 480, height: 480 },
};

/** The live site's origin. The QR codes and the Share button point here, so use the real domain. */
export const CARD_SITE = "https://djtr3y.com";
export const CARD_PATH = "/vic";
/** The contact file in /public, served as text/vcard (see the header rule in next.config). */
export const CARD_VCF = "/victor-gutierrez.vcf";
/**
 * true when the site's root layout draws a header, footer, banner or chat button on every page: the card then
 * covers the whole screen on top of them, so it is dark edge to edge and fits a phone without scrolling.
 */
export const CARD_COVER_SITE_CHROME = false;
/** The card's background colour (keep it equal to --card-bg in card.module.css): tints the phone's browser bar. */
export const CARD_THEME_COLOR = "#0a0a0b";

/**
 * Page-only extra, not part of the skill's template: an Instagram button. The contact file has no Instagram
 * field, so it isn't saved with the contact, and check-card reports this button as "unexpected" (expected).
 */
export const CARD_INSTAGRAM = "https://www.instagram.com/djtr3y/";

const has = (v?: string) => typeof v === "string" && v.trim() !== "";
export const cardName = `${card.givenName} ${card.familyName}${has(card.suffix) ? `, ${card.suffix}` : ""}`;
export const cardHas = has;
/** The mobile as +<country><digits>, for tel: and sms: links. */
export const cardTel = has(card.mobile) ? (card.mobile as string).replace(/[^\d+]/g, "") : "";
