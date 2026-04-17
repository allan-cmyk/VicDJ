"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-[100svh] bg-ink text-ivory flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--error)]">
          Something broke
        </p>
        <h1 className="font-display text-5xl leading-[1.05] tracking-[-0.015em]">
          The booth glitched.
        </h1>
        <p className="text-ivory/60 leading-relaxed">
          An unexpected error hit the decks. Try again, or reach us at{" "}
          <a href="tel:+13619452522" className="text-champagne hover:underline">
            361-945-2522
          </a>
          .
        </p>
        <Button type="button" variant="primary" size="md" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </main>
  )
}
