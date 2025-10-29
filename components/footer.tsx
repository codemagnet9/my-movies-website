import Link from "next/link"
import { Mail, Linkedin, Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLastVisitor } from "@/lib/log-visit"
import { getOrdinalSuffix } from "@/lib/utils"

export async function Footer() {
  const lastVisitor = await getLastVisitor()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-[1fr_auto_auto_auto_1fr]">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">PortfolioHub</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Discover and showcase amazing developer portfolios from around the world.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:hello@portfoliohub.com"
                className="text-foreground transition-colors hover:text-[#EA4335]"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-colors hover:text-[#0A66C2]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-colors hover:text-[#6e5494]"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground transition-colors hover:text-[#1DA1F2]"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground">General</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-foreground transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/#portfolios" className="text-sm text-foreground transition-colors hover:text-primary">
                Portfolios
              </Link>
              <Link href="/#features" className="text-sm text-foreground transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="/#featured" className="text-sm text-foreground transition-colors hover:text-primary">
                Featured
              </Link>
              <Link href="/guestbook" className="text-sm text-foreground transition-colors hover:text-primary">
                Guestbook
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground">The Website</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-foreground transition-colors hover:text-primary">
                About
              </Link>
              <Link href="/statistics" className="text-sm text-foreground transition-colors hover:text-primary">
                Statistics
              </Link>
              <Link href="/blog" className="text-sm text-foreground transition-colors hover:text-primary">
                Blog
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground">Resources</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/docs" className="text-sm text-foreground transition-colors hover:text-primary">
                Documentation
              </Link>
              <Link href="/api-docs" className="text-sm text-foreground transition-colors hover:text-primary">
                API
              </Link>
              <Link href="/support" className="text-sm text-foreground transition-colors hover:text-primary">
                Support
              </Link>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Subscribe to PortfolioHub newsletter</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Don't miss out. Get an email whenever we post, no spam.
            </p>
            <Button asChild className="w-full">
              <Link href="/guestbook">
                Subscribe Now
                <span className="ml-2">→</span>
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              Last visitor from {lastVisitor?.city}, {lastVisitor?.country_region}, {lastVisitor?.country} (
              {lastVisitor?.total_visits} {getOrdinalSuffix(lastVisitor?.total_visits || 0)} view)
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Copyright © {new Date().getFullYear()} PortfolioHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
