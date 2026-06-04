import Link from "next/link"
import { ArrowLeft, FileJson, ShieldCheck } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function PrivacyPage() {
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
            <ShieldCheck className="h-10 w-10 text-primary" />
            <h1 className="bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-4xl font-black tracking-tighter text-transparent md:text-6xl">
              Privacy Policy
            </h1>
          </div>

          <div className="prose prose-invert max-w-none text-muted-foreground space-y-8 text-lg leading-relaxed">
            <p className="text-xl text-foreground font-medium">
              Your privacy is not a feature; it is our foundation. JSONlix is designed to ensure your data never leaves your machine.
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">1. Data Processing</h2>
              <p>
                JSONlix is a client-side application. When you paste, upload, or drag-and-drop JSON data into our tool, all formatting, validation, and repair operations are performed locally in your browser&apos;s memory using JavaScript and Web Workers. 
              </p>
              <p className="font-bold text-primary">We do not transmit your JSON data to any server.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">2. Local Storage</h2>
              <p>
                To provide a seamless experience, we may store your current session data in your browser&apos;s LocalStorage. This allows you to resume your work if you refresh the page or close your browser. This data remains on your device and is never synchronized with our servers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">3. Analytics</h2>
              <p>
                We may use privacy-preserving analytics tools to understand how our application is being used. These tools collect anonymous metadata such as page views and feature usage. They do <span className="underline decoration-primary">not</span> have access to the data you process within the application.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">4. Third-Party Services</h2>
              <p>
                Our application may include links to external websites (e.g., GitHub, Twitter). We are not responsible for the privacy practices or content of these third-party sites.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">5. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="space-y-4 pt-12 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <Link href="mailto:privacy@jsonlix.com" className="text-primary hover:underline">privacy@jsonlix.com</Link>.
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
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
