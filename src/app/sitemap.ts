import type { MetadataRoute } from "next"
import { posts } from "@/data/blog"
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
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.published),
      images: [`${siteConfig.url}${post.cover.src}`],
    })),
  ]
}
