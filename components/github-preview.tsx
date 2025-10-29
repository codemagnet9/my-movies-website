"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchGitHubStats } from "@/lib/github"
import { Github, Star, GitFork, ExternalLink, Users, BookOpen } from "lucide-react"
import Image from "next/image"

interface GitHubPreviewProps {
  username: string
}

export function GitHubPreview({ username }: GitHubPreviewProps) {
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchGitHubStats>> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadGitHubData() {
      if (!username) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(false)

      try {
        const stats = await fetchGitHubStats(username)
        if (stats) {
          setData(stats)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error("[v0] Error loading GitHub data:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadGitHubData()
  }, [username])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Unable to fetch GitHub data. Please check the username and try again.
          </p>
        </CardContent>
      </Card>
    )
  }

  const { user, repos, totalStars, topLanguages } = data

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          GitHub Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Info */}
        <div className="flex items-start gap-4">
          <Image
            src={user.avatar_url || "/placeholder.svg"}
            alt={user.name || user.login}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{user.name || user.login}</h3>
            <p className="text-sm text-muted-foreground">@{user.login}</p>
            {user.bio && <p className="mt-2 text-sm">{user.bio}</p>}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 rounded-lg border border-border p-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>Repos</span>
            </div>
            <div className="mt-1 text-2xl font-bold">{user.public_repos}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Followers</span>
            </div>
            <div className="mt-1 text-2xl font-bold">{user.followers}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              <span>Stars</span>
            </div>
            <div className="mt-1 text-2xl font-bold">{totalStars}</div>
          </div>
        </div>

        {/* Top Languages */}
        {topLanguages.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-medium">Top Languages</h4>
            <div className="flex flex-wrap gap-2">
              {topLanguages.map((lang) => (
                <Badge key={lang} variant="secondary">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Recent Repos */}
        {repos.length > 0 && (
          <div>
            <h4 className="mb-3 text-sm font-medium">Recent Repositories</h4>
            <div className="space-y-3">
              {repos.slice(0, 3).map((repo) => (
                <div key={repo.id} className="rounded-lg border border-border p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                      >
                        {repo.name}
                      </a>
                      {repo.description && (
                        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{repo.description}</p>
                      )}
                      <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                        {repo.language && <span>{repo.language}</span>}
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="h-3 w-3" />
                          {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button variant="outline" className="w-full bg-transparent" asChild>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            View Full Profile
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
