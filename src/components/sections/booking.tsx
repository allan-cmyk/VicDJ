import { Section } from "@/components/ui/section"
import { EyebrowLabel } from "@/components/ui/eyebrow-label"
import { Reveal } from "@/components/motion/reveal"
import { TextMaskReveal } from "@/components/motion/text-mask-reveal"
import { BookingForm } from "@/components/forms/booking-form"
import { siteConfig } from "@/lib/site-config"
import { Phone, Mail, MapPin } from "lucide-react"

export function Booking() {
  return (
    <Section id="booking" tone="ink-soft">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <EyebrowLabel className="mb-4">Book DJ Trey</EyebrowLabel>
          <TextMaskReveal
            as="h2"
            className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.015em] text-ivory"
          >
            Let&rsquo;s design your night.
          </TextMaskReveal>
          <p className="mt-6 text-ivory/70 leading-relaxed max-w-md">
            Share a few details about your event and we&rsquo;ll get back within 24 hours with
            availability, packages, and a quote. For anything urgent, call or DM.
          </p>

          <dl className="mt-10 space-y-5">
            <ContactRow icon={<Phone size={14} />} label="Call" value={siteConfig.contact.phone} href={siteConfig.contact.phoneHref} />
            <ContactRow icon={<Mail size={14} />} label="Email" value={siteConfig.contact.email} href={siteConfig.contact.emailHref} />
            <ContactRow
              icon={<MapPin size={14} />}
              label="Based"
              value={`${siteConfig.location.city}, ${siteConfig.location.region}`}
            />
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-sm border border-ivory/8 bg-ivory/[0.015] p-6 md:p-10">
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const body = (
    <div className="group flex items-center gap-4">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-champagne/30 text-champagne">
        {icon}
      </span>
      <div>
        <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-ivory/50">
          {label}
        </dt>
        <dd className="font-display text-lg text-ivory group-hover:text-champagne transition-colors">
          {value}
        </dd>
      </div>
    </div>
  )
  return href ? <a href={href}>{body}</a> : body
}
