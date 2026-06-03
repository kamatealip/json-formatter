"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileJson, RefreshCw, Home, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-border bg-background/50 px-6 py-4 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="rounded-xl border border-primary/20 bg-primary/20 p-2">
            <FileJson className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-black tracking-tighter">KodaJSON</span>
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
            <AlertTriangle className="h-3 w-3" />
            <span>Critical Kernel Exception</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-8xl"
          >
            System Failure.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-lg font-medium text-muted-foreground md:text-xl"
          >
            An unexpected error occurred during the execution of the application kernel. 
            The current operation could not be completed.
          </motion.p>

          {error.digest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-12 inline-block rounded-lg border border-border bg-muted/30 px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              Digest ID: {error.digest}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              onClick={() => unstable_retry()}
              size="lg"
              className="h-14 rounded-full bg-primary px-8 text-lg font-black text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Attempt Recovery
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-border bg-muted/50 px-8 text-lg font-black hover:bg-muted"
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Emergency Exit
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-border bg-background/50 px-6 py-8 backdrop-blur-xl">
        <p className="text-center text-[10px] font-black tracking-[0.2em] text-muted-foreground/30 uppercase">
          &copy; 2026 KodaJSON Research. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  )
}
