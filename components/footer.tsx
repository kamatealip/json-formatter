import React from "react"
import Link from "next/link"
import { FileJson, ShieldCheck } from "lucide-react"

export async function Footer() {
  "use cache"
  return (
    <footer className="relative z-10 border-t border-border bg-muted/20 py-20">
      <div className="container mx-auto px-6">
        <div className="mb-20 grid grid-cols-1 items-start gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-2.5">
              <FileJson className="h-8 w-8 text-primary" />
              <span className="text-2xl font-black tracking-tighter">
                JSONlix
              </span>
            </div>
            <p className="max-w-sm text-lg leading-relaxed font-medium text-muted-foreground">
              The privacy-first kernel for JSON exploration and structural
              recovery. Built for the modern web.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black tracking-[0.3em] text-muted-foreground/30 uppercase">
              Application
            </h4>
            <ul className="space-y-4 font-bold text-muted-foreground">
              <li>
                <Link
                  href="/format"
                  className="transition-colors hover:text-primary"
                >
                  JSON Tool
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black tracking-[0.3em] text-muted-foreground/30 uppercase">
              Legal
            </h4>
            <ul className="space-y-4 font-bold text-muted-foreground">
              <li>
                <Link
                  href="/privacy"
                  className="transition-colors hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="transition-colors hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-8 border-t border-border pt-12 md:flex-row">
          <p className="text-[10px] font-black tracking-[0.2em] text-muted-foreground/30 uppercase">
            &copy; 2026 JSONlix Research. ALL RIGHTS RESERVED.
          </p>
          <div className="group flex cursor-default items-center gap-3 text-muted-foreground/10">
            <ShieldCheck className="h-4 w-4 transition-colors group-hover:text-primary" />
            <span className="text-[10px] font-black tracking-widest uppercase">
              Encrypted Local Stack
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
