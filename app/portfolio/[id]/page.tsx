"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPortfolios } from "@/lib/mock-data"
import { fetchGitHubStats } from "@/lib/github"
import { ArrowLeft, ExternalLink, Github, MapPin, Eye, Star, BookOpen, Heart, GitFork } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { GiscusComments } from "@/components/giscus-comments"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const [portfolio, setPortfolio] = useState(mockPortfolios.find((p) => p.id === params.id))
  const [githubStats, setGithubStats] = useState<any>(null)
  const [voted, setVoted] = useState(false)
  const [voting, setVoting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (portfolio) {
      fetchGitHubStats(portfolio.githubUsername).then(setGithubStats)
    }
  }, [portfolio])

  if (!portfolio) {
    notFound()
  }

  const handleVote = async () => {
    if (voted || voting) return

    setVoting(true)
    try {
      const response = await fetch(`/api/portfolios/${portfolio.id}/vote`, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        setPortfolio({ ...portfolio, votes: data.votes })
        setVoted(true)
        toast({
          title: "Vote recorded!",
          description: "Thank you for supporting this portfolio.",
        })
      }
    } catch (error) {
      console.error("Error voting:", error)
      toast({
        title: "Error",
        description: "Failed to record vote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setVoting(false)
    }
  }

  return (
    <main className="flex-1">
      {/* Hero Image Section */}
      <section className="relative h-[400px] w-full overflow-hidden border-b border-border">
        {githubStats?.user.avatar_url ? (
          <div className="relative h-full w-full bg-gradient-to-b from-primary/20 to-background">
            <Image
              src={githubStats.user.avatar_url || "/placeholder.svg"}
              alt={portfolio.name}
              fill
              className="object-cover opacity-20 blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={githubStats.user.avatar_url || "/placeholder.svg"}
                alt={portfolio.name}
                width={200}
                height={200}
                className="rounded-full border-4 border-background shadow-2xl"
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-b from-primary/20 to-background">
            <div className="h-48 w-48 rounded-full bg-muted" />
          </div>
        )}
      </section>

      {/* Name and Info Section */}
      <section className="border-b border-border py-12">
        <div className="container max-w-4xl">
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link href="/#portfolios">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Gallery
            </Link>
          </Button>

          <div className="text-center">
            <h1 className="mb-4 text-5xl font-bold">{portfolio.name}</h1>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{portfolio.country}</span>
              </div>
            </div>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed">{portfolio.description}</p>

            {/* Tags */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {portfolio.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <a href={portfolio.websiteUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Demo
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={`https://github.com/${portfolio.githubUsername}`} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub Repository
                </a>
              </Button>
              <Button
                size="lg"
                variant={voted ? "secondary" : "default"}
                onClick={handleVote}
                disabled={voted || voting}
                className="gap-2"
              >
                <Heart className={`h-4 w-4 ${voted ? "fill-current" : ""}`} />
                {voted ? "Voted" : "Vote"} ({portfolio.votes || 0})
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border py-12">
        <div className="container max-w-4xl">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-3xl font-bold">{portfolio.views.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-3xl font-bold">{portfolio.stars}</div>
                <div className="text-sm text-muted-foreground">Stars</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="mx-auto mb-2 h-8 w-8 text-primary" />
                <div className="text-3xl font-bold">{githubStats?.user.public_repos || 0}</div>
                <div className="text-sm text-muted-foreground">GitHub Repos</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* GitHub Section */}
      {githubStats && (
        <section className="border-b border-border py-12 md:py-20">
          <div className="container">
            <div className="mb-8 flex items-center justify-center gap-3">
              <Github className="h-6 w-6" />
              <h2 className="text-3xl font-bold">GitHub Activity</h2>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="mb-8 grid gap-6 lg:grid-cols-2">
                {/* GitHub Profile */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-semibold">Profile</h3>
                    {githubStats.user.bio && (
                      <p className="mb-4 text-pretty text-muted-foreground">{githubStats.user.bio}</p>
                    )}
                    <div className="grid grid-cols-3 gap-4 rounded-lg border border-border p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{githubStats.user.public_repos}</div>
                        <div className="text-xs text-muted-foreground">Repositories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{githubStats.user.followers}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{githubStats.totalStars}</div>
                        <div className="text-xs text-muted-foreground">Total Stars</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Languages */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-semibold">Top Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {githubStats.topLanguages.map((lang: string) => (
                        <Badge key={lang} variant="secondary" className="text-sm">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                    {githubStats.topLanguages.length === 0 && (
                      <p className="text-sm text-muted-foreground">No language data available</p>
                    )}
                  </CardContent>
                </Card>
              </div>

              {githubStats.repos.length > 0 && (
                <div>
                  <h3 className="mb-6 text-center text-2xl font-bold">Recent Repositories</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {githubStats.repos.slice(0, 6).map((repo: any) => (
                      <Card key={repo.id} className="transition-all hover:shadow-lg">
                        <CardContent className="p-6">
                          <div className="mb-3 flex items-start justify-between gap-2">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 font-semibold hover:underline"
                            >
                              {repo.name}
                            </a>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </div>
                          {repo.description && (
                            <p className="mb-4 line-clamp-2 text-pretty text-sm text-muted-foreground">
                              {repo.description}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            {repo.language && (
                              <div className="flex items-center gap-1">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                <span>{repo.language}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              <span>{repo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <GitFork className="h-3 w-3" />
                              <span>{repo.forks_count}</span>
                            </div>
                          </div>
                          {repo.topics && repo.topics.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {repo.topics.slice(0, 3).map((topic) => (
                                <Badge key={topic} variant="outline" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Giscus Comments Section */}
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">Comments</h2>
          <GiscusComments />
        </div>
      </section>
    </main>
  )
}
