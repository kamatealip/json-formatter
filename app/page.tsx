import { Metadata } from "next"
import { JsonFormatter } from "@/components/json-formatter"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileJson } from "lucide-react"

export const metadata: Metadata = {
  title: "KodaJSON | The Ultimate Online JSON Formatter & Viewer",
  description:
    "Experience the ultimate online JSON formatter, validator, and viewer. Fast, secure, and privacy-focused local processing for professional developers.",
  keywords: [
    "online json formatter",
    "json viewer",
    "json validator",
    "json beautifier",
    "KodaJSON",
    "ultimate json experience",
  ],
}

export default function Page() {
  return (
    <div className="flex h-screen max-h-screen flex-col bg-background">
      {/* App Header */}
      <header className="flex shrink-0 items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="rounded-lg bg-primary/10 p-2">
            <FileJson className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">KodaJSON</h1>
            <p className="text-xs font-medium tracking-wider text-muted-foreground">
              The Ultimate Online{" "}
              <span className="font-bold text-primary">JSON</span> Formatter
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-4 pt-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-4">
          <div className="min-h-0 flex-1">
            <JsonFormatter />
          </div>

          <div className="flex shrink-0 items-center justify-between px-1 text-[10px] text-muted-foreground/60">
            <p>© 2026 KodaJSON • Private & Secure Local Processing</p>
            <div className="flex gap-4">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Github
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
