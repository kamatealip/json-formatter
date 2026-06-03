import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
}

export default nextConfig
