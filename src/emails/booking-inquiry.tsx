import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Heading,
  Row,
  Column,
} from "@react-email/components"
import type { BookingInput } from "@/types/booking"

interface BookingInquiryEmailProps {
  booking: BookingInput
  submittedAt: string
}

export function BookingInquiryEmail({ booking, submittedAt }: BookingInquiryEmailProps) {
  const rows: { label: string; value: string }[] = [
    { label: "Name", value: booking.name },
    { label: "Email", value: booking.email },
    { label: "Phone", value: booking.phone },
    { label: "Event date", value: booking.eventDate },
    { label: "Event type", value: booking.eventType },
    { label: "Venue", value: booking.venue || "—" },
    { label: "Guest count", value: booking.guestCount },
    { label: "Budget", value: booking.budget },
  ]

  return (
    <Html>
      <Head />
      <Preview>New booking inquiry — {booking.name} · {booking.eventType}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={h1}>New booking inquiry</Heading>
          <Text style={subtext}>
            Submitted {submittedAt} via avproductionz.com
          </Text>
          <Hr style={hr} />

          <Section>
            {rows.map((r) => (
              <Row key={r.label} style={{ marginBottom: 8 }}>
                <Column style={labelCol}>{r.label}</Column>
                <Column style={valueCol}>{r.value}</Column>
              </Row>
            ))}
          </Section>

          {booking.message ? (
            <>
              <Hr style={hr} />
              <Heading as="h2" style={h2}>
                Message
              </Heading>
              <Text style={messageStyle}>{booking.message}</Text>
            </>
          ) : null}

          <Hr style={hr} />
          <Text style={footer}>
            AV Productionz · Austin, TX · 361-945-2522
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default BookingInquiryEmail

const bodyStyle = {
  backgroundColor: "#0a0a0b",
  color: "#f4efe6",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  padding: "40px 0",
}

const containerStyle = {
  maxWidth: "580px",
  margin: "0 auto",
  backgroundColor: "#141416",
  padding: "40px",
  borderRadius: "4px",
  border: "1px solid rgba(231,201,139,0.18)",
}

const h1 = {
  color: "#e7c98b",
  fontSize: "24px",
  margin: "0 0 8px",
  fontWeight: 500,
}

const h2 = {
  color: "#e7c98b",
  fontSize: "14px",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  margin: "16px 0 8px",
}

const subtext = {
  color: "rgba(244,239,230,0.55)",
  fontSize: "12px",
  margin: "0",
}

const hr = {
  borderColor: "rgba(244,239,230,0.12)",
  margin: "24px 0",
}

const labelCol = {
  color: "rgba(244,239,230,0.55)",
  fontSize: "12px",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  width: "35%",
  paddingRight: "12px",
}

const valueCol = {
  color: "#f4efe6",
  fontSize: "15px",
}

const messageStyle = {
  color: "rgba(244,239,230,0.85)",
  fontSize: "14px",
  lineHeight: 1.6,
  whiteSpace: "pre-wrap" as const,
}

const footer = {
  color: "rgba(244,239,230,0.4)",
  fontSize: "11px",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  textAlign: "center" as const,
  margin: "0",
}
