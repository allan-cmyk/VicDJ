/**
 * Content for /presskit, the one-page press kit for promoters, venues and planners.
 * Contact details, socials and the offer line come from site-config.ts, so they stay in step with the rest of the site.
 */

/**
 * Not live yet: the page is kept out of search and the sitemap and isn't linked from the site.
 * To launch, set this to true and add `${siteConfig.url}/presskit` to src/app/sitemap.ts.
 */
export const PRESS_LIVE = false

export const pressFacts = [
  { value: "23", label: "years behind the decks" },
  { value: "250+", label: "events produced" },
  { value: "38", label: "signature venues" },
  { value: "2", label: "residencies: Premier Party Cruises · Urban Rooftop" },
] as const

export const pressLead =
  "Austin open-format MC/DJ. Resident at Premier Party Cruises & Urban Rooftop. Weddings, corporate, nightlife and cruise, produced end to end."

/**
 * Mixes. Upload each MP3 to public/media/mixes/ and add one line here, for example:
 *   { title: "Mix 01", sub: "Open format · Live from the booth", src: "/media/mixes/mix-01.mp3" },
 * With no mixes listed, the section points to YouTube and Instagram instead.
 */
export const pressMixes: readonly { title: string; sub?: string; src: string }[] = []

/** The reel under the mixes. Swap in a dedicated highlight reel when there is one. */
export const pressReel = { src: "/media/hero-sunset-720.mp4", poster: "/media/hero-sunset-poster.jpg" }

export const shortBio =
  "DJ Trey is an Austin-based, open-format MC/DJ with 23 years behind the decks and 250+ events produced. He's the resident DJ at Premier Party Cruises and Urban Rooftop, and plays weddings, corporate galas and rooftop nights across Texas."

export const fullBio = [
  'Victor "DJ Trey" Gutierrez has been reading the room since 2003. When he arrived in Austin in 2008, he started AV Productionz, a full entertainment production company that handles sound, lighting and staging for everything from Driskill ballrooms to rooftop takeovers.',
  "He's the resident DJ at Premier Party Cruises on Lake Travis and Urban Rooftop, and has produced events for Whataburger, Frost Bank, Endeavor Real Estate, Archer Hotel, Kalahari Resorts and thirty-plus more. Open format by training, cinematic by choice, and an MC who keeps the floor full from the first look to the last dance.",
]

/** Press photos. Each Download button links to the full-size file. */
export const pressPhotos = [
  { src: "/media/gallery/cruise-dj-trey-booth.jpg", alt: "DJ Trey in the booth on Premier Party Cruises" },
  { src: "/media/gallery/corporate-hands-on-decks.jpg", alt: "DJ Trey's hands on the decks" },
  { src: "/media/gallery/nightlife-stage-gold.jpg", alt: "Main stage in gold light" },
  { src: "/media/gallery/nightlife-new-years-booth.jpg", alt: "New Year's Eve booth" },
  { src: "/media/gallery/kalahari-booth.jpg", alt: "DJ booth at Kalahari Resorts" },
  { src: "/media/gallery/cruise-decks-crowd.jpg", alt: "Crowd on deck at a cruise event" },
] as const

export const pressLogo = { src: "/media/logo-djtr3y-glow.png", width: 610, height: 140 }

export const pressServices = [
  { title: "Weddings", text: "Ceremony, cocktail hour, reception & MC. Custom first-dance edits and uplighting." },
  { title: "Corporate", text: "Galas, launches, brand activations and conferences, with integrated AV." },
  { title: "Nightlife", text: "Rooftop & club residencies, venue takeovers, open-format sets." },
  { title: "Cruise", text: "Resident at Premier Party Cruises. Yacht and boat events on Lake Travis & Lady Bird Lake." },
] as const

export const pressClients = [
  "Whataburger", "Frost Bank Tower", "Endeavor Real Estate", "Archer Hotel at the Domain",
  "Kalahari Resorts Round Rock", "The Driskill", "The Austonian", "The Bowie on 4th",
  "Premier Party Cruises", "Urban Rooftop", "Skyhouse", "Flatiron at the Domain",
  "Highland Lounge", "Speakeasy on Congress", "77 Degrees Rooftop", "Rose Room",
  "Oskar Blues Brewery", "Celis Brewery", "Cru Wine Bar", "Palm Door on Sabine",
  "The Veranda in San Marcos", "San Luis Resort, Galveston", "Jingle Ball 5K", "Free to Breathe",
] as const

export const bookingEmailBody =
  "Hi Trey,\n\nEvent date:\nVenue / city:\nType of event (wedding, corporate, private, nightlife):\nGuest count:\nStart & end time:\n\nThanks!"
