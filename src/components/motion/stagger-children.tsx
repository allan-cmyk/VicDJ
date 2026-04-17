"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { EASING, DURATION, TRANSFORM } from "@/lib/motion-config"

interface StaggerChildrenProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
  amount?: number
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = DURATION.stagger,
  once = true,
  amount = 0.2,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: TRANSFORM.reveal.y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASING.reveal },
  },
}
