import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { TextMaskReveal } from "@/components/motion/text-mask-reveal"
import { CountUp } from "@/components/ui/count-up"
import { siteConfig } from "@/lib/site-config"

export function About() {
  return (
    <Section id="about" tone="ink">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 items-center">
        <Reveal direction="left">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-ivory/8 bg-gradient-to-br from-ivory/[0.04] via-ink to-ink-soft">
            {/* Replace with <Image src="/media/portrait.jpg" ... /> once Victor supplies it */}
            <PortraitPlaceholder />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-champagne">
                  Founder · DJ
                </p>
                <p className="font-display text-2xl text-ivory">Victor &ldquo;DJ Trey&rdquo; Gutierrez</p>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ivory/60">
                Est. {siteConfig.since}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="space-y-8">
          <Reveal>
            <EyebrowLabel className="mb-4">About</EyebrowLabel>
            <TextMaskReveal
              as="h2"
              className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.015em] text-ivory"
            >
              Seventeen years behind the decks. <em className="italic font-light text-champagne">One obsession: the room.</em>
            </TextMaskReveal>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 text-ivory/70 leading-relaxed max-w-xl">
              <p>
                AV Productionz started in 2008 as a college side hustle in Austin, TX and grew into
                a full entertainment production company. Today Victor runs sound, lighting, and
                staging for everything from Driskill ballrooms to rooftop takeovers.
              </p>
              <p>
                He&rsquo;s the resident DJ at Premier Party Cruises and has produced for
                Whataburger, Frost Bank, Endeavor Real Estate, Archer Hotel, Kalahari and
                thirty-plus more. Open format by training, cinematic by choice.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ivory/8 rounded-sm overflow-hidden border border-ivory/8">
              {siteConfig.stats.map((stat) => (
                <div key={stat.label} className="bg-ink-soft px-5 py-6">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-ivory/50 mb-2">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-3xl text-champagne tracking-tight">
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function PortraitPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 200 250"
        className="h-2/3 w-auto opacity-25"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--champagne)" />
            <stop offset="100%" stopColor="var(--amber)" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="90" r="42" stroke="url(#g)" strokeWidth="1.2" />
        <path
          d="M30 240 C 30 170 170 170 170 240"
          stroke="url(#g)"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </div>
  )
}
