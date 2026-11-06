"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"

function FormPlaceholder() {
  return <div aria-hidden className="min-h-[880px] sm:min-h-[640px]" />
}

const BookingForm = dynamic(
  () => import("@/components/forms/booking-form").then((mod) => mod.BookingForm),
  { ssr: false, loading: FormPlaceholder }
)

/**
 * Loads the form code (react-hook-form + zod) only when a visitor gets close to it,
 * which keeps those libraries out of the JavaScript that every page view downloads.
 */
export function LazyBookingForm() {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNear(true)
        observer.disconnect()
      },
      { rootMargin: "1200px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{near ? <BookingForm /> : <FormPlaceholder />}</div>
}
