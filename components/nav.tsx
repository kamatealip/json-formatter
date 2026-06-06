import React from "react"
import { FileJson } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 flex shrink-0 items-center justify-between border-b border-border bg-background/50 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-2.5">
        <div className="rounded-xl border border-primary/20 bg-primary/20 p-2">
          <FileJson className="h-6 w-6 text-primary" />
        </div>
        <span className="text-xl font-black tracking-tighter">JSONlix</span>
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />
      </div>
    </nav>
  )
}
