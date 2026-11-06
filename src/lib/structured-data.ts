import { services } from "@/data/services"
import { siteConfig } from "@/lib/site-config"

const { url, name, description, contact, location, areaServed, founder, socials, since } = siteConfig

const businessId = `${url}/#business`
const founderId = `${url}/#founder`

/**
 * Schema.org data for search engines. Every value comes from content already on the
 * site. Do not add a street address, price range, or rating here unless it is real
 * and also published: Google treats mismatched structured data as spam.
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${url}/#website`,
      url,
      name,
      inLanguage: siteConfig.locale,
      publisher: { "@id": businessId },
    },
    {
      "@type": "EntertainmentBusiness",
      "@id": businessId,
      name,
      alternateName: [founder.stageName, socials.facebook.handle],
      url,
      description,
      image: `${url}/og.jpg`,
      telephone: contact.phoneE164,
      email: contact.email,
      foundingDate: String(since),
      founder: { "@id": founderId },
      address: {
        "@type": "PostalAddress",
        addressLocality: location.city,
        addressRegion: location.region,
        addressCountry: location.country,
      },
      areaServed,
      sameAs: [socials.instagram.url, socials.facebook.url],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "DJ and event production services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.seoName,
            description: service.blurb,
            provider: { "@id": businessId },
            areaServed,
          },
        })),
      },
    },
    {
      "@type": "Person",
      "@id": founderId,
      name: founder.name,
      alternateName: founder.stageName,
      jobTitle: "DJ",
      worksFor: { "@id": businessId },
      sameAs: [socials.instagram.url],
    },
  ],
}
