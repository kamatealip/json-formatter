import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jsonlix.com"
  const lastModified = new Date()

  const routes = [
    "",
    "/format",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/format" ? "daily" : "monthly",
    priority: route === "" ? 1 : route === "/format" ? 0.9 : 0.7,
  }))
}
