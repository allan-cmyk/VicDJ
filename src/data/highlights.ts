/**
 * Highlight reel — the big rooms, pulled from the same @djtr3y media set as the
 * gallery. Rendered as an autoplaying carousel; categories reuse the service
 * pillar accent colors so the whole site speaks one color language.
 */

export type HighlightCategory = "weddings" | "corporate" | "nightlife" | "cruise"

export const HIGHLIGHT_ACCENTS: Record<HighlightCategory, string> = {
  weddings: "var(--champagne)",
  corporate: "#7AB8C4",
  nightlife: "#E26D9C",
  cruise: "var(--amber)",
}

export const HIGHLIGHT_LABELS: Record<HighlightCategory, string> = {
  weddings: "Wedding",
  corporate: "Corporate",
  nightlife: "Nightlife",
  cruise: "Cruise",
}

export type Highlight = {
  category: HighlightCategory
  title: string
  detail: string
  media:
    | { type: "image"; src: string; alt: string }
    | { type: "video"; src: string; poster?: string; alt: string }
}

export const highlights: readonly Highlight[] = [
  {
    category: "corporate",
    title: "Frost Fest",
    detail: "Frost Bank Tower · Downtown Austin",
    media: {
      type: "image",
      src: "/media/gallery/frost-bank-tower.jpg",
      alt: "DJ rig at Frost Fest atop Frost Bank Tower, downtown Austin",
    },
  },
  {
    category: "cruise",
    title: "Resident on the water",
    detail: "Premier Party Cruises · Lake Travis",
    media: {
      type: "image",
      src: "/media/gallery/cruise-decks-crowd.jpg",
      alt: "DJ Trey behind the decks on a Premier Party Cruises barge, crowd dancing under the sun",
    },
  },
  {
    category: "nightlife",
    title: "3:30am, still going",
    detail: "Highland Lounge · Austin",
    media: {
      type: "video",
      src: "/media/gallery/tile-highland-nightclub.mp4",
      alt: "DJ Trey on the mic at Highland Lounge, 3:30am",
    },
  },
  {
    category: "weddings",
    title: "Flores Wedding",
    detail: "San Luis Resort · Galveston",
    media: {
      type: "image",
      src: "/media/gallery/flores-wedding-san-luis.jpg",
      alt: "Luxury ballroom wedding with blue patterned ceiling lighting — Flores Wedding, San Luis Resort",
    },
  },
  {
    category: "corporate",
    title: "Baobab Social",
    detail: "Kalahari Resorts · Round Rock",
    media: {
      type: "image",
      src: "/media/gallery/kalahari-rig.jpg",
      alt: "Pioneer Rekordbox DJ rig at Baobab Social, Kalahari Resorts Round Rock",
    },
  },
  {
    category: "nightlife",
    title: "Poolside takeover",
    detail: "Villages at the Domain",
    media: {
      type: "video",
      src: "/media/gallery/tile-domain-poolside.mp4",
      alt: "Poolside DJ set at Villages at the Domain",
    },
  },
  {
    category: "weddings",
    title: "Grand staircase vows",
    detail: "Austin Central Library",
    media: {
      type: "image",
      src: "/media/gallery/wedding-peacock-full.jpg",
      alt: "Wedding couple with peacock feather bouquet on the grand staircase of the Austin Central Library",
    },
  },
  {
    category: "cruise",
    title: "Golden hour barge",
    detail: "Party Barge · Lake Travis",
    media: {
      type: "image",
      src: "/media/gallery/cruise-partybarge.jpg",
      alt: "Crowd on the party barge at golden hour, Lake Travis",
    },
  },
] as const
