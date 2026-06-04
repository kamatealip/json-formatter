import Link from "next/link"
import { ArrowLeft, FileJson, Scale } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-border bg-background/50 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="rounded-full border border-border p-2 hover:bg-muted transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl border border-primary/20 bg-primary/20 p-2">
              <FileJson className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-black tracking-tighter">JSONlix</span>
          </div>
        </div>
        <ThemeToggle />
      </nav>

      <main className="flex-1 py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Scale className="h-10 w-10 text-primary" />
            <h1 className="bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-4xl font-black tracking-tighter text-transparent md:text-6xl">
              Terms & Conditions
            </h1>
          </div>

          <div className="prose prose-invert max-w-none text-muted-foreground space-y-8 text-lg leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
              <p>
                By accessing and using JSONlix, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using JSONlix services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Description of Service</h2>
              <p>
                JSONlix provides users with access to a variety of tools for JSON formatting, viewing, and repair. You understand and agree that the Service is provided &quot;AS-IS&quot; and that JSONlix assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. User Conduct</h2>
              <p>
                You understand that all information, data, text, or other materials (&quot;Content&quot;), whether publicly posted or privately transmitted, are the sole responsibility of the person from whom such Content originated. This means that you, and not JSONlix, are entirely responsible for all Content that you upload, post, email, transmit or otherwise make available via the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Modifications to Service</h2>
              <p>
                JSONlix reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that JSONlix shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Termination</h2>
              <p>
                You agree that JSONlix may, under certain circumstances and without prior notice, immediately terminate your access to the Service. Cause for such termination shall include, but not be limited to, breaches or violations of the Terms & Conditions or other incorporated agreements or guidelines.
              </p>
            </section>

            <section className="space-y-4 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <p>
                If you have any questions about these Terms & Conditions, please contact us at <Link href="mailto:legal@jsonlix.com" className="text-primary hover:underline">legal@jsonlix.com</Link>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="mx-auto max-w-3xl flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black tracking-[0.2em] text-muted-foreground/30 uppercase">
          <p>© 2026 JSONlix Research. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
