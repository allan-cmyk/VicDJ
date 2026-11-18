/**
 * Gallery tiles — curated from @djtr3y. Mix of images and short silent-loop
 * MP4 clips. Rendered as a duotone masonry with color reveal on hover,
 * filterable by category, expandable in a lightbox.
 */

import type { HighlightCategory } from "@/data/highlights"

export type GalleryCategory = HighlightCategory

export type GalleryFilter = GalleryCategory | "featured" | "all"

export const GALLERY_FILTERS: readonly { value: GalleryFilter; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "weddings", label: "Weddings" },
  { value: "corporate", label: "Corporate" },
  { value: "nightlife", label: "Nightlife" },
  { value: "cruise", label: "Cruise" },
  { value: "all", label: "All" },
] as const

/**
 * The 15 tiles shown by default ("Featured"), in display order. Picked by Vic's
 * brief: highest-quality shots and reels first, every kind of event covered,
 * the club reel and a truss setup included. Everything else stays reachable
 * through the category filters and "All".
 */
export const FEATURED_GALLERY_SRCS: readonly string[] = [
  "/media/gallery/tile-club-set.mp4",
  "/media/gallery/wedding-first-dance-monogram.jpg",
  "/media/gallery/corporate-truss-uplighting.jpg",
  "/media/gallery/tile-reception-packed-floor.mp4",
  "/media/gallery/cruise-downtown-skyline.jpg",
  "/media/gallery/nightlife-stage-gold.jpg",
  "/media/gallery/wedding-head-table-sunset.jpg",
  "/media/gallery/tile-ballroom-booth-view.mp4",
  "/media/gallery/cruise-atx-disco-cruise.jpg",
  "/media/gallery/nightlife-new-years-booth.jpg",
  "/media/gallery/tile-reception-couple-dance.mp4",
  "/media/gallery/frost-bank-tower.jpg",
  "/media/gallery/wedding-cold-sparks.jpg",
  "/media/gallery/tile-rooftop-night-set.mp4",
  "/media/gallery/cruise-decks-crowd.jpg",
]

export type GalleryTile =
  | {
      type: "image"
      src: string
      alt: string
      caption?: string
      category: GalleryCategory
      width: number
      height: number
    }
  | {
      type: "video"
      src: string
      alt: string
      caption?: string
      category: GalleryCategory
      poster?: string
      /** Aspect ratio as w/h for masonry layout. */
      width: number
      height: number
    }

