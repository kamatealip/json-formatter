import React, { Suspense } from "react"
import { Metadata } from "next"
import { Nav } from "@/components/nav"
import { JsonFormatter } from "@/components/json-formatter-dynamic"
import { Features } from "@/components/features"
import { Marquee } from "@/components/marquee"
import { HowItWorks } from "@/components/how-it-works"
import { FAQSection } from "@/components/faq-section"
import { SeoContent } from "@/components/seo-content"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "JSON Formatter - Best Online JSON Viewer & Repair Tool",
  description: "Free online JSON formatter and viewer. Best tool to format, beautify, repair, and navigate complex JSON data structures with recursive tree view and smart syntax repair.",
}

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground selection:bg-primary/30">
      <Nav />
      <main className="flex-1">
        {/* Formatter Section - Takes initial view */}
        <section className="h-[calc(100vh-73px)] min-h-[600px] border-b border-border bg-background px-4 py-2 sm:px-6 sm:py-4">
          <JsonFormatter />
        </section>

        <div className="relative">
          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/5" />}>
            <Features />
          </Suspense>
          
          <Marquee />

          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/5" />}>
            <HowItWorks />
          </Suspense>

          <FAQSection />

          <Suspense fallback={<div className="h-96 animate-pulse bg-muted/5" />}>
            <SeoContent />
          </Suspense>

          <Suspense fallback={<div className="h-64 animate-pulse bg-muted/5" />}>
            <Footer />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
