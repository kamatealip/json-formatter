import Link from "next/link"
import { ArrowLeft, FileJson, Mail, MessageSquare } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navigation */}
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
            Get in Touch
          </h1>

          <div className="space-y-12">
            <section className="space-y-6">
              <p className="text-xl leading-relaxed text-muted-foreground">
                Have a question, feedback, or a feature request? We&apos;d love
                to hear from you. JSONlix is built for the community, and your
                input helps us make it better.
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ContactCard
                  icon={<Mail className="h-6 w-6 text-primary" />}
                  title="Email"
                  description="General inquiries and support"
                  link="mailto:hello@jsonlix.com"
                  linkText="hello@jsonlix.com"
                />

                <ContactCard
                  icon={<MessageSquare className="h-6 w-6 text-primary" />}
                  title="Discord"
                  description="Join our developer community"
                  link="https://discord.gg/jsonlix"
                  linkText="Join Discord"
                />
              </div>
            </section>

            <section className="space-y-6 border-t border-border pt-12">
              <h2 className="text-2xl font-bold text-foreground">
                Technical Support
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                If you are experiencing a technical issue with the formatter,
                please include your browser version and, if possible, the JSON
                snippet (with any sensitive data removed) that is causing the
                problem.
              </p>
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
              href="/about"
              className="transition-colors hover:text-primary"
            >
              About
            </Link>
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
          </div>
        </div>
      </footer>
    </div>
  )
}

function ContactCard({
  icon,
  title,
  description,
  link,
  linkText,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  linkText: string
}) {
  return (
    <div className="group rounded-3xl border border-border bg-muted/5 p-8 transition-all hover:bg-muted/10">
      <div className="mb-6 w-fit rounded-2xl border border-border bg-muted/20 p-4 transition-all group-hover:bg-primary group-hover:text-black">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
      <p className="mb-6 text-muted-foreground">{description}</p>
      <Link
        href={link}
        className="font-bold text-primary underline-offset-4 hover:underline"
      >
        {linkText}
      </Link>
    </div>
  )
}
