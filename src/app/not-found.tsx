import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-[100svh] bg-ink text-ivory flex items-center justify-center px-6">
      <div className="max-w-md text-center space-y-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-champagne">
          404 · Not found
        </p>
        <h1 className="font-display text-5xl leading-[1.05] tracking-[-0.015em]">
          This set isn&rsquo;t on the list.
        </h1>
        <p className="text-ivory/60 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist. Head back home and let&rsquo;s find your night.
        </p>
        <Button asChild variant="primary" size="md">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  )
}
