import { Slide } from "@/components/slide"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <main className="container max-w-5xl py-16">
      <Slide delay={0.1}>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">About PortfolioHub</h1>
      </Slide>

      <Slide delay={0.2}>
        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
          PortfolioHub is a platform dedicated to showcasing exceptional developer portfolios from around the world. We
          believe every developer has a unique story to tell, and we're here to help amplify those voices.
        </p>
      </Slide>

      <Slide delay={0.3}>
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="leading-relaxed text-muted-foreground">
            To create a global community where developers can discover inspiration, share their work, and connect with
            like-minded professionals. We're building a space that celebrates creativity, technical excellence, and the
            diverse perspectives that make the developer community so vibrant.
          </p>
        </div>
      </Slide>

      <Slide delay={0.4}>
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold">What We Offer</h2>
          <ul className="space-y-4 leading-relaxed text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary">•</span>
              <span>A curated collection of outstanding developer portfolios</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">•</span>
              <span>Real-time GitHub integration to showcase your latest work</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">•</span>
              <span>A platform to gain visibility and connect with potential collaborators</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">•</span>
              <span>Inspiration and ideas for your own portfolio development</span>
            </li>
          </ul>
        </div>
      </Slide>

      <Slide delay={0.5}>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/#submit">Submit Your Portfolio</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#portfolios">Browse Portfolios</Link>
          </Button>
        </div>
      </Slide>
    </main>
  )
}
