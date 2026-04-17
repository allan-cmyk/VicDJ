import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { clients } from "@/data/clients"
import { cn } from "@/lib/utils"

/**
 * Pure CSS infinite marquee — two copies of the list for seamless loop.
 * Pauses on hover via `group-hover:[animation-play-state:paused]`.
 */
export function ClientMarquee() {
  return (
    <Section id="clients" tone="ink-soft" className="py-24 lg:py-32" container={false}>
      <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10 lg:px-14 mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <EyebrowLabel className="mb-4">Trusted by</EyebrowLabel>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] tracking-[-0.01em] text-ivory max-w-xl">
            The venues, brands &amp; couples that keep booking him back.
          </h2>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ivory/50">
          {clients.length} signature rooms &amp; partners
        </p>
      </div>

      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <MarqueeRow />
        <MarqueeRow aria-hidden />
      </div>
    </Section>
  )
}

function MarqueeRow({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-12 pr-12 whitespace-nowrap animate-[marquee_55s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
    >
      {clients.map((c, i) => (
        <li
          key={`${c.name}-${i}-${ariaHidden ? "b" : "a"}`}
          className={cn(
            "flex items-center gap-12 font-display text-[clamp(1.25rem,2.2vw,1.9rem)] tracking-[-0.005em]",
            i % 4 === 0 ? "text-champagne" : "text-ivory/75"
          )}
        >
          {c.name}
          <span aria-hidden className="h-1 w-1 rounded-full bg-champagne/50" />
        </li>
      ))}
    </ul>
  )
}
