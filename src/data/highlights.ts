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
    category: "weddings",
    title: "Head table at sunset",
    detail: "Wedding reception · Austin",
    media: {
      type: "image",
      src: "/media/gallery/wedding-head-table-sunset.jpg",
      alt: "DJ Trey with the bride and groom at the head table in front of a sunset window",
    },
  },
  {
    category: "weddings",
    title: "First dance, custom monogram",
    detail: "Wedding reception",
    media: {
      type: "image",
      src: "/media/gallery/wedding-first-dance-monogram.jpg",
      alt: "Bride and groom's first dance in a stone hall with a custom monogram projected on the wall",
    },
  },
  {
    category: "corporate",
    title: "Full production",
    detail: "Truss, uplighting & sound",
    media: {
      type: "image",
      src: "/media/gallery/corporate-truss-uplighting.jpg",
      alt: "DJ Trey at a booth framed by a lighting truss with blue uplighting at an event hall",
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
      poster: "/media/gallery/tile-domain-poolside-poster.jpg",
      alt: "Poolside DJ set at Villages at the Domain",
    },
  },
  {
    category: "cruise",
    title: "Skyline on the water",
    detail: "Lady Bird Lake · Downtown Austin",
    media: {
      type: "image",
      src: "/media/gallery/cruise-downtown-skyline.jpg",
      alt: "DJ Trey in a red blazer at the decks on a boat in front of the downtown Austin skyline",
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
] as const
