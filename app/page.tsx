import { JsonFormatter } from "@/components/json-formatter"
import { ThemeToggle } from "@/components/theme-toggle"
import { FileJson } from "lucide-react"

export default function Page() {
  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      {/* App Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 p-2 rounded-lg">
            <FileJson className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">JSON Formatter</h1>
            <p className="text-xs text-muted-foreground font-medium">Professional Formatting & Validation</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 pt-4">
        <div className="h-full w-full max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex-1 min-h-0">
            <JsonFormatter />
          </div>
          
          <div className="shrink-0 flex items-center justify-between text-xs text-muted-foreground px-1">
            <p>© 2026 JSON Formatter Pro • Private & Secure (Local processing)</p>
            <div className="flex gap-4">
              <span>Next.js 16</span>
              <span>React 19</span>
              <span>Tailwind 4</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
