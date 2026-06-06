import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileJson } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "About JSONlix - The Privacy-First JSON Tool",
  description: "Learn about JSONlix, our mission for privacy-first developer tools, and the technology behind our offline JSON formatter and beautifier.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
...

      <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-border bg-background/50 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="rounded-full border border-border p-2 transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl border border-primary/20 bg-primary/20 p-2">
              <FileJson className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-black tracking-tighter">
              JSONlix
            </span>
          </div>
        </div>
        <ThemeToggle />
      </nav>

      <main className="flex-1 px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-4xl font-black tracking-tighter text-transparent md:text-6xl">
            About JSONlix
          </h1>

          <div className="prose prose-invert max-w-none space-y-8 text-lg leading-relaxed text-muted-foreground">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                The Mission
              </h2>
              <p>
                JSONlix was born out of a simple necessity: the need for a
                professional-grade JSON formatter that doesn&apos;t compromise
                on privacy or performance. We believe that developers
                shouldn&apos;t have to choose between convenience and security
                when working with sensitive data.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Privacy-First Engineering
              </h2>
              <p>
                Unlike many online tools that send your data to a server for
                processing, JSONlix operates entirely within your browser. We
                use modern Web Workers to handle heavy formatting and repair
                tasks, ensuring your UI remains responsive while your data stays
                exactly where it belongs—on your machine.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                The Technology
              </h2>
              <p>
                Built with Next.js and powered by the Monaco Editor engine (the
                same core that powers VS Code), JSONlix provides a native-level
                experience on the web. Our smart repair system is designed to
                handle the &quot;messy&quot; JSON often produced during
                development, automatically fixing common syntax errors in
                milliseconds.
              </p>
            </section>

            <section className="space-y-4 border-t border-border pt-12 text-center">
              <p>Find us on social media for updates and contributions.</p>
            </section>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-6 text-[10px] font-black tracking-[0.2em] text-muted-foreground/30 uppercase md:flex-row">
          <p>© 2026 JSONlix Research. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="transition-colors hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-primary"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
