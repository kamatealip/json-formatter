"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileJson, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-border bg-background/50 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="rounded-xl border border-primary/20 bg-primary/20 p-2">
            <FileJson className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-black tracking-tighter">JSONdeck</span>
        </Link>

        <div className="flex items-center gap-6">
          <ThemeToggle />
        </div>
      </nav>

      <main className="flex flex-1 items-center justify-center p-6">
        <div className="relative max-w-2xl text-center">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:40px_40px]" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-destructive uppercase"
          >
            <span>Error 404: Node Not Found</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-8xl"
          >
            Lost in the Structure.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12 text-lg font-medium text-muted-foreground md:text-xl"
          >
            The requested resource could not be located within the current data tree. 
            It may have been moved, deleted, or never existed in this branch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-14 rounded-full bg-primary px-8 text-lg font-black text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-border bg-muted/50 px-8 text-lg font-black hover:bg-muted"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-border bg-background/50 px-6 py-8 backdrop-blur-xl">
        <p className="text-center text-[10px] font-black tracking-[0.2em] text-muted-foreground/30 uppercase">
          &copy; 2026 JSONdeck Research. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  )
}
