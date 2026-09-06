"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { InstagramIcon } from "@/components/ui/social-icons"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { EASING } from "@/lib/motion-config"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

interface HeroProps {
  videoMp4?: string
  videoWebm?: string
  poster?: string
  className?: string
}

const PILLARS = ["Weddings", "Corporate", "Nightlife", "Cruise"] as const

/**
 * Hero — full-viewport cinematic video background with gradient scrim and a single
 * editorial headline. Serves WebM first (smaller / better quality) with MP4 fallback.
 * Scroll-linked parallax: video scales up & drifts down slowly; text rises at a
 * different rate so the layers feel separate. Respects prefers-reduced-motion.
 */
export function Hero({
  videoMp4 = "/media/hero.mp4",
  videoWebm = "/media/hero.webm",
  poster = "/media/hero-poster.jpg",
  className,
}: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [activePillar, setActivePillar] = useState(0)

  // Cycle the pillar strip — a quiet heartbeat that keeps the hero alive.
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setActivePillar((p) => (p + 1) % PILLARS.length), 2400)
    return () => clearInterval(id)
  }, [reduced])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Background layer: slow zoom 1.0 → 1.12 and drift 0 → 90px as you scroll past.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 90])
  // Text layer rises faster so it "leaves" earlier than the video.
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className={cn(
        "relative isolate min-h-[100svh] w-full overflow-hidden bg-ink text-ivory",
        className
      )}
    >
      {/* Video background — parallax layer. Soft + opacity-dampened so it
          reads as ambient texture, not a foreground broadcast. */}
      <motion.div
        style={reduced ? undefined : { scale: bgScale, y: bgY }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <video
          className="h-full w-full object-cover opacity-[0.78]"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={videoWebm} type="video/webm" />
          <source src={videoMp4} type="video/mp4" />
        </video>
        {/* Fallback gradient if video fails — surfaces on error */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(242,167,75,0.18),_transparent_55%),_linear-gradient(180deg,_#0a0a0b_0%,_#141416_100%)]" />
      </motion.div>

      {/* Scrim layers — heavier vertical fade + a left-side wash so the headline
          area is consistently calm regardless of what the video is doing. */}
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-b from-ink/85 via-ink/55 to-ink/95" />
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
      {/* Subtle vignette to pull the eye toward center text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(10,10,11,0.55) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1320px] flex-col justify-between px-6 md:px-10 lg:px-14 pt-36 pb-16">
        <motion.div
          style={reduced ? undefined : { y: textY, opacity: textOpacity }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASING.reveal, delay: 0.15 }}
          className="max-w-3xl will-change-transform"
        >
          <EyebrowLabel className="mb-6">
            Austin · Since {siteConfig.since}
          </EyebrowLabel>
          <h1 className="font-display text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[0.98] tracking-[-0.02em] text-ivory">
            Austin&rsquo;s most requested <em className="italic font-light text-champagne">DJ</em>
            <br />
            <span className="text-ivory/85">for the nights people don&rsquo;t forget.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-ivory/70 leading-relaxed">
            Weddings. Corporate galas. Rooftop nights. Yacht &amp; cruise residencies. Sound,
            staging, and a crowd that stays on the floor — produced end to end by DJ Trey.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link href="#booking">Book DJ Trey</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="#services">Explore services</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASING.smooth, delay: 0.8 }}
          className="mt-16 flex items-end justify-between gap-6"
        >
          <div className="flex flex-1 items-center gap-4 text-ivory/55">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
            <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] md:text-[11px] md:tracking-[0.28em]">
              {PILLARS.map((pillar, i) => (
                <span key={pillar} className="flex items-center gap-x-2">
                  {i > 0 ? <span aria-hidden className="text-ivory/30">·</span> : null}
                  <span
                    className={cn(
                      "transition-colors duration-700",
                      i === activePillar
                        ? "text-champagne [text-shadow:0_0_18px_rgba(231,201,139,0.45)]"
                        : "text-ivory/50"
                    )}
                  >
                    {pillar}
                  </span>
                </span>
              ))}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-champagne/40 via-transparent to-transparent" />
          </div>

          <div className="hidden lg:flex items-center gap-5 text-ivory/70">
            <Link href={siteConfig.contact.phoneHref} className="inline-flex items-center gap-2 hover:text-champagne transition-colors">
              <Phone size={14} />
              <span className="font-mono text-xs tracking-wide">{siteConfig.contact.phone}</span>
            </Link>
            <Link
              href={siteConfig.socials.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-champagne transition-colors"
            >
              <InstagramIcon size={14} />
              <span className="font-mono text-xs tracking-wide">{siteConfig.socials.instagram.handle}</span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASING.smooth }}
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 text-ivory/50"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.32em]">Scroll</span>
          <ArrowDown size={14} className="animate-[bounce_2.8s_ease-in-out_infinite]" />
        </motion.div>
      </div>
    </section>
  )
}
