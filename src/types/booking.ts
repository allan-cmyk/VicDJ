import { z } from "zod"

export const EVENT_TYPES = [
  "Wedding",
  "Corporate",
  "Private / Birthday",
  "Nightlife / Club",
  "Cruise / Yacht",
  "Other",
] as const

export const GUEST_COUNTS = [
  "Under 50",
  "50–150",
  "150–300",
  "300+",
] as const

export const BUDGETS = [
  "Under $2k",
  "$2k–$4k",
  "$4k–$7k",
  "$7k+",
  "Not sure yet",
] as const

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(32),
  eventDate: z
    .string()
    .trim()
    .min(1, "Pick an event date")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD"),
  eventType: z.enum(EVENT_TYPES, {
    message: "Choose the event type",
  }),
  venue: z.string().trim().max(200).optional().or(z.literal("")),
  guestCount: z.enum(GUEST_COUNTS, {
    message: "Approximate guest count",
  }),
  budget: z.enum(BUDGETS, {
    message: "Rough budget helps us scope",
  }),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — real users will never fill this.
  website: z.string().max(0).optional().or(z.literal("")),
})

export type BookingInput = z.infer<typeof bookingSchema>
