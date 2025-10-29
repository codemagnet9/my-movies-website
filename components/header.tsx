"use client"

import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { usePathname } from "next/navigation"

export function Header() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark")

    try {
      const audio = new Audio("/theme-audio/click1.mp3")
      audio.volume = 0.9
      audio.play().catch((error) => {
        console.log("[v0] Audio playback failed:", error)
      })
    } catch (error) {
      console.log("[v0] Audio creation failed:", error)
    }
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const getLinkClass = (href: string) => {
    const active = isActive(href)
    return `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    }`
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container flex h-16 items-center justify-center">
        <nav className="flex items-center gap-1 rounded-lg border border-border bg-background px-2 py-1.5">
          <Link
            href="/"
            className={getLinkClass("/")}
          >
            Home
          </Link>
          <Link
            href="/#portfolios"
            className={getLinkClass("/#portfolios")}
          >
            Portfolios
          </Link>
          <Link
            href="/#features"
            className={getLinkClass("/#features")}
          >
            Features
          </Link>
          <Link
            href="/#submit"
            className={getLinkClass("/#submit")}
          >
            Submit
          </Link>
          <Link
            href="/guestbook"
            className={getLinkClass("/guestbook")}
          >
            Guestbook
          </Link>

          <div className="mx-1 h-6 w-px bg-border" />

          <button
            onClick={handleThemeChange}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-green-200/50 dark:hover:bg-green-800/50"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </nav>
      </div>
    </header>
  )
}