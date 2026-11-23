import Link from "next/link"
import { Button } from "@/components/ui/button"

/** A small "Check my date" stop between sections, so visitors don't have to scroll all the way to the form. */
export function BookingNudge({ line }: { line: string }) {
  return (
    <div className="bg-ink">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-5 px-6 py-14 text-center md:flex-row md:justify-center md:gap-8 md:px-10 lg:px-14">
        <p className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] leading-tight text-ivory/85">{line}</p>
        <Button asChild variant="primary" size="md">
          <Link href="#booking">Check my date</Link>
        </Button>
      </div>
    </div>
  )
}
