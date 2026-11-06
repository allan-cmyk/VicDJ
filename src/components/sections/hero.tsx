import Image from "next/image"
import Link from "next/link"
import { ArrowDown, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AmbientVideo } from "@/components/ui/ambient-video"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { InstagramIcon } from "@/components/ui/social-icons"
import { HeroPillars } from "@/components/sections/hero-pillars"
import { siteConfig } from "@/lib/site-config"
import { cn } from "@/lib/utils"

interface HeroProps {
  videoMp4?: string
  /** Smaller encode for phones. The full file stays sharp on large screens. */
  videoMp4Mobile?: string
  poster?: string
  className?: string
}

/**
 * Hero — full-viewport cinematic video background with gradient scrim and a single
 * editorial headline. The video is a vertical rooftop-sunset clip (H.264 MP4, no audio);
 * object-position keeps Vic and the horizon in frame when it's cropped to a wide screen.
 * Scroll-linked parallax: video scales up & drifts down slowly; text rises at a
 * different rate so the layers feel separate. Respects prefers-reduced-motion.
 *
 * This is a server component and all its motion is CSS, so the headline paints with
 * the HTML instead of waiting for JavaScript. The poster image is what paints first;
 * the video starts after the page has loaded and fades in over it.
 */
export function Hero({
  videoMp4 = "/media/hero-sunset.mp4",
  videoMp4Mobile = "/media/hero-sunset-720.mp4",
  poster = "/media/hero-sunset-poster.jpg",
  className,
}: HeroProps) {
  return (
    <section
      id="top"
      className={cn(
        "hero relative isolate min-h-[100svh] w-full overflow-hidden bg-ink text-ivory",
        className
      )}
    >
      {/* Video background — parallax layer. Soft + opacity-dampened so it
          reads as ambient texture, not a foreground broadcast. */}
      <div className="hero-bg-scroll absolute inset-0 -z-10 will-change-transform">
        <div className="absolute inset-0 opacity-[0.95]">
          <Image
            src={poster}
            alt=""
            fill
            sizes="100vw"
            quality={60}
            loading="eager"
            fetchPriority="high"
            className="object-cover object-[50%_40%]"
          />
          <AmbientVideo
            src={videoMp4}
            mobileSrc={videoMp4Mobile}
            deferUntilLoad
            className="absolute inset-0 h-full w-full object-cover object-[50%_40%] transition-opacity duration-700"
          />
        </div>
        {/* Fallback gradient if video fails — surfaces on error */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(242,167,75,0.18),_transparent_55%),_linear-gradient(180deg,_#0a0a0b_0%,_#141416_100%)]" />
      </div>

      {/* Scrim layers — heavier vertical fade + a left-side wash so the headline
          area is consistently calm regardless of what the video is doing. */}
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-b from-ink/60 via-ink/20 to-ink/90" />
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-r from-ink/75 via-ink/25 to-transparent" />
      {/* Subtle vignette to pull the eye toward center text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,11,0.4) 100%)",
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
        <div className="hero-copy-scroll max-w-3xl will-change-transform">
          <div className="hero-rise">
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
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between gap-6 animate-[fade-in_1.2s_ease_0.8s_backwards]">
          <div className="flex flex-1 items-center gap-4 text-ivory/55">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
            <HeroPillars />
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
        </div>

        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2 text-ivory/50"
        >
          <div className="flex flex-col items-center gap-2 animate-[drop-in_0.8s_ease_1.1s_backwards]">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em]">Scroll</span>
            <ArrowDown size={14} className="animate-[bounce_2.8s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
