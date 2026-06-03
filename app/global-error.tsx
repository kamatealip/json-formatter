"use client"

import React from "react"
import { motion } from "framer-motion"
import { RefreshCw, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-sans bg-background text-foreground">
        <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] bg-[size:40px_40px]" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-destructive uppercase"
          >
            <AlertTriangle className="h-3 w-3" />
            <span>Root Kernel Panic</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-8xl"
          >
            Fatal Error.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-lg font-medium text-muted-foreground md:text-xl max-w-2xl"
          >
            A critical failure occurred at the root level of the application. 
            The base environment has been compromised.
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
          >
            <Button
              onClick={() => unstable_retry()}
              size="lg"
              className="h-16 rounded-full bg-primary px-12 text-xl font-black text-primary-foreground transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)]"
            >
              <RefreshCw className="mr-3 h-6 w-6" />
              Reboot Application
            </Button>
          </motion.div>
          
          <p className="mt-12 text-[10px] font-black tracking-[0.5em] text-muted-foreground/30 uppercase">
            &copy; 2026 KodaJSON Research. ALL RIGHTS RESERVED.
          </p>
        </div>
      </body>
    </html>
  )
}
