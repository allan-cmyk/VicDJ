import { cn } from "@/lib/utils"

const ITEMS = [
  "Book Now",
  "Austin",
  "Weddings",
  "Corporate",
  "Nightlife",
  "Cruise",
  "Since 2008",
  "250+ Events",
  "38 Signature Venues",
] as const

interface MarqueeBandProps {
  className?: string
}

/**
 * Thin scrolling text band that sits between sections — evokes an editorial
 * luxury-brand website. Two copies of the list rendered for seamless loop,
 * `animation-play-state: paused` on hover.
 */
export function MarqueeBand({ className }: MarqueeBandProps) {
  return (
    <section
      aria-hidden
      className={cn(
        "relative border-y border-champagne/15 bg-ink",
        "overflow-hidden",
        className
      )}
    >
      <div className="group flex py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </section>
  )
}

function MarqueeRow() {
  return (
    <ul
      className={cn(
        "flex shrink-0 items-center gap-10 pr-10 whitespace-nowrap",
        "animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      )}
    >
      {ITEMS.map((item, i) => (
        <li
          key={`${item}-${i}`}
          className="flex items-center gap-10 font-display italic text-[clamp(1.5rem,2.6vw,2.25rem)] text-champagne/85"
        >
          {item}
          <span aria-hidden className="inline-block h-1.5 w-1.5 rotate-45 bg-champagne/60" />
        </li>
      ))}
    </ul>
  )
}
