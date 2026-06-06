import React from "react"
import { Sparkles, Code2, ListTree, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Smart JSON Repair",
    description:
      "Instantly fixes common JSON syntax errors like unquoted keys, trailing commas, and mismatched single/double quotes.",
    className: "lg:col-span-2",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "JSON Beautifier Engine",
    description:
      "Advanced beautification using the Monaco engine. Enjoy native syntax highlighting, bracket matching, and code folding.",
    className: "lg:col-span-1",
  },
  {
    icon: <ListTree className="h-6 w-6" />,
    title: "Recursive JSON Viewer",
    description:
      "Navigate complex, nested objects with a structured hierarchical tree view. Perfect for deep data exploration.",
    className: "lg:col-span-1",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Private Offline Formatter",
    description:
      "Your data never leaves your browser. Our 100% private offline JSON formatter runs in a dedicated background worker.",
    className: "lg:col-span-2",
  },
]

export async function Features() {
  "use cache"
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/5 py-32">
      <div className="container mx-auto mb-20 px-8 md:px-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="mb-6 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-4xl font-black tracking-tighter text-transparent md:text-6xl animate-in fade-in slide-in-from-left-4 duration-1000">
              Professional JSON Beautifier & Formatter.
            </h2>
            <p className="text-xl font-medium text-muted-foreground animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
              Engineered for developers who demand the best online JSON viewer, 
              validator, and repair tool with 100% data privacy.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-full border border-border px-6 py-2 text-xs font-black tracking-[0.4em] text-muted-foreground uppercase">
            <Sparkles className="h-3 w-3 animate-pulse text-primary" />
            <span>Validator Engine</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-3xl border border-border bg-muted/5 p-8 transition-all hover:border-primary/50 hover:bg-muted/10",
                feature.className
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 mb-6 inline-flex rounded-2xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-black">
                {feature.icon}
              </div>
              <h3 className="relative z-10 mb-3 text-2xl font-black tracking-tight">
                {feature.title}
              </h3>
              <p className="relative z-10 text-base font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
