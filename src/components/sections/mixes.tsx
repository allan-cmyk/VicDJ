import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { siteConfig } from "@/lib/site-config"

export function Mixes() {
  const url = siteConfig.mixes.url
  if (!url) return null

  return (
    <Section id="mixes" tone="ink">
      <div className="max-w-3xl mb-12">
        <EyebrowLabel className="mb-4">On the decks</EyebrowLabel>
        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em] text-ivory">
          Sets that set the tempo.
        </h2>
        <p className="mt-6 max-w-xl text-ivory/60 leading-relaxed">
          A few recent open-format sets — press play, feel the read on the room.
        </p>
      </div>
      <div className="rounded-sm border border-ivory/8 bg-ivory/[0.02] overflow-hidden">
        <iframe
          title="DJ Trey — recent mix"
          width="100%"
          height="300"
          allow="autoplay"
          src={url}
          className="border-0"
        />
      </div>
    </Section>
  )
}
