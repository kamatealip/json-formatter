import React from "react"
import { Terminal, Zap, ListTree } from "lucide-react"

export async function HowItWorks() {
  "use cache"
  return (
    <section className="relative overflow-hidden py-32 bg-background">
      <div className="container mx-auto px-8 md:px-12">
        <div className="mb-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-primary uppercase shadow-sm">
            <span>JSON Tool Workflow</span>
          </div>
          <h2 className="mb-6 text-4xl font-black tracking-tighter md:text-6xl">
            Format raw data into <br />{" "}
            <span className="text-primary">perfectly valid JSON.</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="absolute top-1/2 left-0 z-0 hidden h-px w-full -translate-y-1/2 bg-border md:block opacity-50" />

          <StepItem
            number="01"
            title="Input & Load"
            description="Paste raw JSON, enter a URL, or drop a file directly into the high-performance online editor."
            icon={<Terminal className="h-8 w-8" />}
          />
          <StepItem
            number="02"
            title="Validate & Repair"
            description="Our private worker analyzes, validates, and beautifies your JSON with instant repair capabilities."
            icon={<Zap className="h-8 w-8" />}
          />
          <StepItem
            number="03"
            title="Explore & Export"
            description="Navigate the recursive tree view, find paths, and minify or export your data instantly."
            icon={<ListTree className="h-8 w-8" />}
          />
        </div>
      </div>
    </section>
  )
}

function StepItem({
  number,
  title,
  description,
  icon,
}: {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="group relative z-10 flex flex-col items-center text-center">
      <div className="relative mb-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border/50 bg-secondary text-primary shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-primary/10">
          {icon}
        </div>
        <div className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-black text-primary-foreground shadow-md ring-4 ring-background">
          {number}
        </div>
      </div>
      <h3 className="mb-4 text-2xl font-black tracking-tight">{title}</h3>
      <p className="max-w-[280px] leading-relaxed font-medium text-muted-foreground transition-colors group-hover:text-foreground/80">
        {description}
      </p>
    </div>
  )
}
