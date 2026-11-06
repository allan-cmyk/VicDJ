export type PostImage = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  /** CSS object-position, for photos that crop badly from the center. */
  position?: string
}

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: readonly string[] }
  | { type: "ol"; items: readonly string[]; /** Number of the first item. */ start?: number }
  | ({ type: "image" } & PostImage)

export type PostSource = { label: string; url: string }

export type Post = {
  slug: string
  title: string
  /** Search result description. Keep it under about 155 characters. */
  description: string
  category: "Weddings" | "Corporate" | "Nightlife" | "Cruise" | "Planning"
  /** ISO date, e.g. "2026-11-05". */
  published: string
  cover: PostImage
  body: readonly PostBlock[]
  /** Outside sources for any figures or rules in the post. */
  sources?: readonly PostSource[]
}
