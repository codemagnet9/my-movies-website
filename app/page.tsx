import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { FeaturedPortfolio } from "@/components/featured-portfolio"
import { mockPortfolios } from "@/lib/mock-data"
import { ArrowRight, Github, Globe, Star, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import { logVisit } from "@/lib/log-visit"
import { Slide } from "@/components/slide"

import HeroSvg from "@/components/icons/HeroSvg"

export default async function HomePage() {
  try {
    await logVisit()
  } catch (error) {
    console.error("[v0] Failed to log visit:", error)
    // Continue rendering the page even if logging fails
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}

<section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-secondary/20">
  <div className="container flex flex-col items-center gap-8 py-20 md:flex-row md:items-center md:py-32">
    {/* Left side - Content */}
    <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
      <Slide delay={0}>
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Live GitHub Integration</span>
        </div>
      </Slide>

      <Slide delay={0.1}>
        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
          Showcase Your Portfolio to the{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">World</span>
        </h1>
      </Slide>

      <Slide delay={0.2}>
        <p className="max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Discover amazing developer portfolios from around the globe. Share your work with live GitHub data and
          connect with the global developer community.
        </p>
      </Slide>

      <Slide delay={0.3}>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <Link href="#portfolios">
              Explore Portfolios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/guestbook">Join Community</Link>
          </Button>
        </div>
      </Slide>

      {/* Stats */}
      <Slide delay={0.4}>
        <div className="mt-12 grid w-full max-w-3xl grid-cols-3 gap-8 border-t border-border pt-8">
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-bold text-primary md:text-4xl">500+</div>
            <div className="text-sm text-muted-foreground">Portfolios</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-bold text-primary md:text-4xl">50+</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-bold text-primary md:text-4xl">10K+</div>
            <div className="text-sm text-muted-foreground">Visitors</div>
          </div>
        </div>
      </Slide>
    </div>

    {/* Right side - SVG */}
    <div className="flex-1">
      <HeroSvg />
    </div>
  </div>
</section>

      {/* Featured Portfolio Section */}
      <section id="featured" className="border-b border-border py-20 md:py-32">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              <TrendingUp className="mb-2 inline-block h-8 w-8 text-primary" />
              <br />
              Most Featured Portfolio
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Voted by the community as the most impressive portfolio this month
            </p>
          </div>

          <FeaturedPortfolio />
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section id="portfolios" className="border-b border-border py-20 md:py-32">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Explore Portfolios</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Discover amazing work from developers around the world
            </p>
          </div>

          <PortfolioGrid portfolios={mockPortfolios} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-b border-border py-20 md:py-32">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Why PortfolioHub?</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              The best platform to showcase your work and discover talent from around the world
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Live GitHub Integration</h3>
                <p className="text-pretty text-muted-foreground">
                  Automatically fetch and display your latest GitHub stats, repositories, and contributions in
                  real-time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Globe className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Global Community</h3>
                <p className="text-pretty text-muted-foreground">
                  Connect with developers from over 50 countries and discover diverse portfolios from around the world.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Trending Portfolios</h3>
                <p className="text-pretty text-muted-foreground">
                  Get discovered by featuring in our trending section based on views, stars, and community engagement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Easy Submission</h3>
                <p className="text-pretty text-muted-foreground">
                  Submit your portfolio in seconds with just your website URL and GitHub username. No complex setup
                  required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Developer Network</h3>
                <p className="text-pretty text-muted-foreground">
                  Build your professional network by connecting with like-minded developers and potential collaborators.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Real-Time Updates</h3>
                <p className="text-pretty text-muted-foreground">
                  Your portfolio data stays fresh with automatic updates from your GitHub profile and repository
                  activity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/20 to-background py-20 md:py-32">
        <div className="container">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">Ready to Share Your Work?</h2>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">
              Join hundreds of developers showcasing their portfolios on PortfolioHub. Connect with us through our
              guestbook.
            </p>
            <Button size="lg" asChild>
              <Link href="/guestbook">
                Join Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
