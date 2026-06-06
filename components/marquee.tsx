"use client"
import React from "react"
import { motion } from "framer-motion"
import { Search, History, Download, FileUp, ArrowRight } from "lucide-react"

const marqueeFeatures = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "JSON Path Search",
    description:
      "Recursively search through thousands of lines of data. Instantly find JSON keys or values across any depth.",
  },
  {
    icon: <History className="h-6 w-6" />,
    title: "Auto-Save History",
    description:
      "Automatically backups your formatted JSON to LocalStorage. Pick up exactly where you left off, even after a refresh.",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "JSON Minifier & Export",
    description:
      "Export your data as beautified JSON, minified production code, or even Python-compatible dictionaries.",
  },
  {
    icon: <FileUp className="h-6 w-6" />,
    title: "JSON File Loader",
    description:
      "Drop any .json file directly into the interface to load, validate, and format it instantly with zero latency.",
  },
]

export function Marquee() {
  return (
    <div className="pause-marquee mt-20 flex overflow-hidden">
      <div className="animate-marquee flex gap-8 px-4 whitespace-nowrap">
        {marqueeFeatures.map((feature, index) => (
          <FeatureCard
            key={`f1-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
      <div
        className="animate-marquee flex gap-8 px-4 whitespace-nowrap"
        aria-hidden="true"
      >
        {marqueeFeatures.map((feature, index) => (
          <FeatureCard
            key={`f2-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative flex h-[380px] w-[320px] flex-none flex-col overflow-hidden rounded-[2.5rem] border border-border bg-muted/5 p-10 transition-all duration-500 hover:border-primary/50 hover:bg-muted/10 md:w-[400px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative z-10 mb-10 w-fit rounded-2xl border border-border bg-muted/20 p-5 transition-all duration-500 group-hover:rotate-6 group-hover:border-primary group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_0_30px_-5px_var(--primary)]">
        {icon}
      </div>
      <h3 className="relative z-10 mb-6 text-2xl font-black tracking-tight transition-transform duration-300 group-hover:translate-x-2">
        {title}
      </h3>
      <p className="relative z-10 text-base leading-relaxed font-medium text-muted-foreground transition-colors group-hover:text-foreground">
        {description}
      </p>
      <div className="mt-auto flex translate-y-4 items-center gap-2 pt-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="text-[10px] font-black tracking-widest text-primary uppercase">
          Explore Primitive
        </span>
        <ArrowRight className="h-3 w-3 text-primary" />
      </div>
    </motion.div>
  )
}
