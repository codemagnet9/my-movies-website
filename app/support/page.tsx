import { Slide } from "@/components/slide"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, MessageCircle, Book, Github } from "lucide-react"

export default function SupportPage() {
  return (
    <main className="container max-w-5xl py-16">
      <Slide delay={0.1}>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Support</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Need help? We're here to assist you with any questions or issues.
        </p>
      </Slide>

      <div className="grid gap-6 md:grid-cols-2">
        <Slide delay={0.2}>
          <Card className="p-6">
            <Mail className="mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Email Support</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <Button asChild>
              <a href="mailto:support@portfoliohub.com">Contact Support</a>
            </Button>
          </Card>
        </Slide>

        <Slide delay={0.3}>
          <Card className="p-6">
            <MessageCircle className="mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Community</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Join our community to connect with other developers and get help.
            </p>
            <Button asChild variant="outline">
              <Link href="/guestbook">Visit Guestbook</Link>
            </Button>
          </Card>
        </Slide>

        <Slide delay={0.4}>
          <Card className="p-6">
            <Book className="mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Documentation</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Browse our comprehensive documentation for answers to common questions.
            </p>
            <Button asChild variant="outline">
              <Link href="/docs">View Docs</Link>
            </Button>
          </Card>
        </Slide>

        <Slide delay={0.5}>
          <Card className="p-6">
            <Github className="mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">GitHub Issues</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Report bugs or request features on our GitHub repository.
            </p>
            <Button asChild variant="outline">
              <a href="https://github.com/portfoliohub" target="_blank" rel="noopener noreferrer">
                Open Issue
              </a>
            </Button>
          </Card>
        </Slide>
      </div>

      <Slide delay={0.6}>
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="mb-2 font-semibold">How do I submit my portfolio?</h3>
              <p className="text-sm text-muted-foreground">
                Navigate to the Submit section on the homepage and fill out the submission form with your details. We'll
                review your submission and add it to the platform if it meets our guidelines.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-2 font-semibold">Can I update my portfolio after submission?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Contact us at support@portfoliohub.com with your portfolio ID and the changes you'd like to make.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-2 font-semibold">Is PortfolioHub free to use?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, PortfolioHub is completely free for developers to showcase their work and browse other portfolios.
              </p>
            </Card>
          </div>
        </div>
      </Slide>
    </main>
  )
}
