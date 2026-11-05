import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { TextMaskReveal } from "@/components/motion/text-mask-reveal"
import { GalleryBrowser } from "@/components/sections/gallery-browser"

export function Gallery() {
  return (
    // overflow-clip, not hidden: overflow:hidden makes the section a scroll container,
    // and the tiles' scroll-driven drift would then track it instead of the page.
    <Section id="gallery" tone="ink" className="overflow-clip">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <Reveal>
          <EyebrowLabel className="mb-4">Behind the decks</EyebrowLabel>
          <TextMaskReveal
            as="h2"
            className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em] text-ivory"
          >
            Rooms lit, floors moving, <em className="font-light italic text-champagne">moments made.</em>
          </TextMaskReveal>
        </Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/50">
          Tap a tile to see it big
        </p>
      </div>

      <GalleryBrowser />
    </Section>
  )
}