export const gallery: readonly GalleryTile[] = [
  {
    type: "image",
    src: "/media/gallery/wedding-first-dance-monogram.jpg",
    alt: "Bride and groom's first dance in a stone hall with a custom monogram projected on the wall",
    caption: "First Dance · Custom Monogram",
    category: "weddings",
    width: 1440,
    height: 1080,
  },
  {
    type: "image",
    src: "/media/gallery/cruise-decks-crowd.jpg",
    alt: "DJ Trey behind the decks on a Premier Party Cruises barge, crowd dancing under the sun",
    caption: "Premier Party Cruises · Lake Travis",
    category: "cruise",
    width: 1440,
    height: 959,
  },
  {
    type: "video",
    src: "/media/gallery/tile-club-set.mp4",
    poster: "/media/gallery/tile-club-set-poster.jpg",
    alt: "DJ Trey playing a club set under red and blue lights",
    caption: "Club Set · Lights Up",
    category: "nightlife",
    width: 536,
    height: 960,
  },
  {
    type: "image",
    src: "/media/gallery/corporate-truss-uplighting.jpg",
    alt: "DJ booth framed by a lighting truss with blue uplighting at an event hall",
    caption: "Truss Rig · Uplighting",
    category: "corporate",
    width: 960,
    height: 702,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-urban-rooftop.jpg",
    alt: "DJ Trey and guests at the DJ booth at Urban Rooftop in Round Rock",
    caption: "Urban Rooftop · Round Rock",
    category: "nightlife",
    width: 1440,
    height: 1080,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-cold-sparks.jpg",
    alt: "Couple's first dance in a ballroom with cold-spark fountains and DJ Trey's truss booth",
    caption: "First Dance · Cold Sparks",
    category: "weddings",
    width: 1020,
    height: 665,
  },
  {
    type: "image",
    src: "/media/gallery/cruise-downtown-skyline.jpg",
    alt: "DJ Trey in a red blazer at the decks on a boat in front of the downtown Austin skyline",
    caption: "Lady Bird Lake · Downtown Austin",
    category: "cruise",
    width: 1178,
    height: 625,
  },
  {
    type: "video",
    src: "/media/gallery/tile-reception-packed-floor.mp4",
    poster: "/media/gallery/tile-reception-packed-floor-poster.jpg",
    alt: "Packed wedding reception dance floor seen from the DJ booth",
    caption: "Reception · Packed Floor",
    category: "weddings",
    width: 1280,
    height: 720,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-pioneer-point.jpg",
    alt: "DJ Trey smiling and pointing behind a Pioneer DJ setup",
    caption: "Behind the Pioneers",
    category: "nightlife",
    width: 1440,
    height: 1080,
  },
  {
    type: "image",
    src: "/media/gallery/corporate-booth-screen.jpg",
    alt: "DJ Trey booth with a glowing logo screen, speakers and controller set up in a venue",
    caption: "DJ Trey Booth · Event Setup",
    category: "corporate",
    width: 1080,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-head-table-sunset.jpg",
    alt: "DJ Trey with the bride and groom at the head table in front of a sunset window",
    caption: "Head Table · Sunset",
    category: "weddings",
    width: 1080,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/frost-bank-tower.jpg",
    alt: "DJ rig at Frost Fest atop Frost Bank Tower, downtown Austin",
    caption: "Frost Fest · Frost Bank Tower",
    category: "corporate",
    width: 1440,
    height: 1440,
  },
  {
    type: "video",
    src: "/media/gallery/tile-highland-nightclub.mp4",
    poster: "/media/gallery/tile-highland-nightclub-poster.jpg",
    alt: "DJ Trey on the mic at Highland Lounge, 3:30am",
    caption: "Highland Lounge · 3:30am",
    category: "nightlife",
    width: 640,
    height: 640,
  },
  {
    type: "image",
    src: "/media/gallery/cruise-atx-disco-cruise.jpg",
    alt: "DJ Trey at an ATX Disco Cruise DJ booth on a party boat",
    caption: "ATX Disco Cruise",
    category: "cruise",
    width: 1082,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-floral-backdrop.jpg",
    alt: "DJ Trey with the newlyweds in front of a white floral backdrop",
    caption: "Reception · Floral Backdrop",
    category: "weddings",
    width: 1080,
    height: 1440,
  },
  {
    type: "video",
    src: "/media/gallery/tile-ballroom-booth-view.mp4",
    poster: "/media/gallery/tile-ballroom-booth-view-poster.jpg",
    alt: "View from the DJ booth across a chandelier-lit ballroom",
    caption: "Ballroom · From the Booth",
    category: "corporate",
    width: 720,
    height: 1280,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-new-years-booth.jpg",
    alt: "DJ Trey at a lit truss booth under a Happy New Year banner",
    caption: "New Year's Eve · Booth",
    category: "nightlife",
    width: 1366,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-ballroom-couple.jpg",
    alt: "DJ Trey standing with the bride and groom in a reception hall",
    caption: "With the Newlyweds",
    category: "weddings",
    width: 1080,
    height: 1440,
  },
  {
    type: "video",
    src: "/media/gallery/tile-rooftop-night-set.mp4",
    poster: "/media/gallery/tile-rooftop-night-set-poster.jpg",
    alt: "DJ Trey dancing behind the decks on a rooftop at night",
    caption: "Rooftop · Night Set",
    category: "nightlife",
    width: 1280,
    height: 720,
  },
  {
    type: "image",
    src: "/media/gallery/cruise-dj-trey-booth.jpg",
    alt: "DJ Trey branded booth set up on the deck of a party boat",
    caption: "DJ Trey Booth · On Deck",
    category: "cruise",
    width: 1290,
    height: 1366,
  },
  {
    type: "image",
    src: "/media/gallery/corporate-hands-on-decks.jpg",
    alt: "DJ Trey working a Pioneer controller at an indoor event",
    caption: "Hands on the Decks",
    category: "corporate",
    width: 810,
    height: 1080,
  },
  {
    type: "image",
    src: "/media/gallery/kalahari-rig.jpg",
    alt: "Pioneer Rekordbox DJ rig at Baobab Social, Kalahari Resorts Round Rock",
    caption: "Kalahari · Baobab Social",
    category: "corporate",
    width: 1440,
    height: 1439,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-stage-gold.jpg",
    alt: "DJ Trey on stage at the decks under gold lighting facing the crowd",
    caption: "Main Stage · Gold Light",
    category: "nightlife",
    width: 1440,
    height: 1440,
  },
  {
    type: "video",
    src: "/media/gallery/tile-reception-couple-dance.mp4",
    poster: "/media/gallery/tile-reception-couple-dance-poster.jpg",
    alt: "Bride and groom dancing next to the DJ booth under purple uplighting",
    caption: "Reception · Couple on the Floor",
    category: "weddings",
    width: 1280,
    height: 720,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-lodge-reception.jpg",
    alt: "DJ Trey with the bride and groom in a wood-beamed lodge reception",
    caption: "Lodge Reception",
    category: "weddings",
    width: 1440,
    height: 1080,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-packed-floor.jpg",
    alt: "View from the booth over a packed, purple-lit crowd",
    caption: "Packed Floor · AVProz",
    category: "nightlife",
    width: 954,
    height: 716,
  },
  {
    type: "image",
    src: "/media/gallery/cruise-longhorn-on-deck.jpg",
    alt: "DJ Trey in a burnt-orange shirt flashing a hand sign at the decks on a boat",
    caption: "On Deck · Lake Day",
    category: "cruise",
    width: 862,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/corporate-florals-booth.jpg",
    alt: "DJ Trey at a booth with a glowing logo screen beside floral centerpieces",
    caption: "Private Event · Florals",
    category: "corporate",
    width: 1080,
    height: 1440,
  },
  {
    type: "video",
    src: "/media/gallery/tile-domain-poolside.mp4",
    poster: "/media/gallery/tile-domain-poolside-poster.jpg",
    alt: "Poolside DJ set at Villages at the Domain",
    caption: "Villages · Domain · Poolside",
    category: "nightlife",
    width: 640,
    height: 640,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-couple-selfie.jpg",
    alt: "Selfie of DJ Trey with a bride and groom",
    caption: "With the Couple",
    category: "weddings",
    width: 1440,
    height: 1082,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-mural-booth.jpg",
    alt: "DJ Trey at the decks in a dark room with a painted floral mural",
    caption: "Night Set · Mural Room",
    category: "nightlife",
    width: 964,
    height: 1286,
  },
  {
    type: "image",
    src: "/media/gallery/kalahari-booth.jpg",
    alt: "DJ Trey at the booth at Kalahari Resorts Round Rock",
    caption: "Kalahari Resorts · Booth",
    category: "corporate",
    width: 1440,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/cruise-disco-cruise-booth.jpg",
    alt: "DJ Trey and a guest at the DJ booth on a party boat",
    caption: "ATX Disco Cruise · Booth",
    category: "cruise",
    width: 960,
    height: 640,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-stage-blue.jpg",
    alt: "DJ Trey at the decks on a stage washed in blue light",
    caption: "Main Stage · Blue Light",
    category: "nightlife",
    width: 1440,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-uplit-selfie.jpg",
    alt: "Selfie of DJ Trey with a bride, groom and guest under pink uplighting",
    caption: "Reception · Uplit Room",
    category: "weddings",
    width: 1440,
    height: 1082,
  },
  {
    type: "image",
    src: "/media/gallery/corporate-lobby-setup.jpg",
    alt: "DJ Trey booth with logo screen set up in a building lobby between topiary trees",
    caption: "Lobby Setup",
    category: "corporate",
    width: 1124,
    height: 810,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-blue-light-set.jpg",
    alt: "DJ Trey at the decks under blue and green lights",
    caption: "Blue Light Set",
    category: "nightlife",
    width: 1080,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-string-lights.jpg",
    alt: "DJ Trey with the bride and groom under string lights",
    caption: "Reception · String Lights",
    category: "weddings",
    width: 1440,
    height: 1080,
  },
  {
    type: "image",
    src: "/media/gallery/cruise-on-the-water.jpg",
    alt: "DJ Trey pointing at the camera with headphones on a boat",
    caption: "On the Water",
    category: "cruise",
    width: 988,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/sushi-bar-night.jpg",
    alt: "Night DJ set at a sushi bar with warm wine-bar lighting",
    caption: "Sushi Bar · Night Set",
    category: "nightlife",
    width: 2048,
    height: 1536,
  },
  {
    type: "image",
    src: "/media/gallery/corporate-truss-rig-booth.jpg",
    alt: "DJ Trey behind a full truss rig with moving-head lights",
    caption: "Truss Rig · Full Production",
    category: "corporate",
    width: 720,
    height: 1060,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-cowboy-hat.jpg",
    alt: "Selfie of DJ Trey with a bride and a groom in a cowboy hat",
    caption: "Reception · With the Couple",
    category: "weddings",
    width: 1082,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-patio-set.jpg",
    alt: "DJ Trey with headphones at the decks on an outdoor patio",
    caption: "Patio Set",
    category: "nightlife",
    width: 960,
    height: 1440,
  },
  {
    type: "image",
    src: "/media/gallery/flores-wedding-san-luis.jpg",
    alt: "Luxury ballroom wedding with blue patterned ceiling lighting — Flores Wedding, San Luis Resort, Galveston",
    caption: "Flores Wedding · San Luis Resort",
    category: "weddings",
    width: 1080,
    height: 1080,
  },
  {
    type: "video",
    src: "/media/gallery/tile-friday.mp4",
    poster: "/media/gallery/tile-friday-poster.jpg",
    alt: "Friday night at AV Productionz",
    caption: "Friday Night · AVProz",
    category: "nightlife",
    width: 640,
    height: 640,
  },
  {
    type: "image",
    src: "/media/gallery/private-party-lighting.jpg",
    alt: "Full truss lighting rig and DJ stage at a private party in Austin",
    caption: "Private Party · Austin",
    category: "corporate",
    width: 1080,
    height: 1350,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-reception-selfie.jpg",
    alt: "Selfie of DJ Trey with a bride and groom at the reception",
    caption: "Reception · Selfie",
    category: "weddings",
    width: 1440,
    height: 1082,
  },
  {
    type: "image",
    src: "/media/gallery/nightlife-decks-closeup.jpg",
    alt: "Close-up of DJ Trey's hands on a lit Pioneer mixer and decks",
    caption: "Hands on the Decks",
    category: "nightlife",
    width: 1440,
    height: 1082,
  },
  {
    type: "image",
    src: "/media/gallery/highland-patio.jpg",
    alt: "Night patio at Highland Lounge, Austin, with string lights and neon mural",
    caption: "Highland Lounge · Austin",
    category: "nightlife",
    width: 1440,
    height: 1435,
  },
] as const

/** Every unique image tile — reused by the decorative filmstrip rows. */
export const featuredGallery: readonly GalleryTile[] = FEATURED_GALLERY_SRCS.map((src) => {
  const tile = gallery.find((t) => t.src === src)
  if (!tile) throw new Error(`Featured gallery tile not found: ${src}`)
  return tile
})

export const galleryImages = gallery.filter(
  (t): t is Extract<GalleryTile, { type: "image" }> => t.type === "image"
)
