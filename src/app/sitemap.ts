import type { MetadataRoute } from "next"
import { galleryImages } from "@/data/gallery"
import { siteConfig } from "@/lib/site-config"

/** Add an entry here for every new page. Hash links like #services are not URLs. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      images: galleryImages.map((image) => `${siteConfig.url}${image.src}`),
    },
  ]
}
