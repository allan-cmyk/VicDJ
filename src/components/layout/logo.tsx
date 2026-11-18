import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  /** "djtr3y" is Vic's neon DJ TR3Y wordmark (header); "full" is the AV Productionz lockup (footer). */
  variant?: "full" | "mark" | "djtr3y"
}

export function Logo({ className, variant = "full" }: LogoProps) {
  if (variant === "djtr3y") {
    return (
      <Image
        src="/media/logo-djtr3y.png"
        alt="DJ TR3Y"
        width={594}
        height={120}
        priority
        className={cn("h-7 w-auto md:h-8", className)}
      />
    )
  }
  if (variant === "mark") {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center h-9 w-9 rounded-full border border-champagne/60 text-champagne font-display text-[13px] tracking-[0.14em]",
          className
        )}
      >
        AV
      </span>
    )
  }
  return (
    <span className={cn("inline-flex items-baseline gap-2.5", className)}>
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-champagne/60 text-champagne font-display text-[12px] tracking-[0.14em]"
      >
        AV
      </span>
      <span className="font-display text-base tracking-[0.3em] text-ivory uppercase">
        Productionz
      </span>
    </span>
  )
}
