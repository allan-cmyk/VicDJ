"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { EASING, DURATION, TRANSFORM } from "@/lib/motion-config"

interface RevealProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
  amount?: number
  as?: "div" | "section" | "article" | "header" | "footer"
}

const offsets = {
  up: { y: TRANSFORM.reveal.y, x: 0 },
  down: { y: -TRANSFORM.reveal.y, x: 0 },
  left: { x: TRANSFORM.reveal.y, y: 0 },
  right: { x: -TRANSFORM.reveal.y, y: 0 },
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = DURATION.reveal,
  className = "",
  once = true,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  const reduced = useReducedMotion()

  if (reduced) {
    const Tag = as as "div"
    return <Tag className={className}>{children}</Tag>
  }

  const offset = offsets[direction]
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration, delay, ease: EASING.reveal }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
