import type { CSSProperties } from "react"
import { InView } from "@/components/motion/in-view"

interface RevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  /** Seconds to wait after the element enters the viewport. */
  delay?: number
  className?: string
  amount?: number
  as?: "div" | "section" | "article" | "header" | "footer"
}

/** Fades and slides its children in once. Styles: `[data-reveal]` in globals.css. */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  return (
    <InView
      as={as}
      amount={amount}
      data-reveal={direction}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {children}
    </InView>
  )
}
