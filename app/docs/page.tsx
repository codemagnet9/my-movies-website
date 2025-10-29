import { Slide } from "@/components/slide"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Book, Code, Zap, Shield } from "lucide-react"

export default function DocsPage() {
  const sections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn how to submit your portfolio and get featured on PortfolioHub.",
      links: [
        { label: "Submission Guidelines", href: "#submission" },
        { label: "Portfolio Requirements", href: "#requirements" },
        { label: "Best Practices", href: "#best-practices" },
      ],
    },
    {
      icon: Code,
      title: "API Documentation",
      description: "Integrate PortfolioHub data into your own applications.",
      links: [
        { label: "API Overview", href: "/api" },
        { label: "Authentication", href: "#auth" },
        { label: "Endpoints", href: "#endpoints" },
      ],
    },
    {
      icon: Zap,
      title: "Features",
      description: "Explore all the features available on PortfolioHub.",
      links: [
        { label: "GitHub Integration", href: "#github" },
        { label: "Real-time Stats", href: "#stats" },
        { label: "Search & Filter", href: "#search" },
      ],
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Learn how we protect your data and maintain platform security.",
      links: [
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Terms of Service", href: "#terms" },
        { label: "Data Protection", href: "#data" },
      ],
    },
  ]

  return (
    <main className="container max-w-6xl py-16">
      <Slide delay={0.1}>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Documentation</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Everything you need to know about using PortfolioHub effectively.
        </p>
      </Slide>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section, index) => (
          <Slide key={section.title} delay={0.2 + index * 0.1}>
            <Card className="p-6">
              <section.icon className="mb-4 h-10 w-10 text-primary" />
              <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
              <p className="mb-4 text-sm text-muted-foreground">{section.description}</p>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-primary transition-colors hover:underline">
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          </Slide>
        ))}
      </div>
    </main>
  )
}
