import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { testimonials } from "@/data/testimonials"

export function Testimonials() {
  return (
    <Section id="testimonials" tone="ink-soft">
      <Reveal className="max-w-3xl">
        <EyebrowLabel className="mb-4">Word from the room</EyebrowLabel>
        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em] text-ivory">
          <em className="italic font-light text-champagne">&ldquo;</em> He ran the room. We kept booking him back.{" "}
          <em className="italic font-light text-champagne">&rdquo;</em>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <figure className="relative h-full rounded-sm border border-ivory/8 bg-ivory/[0.02] p-8 md:p-10">
              <span
                aria-hidden
                className="absolute -top-6 left-8 font-display text-7xl leading-none text-champagne/70"
              >
                &ldquo;
              </span>
              <blockquote className="text-ivory/80 leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 space-y-1">
                <p className="font-display text-base text-ivory">{t.name}</p>
                <p className="text-xs text-ivory/50">
                  {t.role} · <span className="text-champagne/80">{t.venue}</span>
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
