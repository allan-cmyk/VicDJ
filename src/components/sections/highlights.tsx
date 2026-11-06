import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { TextMaskReveal } from "@/components/motion/text-mask-reveal"
import { HighlightsCarousel } from "@/components/sections/highlights-carousel"

export function Highlights() {
  return (
    <HighlightsCarousel
      heading={
        <Reveal>
          <EyebrowLabel className="mb-4">Highlight reel</EyebrowLabel>
          <TextMaskReveal
            as="h2"
            className="max-w-2xl font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em] text-ivory"
          >
            Big rooms. Small hours. <em className="font-light italic text-champagne">Full floors.</em>
          </TextMaskReveal>
        </Reveal>
      }
    />
  )
}
