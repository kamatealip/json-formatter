"use client"
import dynamic from "next/dynamic"

export const JsonFormatter = dynamic(() => import("@/components/json-formatter").then(mod => mod.JsonFormatter), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border bg-background shadow-sm animate-pulse">
      <div className="h-12 border-b bg-muted/30" />
      <div className="flex-1 bg-muted/10" />
    </div>
  )
})
