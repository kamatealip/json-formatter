"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false)

  useEffect(() => {
    const result = window.matchMedia(query)
    setValue(result.matches)

    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    result.addEventListener("change", onChange)
    return () => result.removeEventListener("change", onChange)
  }, [query])

  return value
}
