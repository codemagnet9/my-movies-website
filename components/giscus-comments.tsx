"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/components/theme-provider"

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement("script")
    script.src = "https://giscus.app/client.js"
    script.setAttribute("data-repo", "your-username/your-repo")
    script.setAttribute("data-repo-id", "YOUR_REPO_ID")
    script.setAttribute("data-category", "General")
    script.setAttribute("data-category-id", "YOUR_CATEGORY_ID")
    script.setAttribute("data-mapping", "pathname")
    script.setAttribute("data-strict", "0")
    script.setAttribute("data-reactions-enabled", "1")
    script.setAttribute("data-emit-metadata", "0")
    script.setAttribute("data-input-position", "top")
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light")
    script.setAttribute("data-lang", "en")
    script.setAttribute("data-loading", "lazy")
    script.crossOrigin = "anonymous"
    script.async = true

    ref.current.appendChild(script)
  }, [theme])

  return <div ref={ref} className="giscus" />
}
