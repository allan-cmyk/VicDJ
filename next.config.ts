import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Trimmed from the defaults. Fewer widths means a shorter srcset on every
    // <img> (less HTML) and fewer variants to optimize and cache.
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [128, 256, 384, 512],
    qualities: [50, 60, 75],
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "instagram.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        // Files in public/media are not content-hashed, so this stays well short
        // of "immutable". Give a replaced file a new name to bust the cache at once.
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ]
  },
}

export default nextConfig
