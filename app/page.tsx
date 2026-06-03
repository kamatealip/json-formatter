import HomePageClient from "./home-page-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "JSON Formatter - Best Online JSON Viewer & Repair Tool",
  description: "Free online JSON formatter and viewer. Best tool to format, beautify, repair, and navigate complex JSON data structures with recursive tree view and smart syntax repair.",
}

export default function Page() {
  return <HomePageClient />
}
