import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "lucide-react/icons"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
