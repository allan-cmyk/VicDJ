import "server-only"
import { Resend } from "resend"

const apiKey = process.env.RESEND_API_KEY

// Lazily construct so missing key in dev doesn't crash the whole app;
// the booking route surfaces the error when actually called.
export const resend = apiKey ? new Resend(apiKey) : null

export const resendConfig = {
  from: process.env.RESEND_FROM || "AV Productionz <onboarding@resend.dev>",
  to: process.env.BOOKING_TO_EMAIL || "info.avproz@gmail.com",
}
