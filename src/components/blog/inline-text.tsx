import Link from "next/link"

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g
const LINK_CLASS = "text-champagne underline underline-offset-4 hover:text-ivory transition-colors"

/** Renders post text, turning [label](url) into links. Everything else stays plain text. */
export function InlineText({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let cursor = 0

  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match
    parts.push(text.slice(cursor, match.index))
    parts.push(
      href.startsWith("/") ? (
        <Link key={match.index} href={href} className={LINK_CLASS}>
          {label}
        </Link>
      ) : (
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          {label}
        </a>
      )
    )
    cursor = match.index + whole.length
  }

  parts.push(text.slice(cursor))
  return <>{parts}</>
}
