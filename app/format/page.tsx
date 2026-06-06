import { Metadata } from "next"
import Link from "next/link"
import { JsonFormatter } from "@/components/json-formatter"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileJson, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Online JSON Formatter, Beautifier & Tree Viewer",
  description:
    "Experience the best online JSON formatter, beautifier, and tree viewer. Fast, secure, and privacy-focused local processing with smart JSON repair.",
  keywords: [
    "online json formatter",
    "json beautifier",
    "json viewer",
    "json validator",
    "json tree view",
    "minify json",
    "JSONlix",
    "beautify json online",
    "offline json formatter"
  ],
}

export default function Page() {
  return (
    <div className="flex h-screen max-h-screen flex-col bg-background">
      {/* App Header */}
      <header className="flex shrink-0 items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2.5">
          <Link href="/" className="mr-2 hover:bg-muted p-2 rounded-full transition-colors text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="rounded-lg bg-primary/10 p-2">
            <FileJson className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none mb-1">JSONlix</h1>
            <p className="text-xs font-medium tracking-wider text-muted-foreground hidden sm:block">
              The Ultimate Online <span className="font-bold text-primary">JSON</span> Formatter
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
            <p>© 2026 JSONlix • Private & Secure Local Processing</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
