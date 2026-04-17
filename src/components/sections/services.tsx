"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { TextMaskReveal } from "@/components/motion/text-mask-reveal"
import { services, type Service } from "@/data/services"
import { EASING } from "@/lib/motion-config"
import { cn } from "@/lib/utils"

export function Services() {
  return (
    <Section id="services" tone="ink">
      {/* Intro band */}
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 items-end mb-20 lg:mb-28">
        <Reveal>
          <EyebrowLabel className="mb-6">What we produce</EyebrowLabel>
          <TextMaskReveal
            as="h2"
            className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1] tracking-[-0.02em] text-ivory"
          >
            One DJ. <em className="italic font-light text-champagne">Three rooms he owns.</em>
          </TextMaskReveal>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-md text-ivory/65 leading-relaxed text-lg">
            Weddings, corporate, nightlife and cruise — different crowds, same obsession with
            reading the room and keeping the floor honest.
          </p>
        </Reveal>
      </div>

      {/* Cards — zigzag alternating layout for editorial rhythm */}
      <div className="space-y-24 lg:space-y-32">
        {services.map((svc, i) => (
          <ServiceCard key={svc.id} service={svc} index={i} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  )
}

function ServiceCard({
  service,
  index,
  reverse,
}: {
  service: Service
  index: number
  reverse: boolean
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASING.reveal, delay: index * 0.05 }}
      className={cn(
        "relative grid gap-10 lg:gap-16 items-center",
        "lg:grid-cols-[1.1fr_1fr]",
        reverse && "lg:[&>*:first-child]:order-2"
      )}
    >
      {/* Image side */}
      <div className="relative">
        {/* Giant background numeral — bleeds beyond the image for editorial drama */}
        <div
          aria-hidden
          className={cn(
            "absolute font-display italic font-light leading-none select-none pointer-events-none",
            "text-[clamp(10rem,22vw,20rem)] tracking-[-0.04em]",
            "top-[-0.3em]",
            reverse ? "right-[-0.1em]" : "left-[-0.1em]",
            "z-0"
          )}
          style={{
            color: "transparent",
            WebkitTextStroke: `1px ${service.accentVar}`,
            opacity: 0.18,
          }}
        >
          {service.number}
        </div>

        <motion.div
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.6, ease: EASING.smooth }}
          className="relative z-10 aspect-[4/5] lg:aspect-[5/6] overflow-hidden rounded-sm ring-1 ring-ivory/8"
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {/* Color wash that reinforces the pillar identity */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              background: `linear-gradient(135deg, ${service.accentVar}55, transparent 60%, ${service.accentVar}33)`,
            }}
          />
          {/* Bottom scrim */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />

          {/* Floating chip with glow */}
          <div
            className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-full border border-ivory/15 bg-ink/65 px-4 py-2 backdrop-blur-md"
            style={{ boxShadow: `0 0 30px -8px ${service.accentVar}` }}
          >
            <service.icon size={14} strokeWidth={1.4} style={{ color: service.accentVar }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory">
              {service.eyebrow}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Text side */}
      <div className="relative z-10 lg:px-2">
        <p
          className="font-mono text-[11px] uppercase tracking-[0.28em] mb-5"
          style={{ color: service.accentVar }}
        >
          <span className="opacity-80">{service.number}</span>
          <span className="mx-3 opacity-40">/</span>
          <span>{service.eyebrow}</span>
        </p>

        <h3 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.015em] text-ivory mb-6">
          {service.title}
        </h3>

        <p className="text-ivory/72 leading-relaxed max-w-xl text-base md:text-lg mb-8">
          {service.blurb}
        </p>

        {/* Accent rule */}
        <span
          aria-hidden
          className="block h-px w-16 mb-6 origin-left"
          style={{ background: service.accentVar, opacity: 0.7 }}
        />

        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 mb-8">
          {service.offerings.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ivory/75">
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: service.accentVar }}
              />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>

        <a
          href="#booking"
          className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ivory hover:text-champagne transition-colors group/link"
        >
          <span className="border-b border-ivory/20 pb-1 group-hover/link:border-champagne transition-colors">
            Book this set
          </span>
          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
        </a>
      </div>
    </motion.article>
  )
}
