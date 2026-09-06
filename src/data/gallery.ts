/**
 * Gallery tiles — curated from @djtr3y. Mix of images and short silent-loop
 * MP4 clips. Rendered as a duotone masonry with color reveal on hover,
 * filterable by category, expandable in a lightbox.
 */

import type { HighlightCategory } from "@/data/highlights"

export type GalleryCategory = HighlightCategory

export const GALLERY_FILTERS: readonly { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "weddings", label: "Weddings" },
  { value: "corporate", label: "Corporate" },
  { value: "nightlife", label: "Nightlife" },
  { value: "cruise", label: "Cruise" },
] as const

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
    src: "/media/gallery/cruise-decks-crowd.jpg",
    alt: "DJ Trey behind the decks on a Premier Party Cruises barge, crowd dancing under the sun",
    caption: "Premier Party Cruises · Lake Travis",
    category: "cruise",
    width: 1080,
    height: 720,
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
    src: "/media/gallery/tile-highland-nightclub.mp4",
    alt: "DJ Trey on the mic at Highland Lounge, 3:30am",
    caption: "Highland Lounge · 3:30am",
    category: "nightlife",
    width: 720,
    height: 720,
  },
  {
    type: "image",
    src: "/media/gallery/wedding-peacock-full.jpg",
    alt: "Wedding couple with peacock feather bouquet on the grand staircase of the Austin Central Library",
    caption: "Austin Central Library · Wedding",
    category: "weddings",
    width: 720,
    height: 900,
  },
  {
    type: "image",
    src: "/media/gallery/cruise-discoball.jpg",
    alt: "Dance floor with disco ball on the party barge, Lake Travis",
    caption: "Disco Ball · Lake Travis",
    category: "cruise",
    width: 1440,
    height: 959,
  },
  {
    type: "image",
    src: "/media/gallery/kalahari-rig.jpg",
    alt: "Pioneer Rekordbox DJ rig at Baobab Social, Kalahari Resorts Round Rock",
    caption: "Kalahari · Baobab Social",
    category: "corporate",
    width: 1080,
    height: 1080,
  },
  {
    type: "video",
    src: "/media/gallery/tile-domain-poolside.mp4",
    alt: "Poolside DJ set at Villages at the Domain",
    caption: "Villages · Domain · Poolside",
    category: "nightlife",
    width: 720,
    height: 720,
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
    src: "/media/gallery/cruise-backflip.jpg",
    alt: "Guest backflipping into Lake Travis off the Premier Party Cruises barge",
    caption: "Lake Travis · Takeoff",
    category: "cruise",
    width: 1440,
    height: 959,
  },
  {
    type: "image",
    src: "/media/gallery/kalahari-booth.jpg",
    alt: "DJ Trey at the booth at Kalahari Resorts Round Rock",
    caption: "Kalahari Resorts · Booth",
    category: "corporate",
    width: 1080,
    height: 1080,
  },
  {
    type: "image",
    src: "/media/gallery/sushi-bar-night.jpg",
    alt: "Night DJ set at a sushi bar with warm wine-bar lighting",
    caption: "Sushi Bar · Night Set",
    category: "nightlife",
    width: 1040,
    height: 780,
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
    src: "/media/gallery/tile-friday.mp4",
    alt: "Friday night at AV Productionz",
    caption: "Friday Night · AVProz",
    category: "nightlife",
    width: 720,
    height: 720,
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
  {
    type: "image",
    src: "/media/gallery/wedding-peacock-close.jpg",
    alt: "Wedding couple portrait with peacock bouquet",
    caption: "Wedding · Downtown Austin",
    category: "weddings",
    width: 720,
    height: 900,
  },
  {
    type: "image",
    src: "/media/gallery/cruise-partybarge.jpg",
    alt: "Crowd on the party barge at golden hour, Lake Travis",
    caption: "Party Barge · Golden Hour",
    category: "cruise",
    width: 1440,
    height: 959,
  },
] as const

/** Every unique image tile — reused by the decorative filmstrip rows. */
export const galleryImages = gallery.filter(
  (t): t is Extract<GalleryTile, { type: "image" }> => t.type === "image"
)
