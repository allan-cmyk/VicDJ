import { NextResponse } from "next/server"
import { bookingSchema } from "@/types/booking"
import { resend, resendConfig } from "@/lib/resend"
import { BookingInquiryEmail } from "@/emails/booking-inquiry"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = bookingSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        issues: parsed.error.flatten(),
      },
      { status: 400 }
    )
  }

  const booking = parsed.data

  // Honeypot — silently succeed to avoid tipping off bots
  if (booking.website && booking.website.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  if (!resend) {
    if (process.env.NODE_ENV === "production") {
      // Never fake success in production — a silently dropped lead is the worst outcome.
      console.error("[booking] RESEND_API_KEY missing in production — inquiry NOT delivered:", booking)
      return NextResponse.json(
        { message: "Our inquiry inbox is briefly offline — call or text 361-945-2522, or DM @djtr3y on Instagram." },
        { status: 503 }
      )
    }
    console.error("[booking] RESEND_API_KEY missing — inquiry logged but not emailed:", booking)
    // In dev without a key, we still succeed so form UX is testable.
    return NextResponse.json({ ok: true, dev: true }, { status: 200 })
  }

  try {
    const { error } = await resend.emails.send({
      from: resendConfig.from,
      to: [resendConfig.to],
      replyTo: booking.email,
      subject: `Booking inquiry — ${booking.name} · ${booking.eventType} · ${booking.eventDate}`,
      react: BookingInquiryEmail({
        booking,
        submittedAt: new Date().toLocaleString("en-US", {
          timeZone: "America/Chicago",
          dateStyle: "full",
          timeStyle: "short",
        }),
      }),
    })

    if (error) {
      console.error("[booking] Resend error:", error)
      return NextResponse.json(
        { message: "Email delivery failed — please call us at 361-945-2522." },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error("[booking] unexpected error:", err)
    return NextResponse.json(
      { message: "Something went wrong — please try again." },
      { status: 500 }
    )
  }
}
