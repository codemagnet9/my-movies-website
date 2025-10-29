"use client"

import type { Portfolio } from "@/types/portfolio"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, MapPin, Star, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length - 3)}...`
}

export function FeaturedPortfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/portfolios/featured")
      .then((res) => res.json())
      .then((data) => {
        setPortfolio(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching featured portfolio:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col gap-4">
            <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-20 w-full animate-pulse rounded bg-muted" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!portfolio) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No featured portfolio available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group relative mx-auto max-w-2xl overflow-hidden border-2 border-primary/20 shadow-lg transition-all hover:border-primary/40 hover:shadow-xl">
      {/* Featured Badge */}
      <div className="absolute right-4 top-4 z-10">
        <Badge className="gap-1 bg-primary/90 text-primary-foreground backdrop-blur-sm">
          <TrendingUp className="h-3 w-3" />
          Featured
        </Badge>
      </div>

      <CardContent className="p-8">
        {/* Header */}
        <div className="mb-6 flex items-start gap-4">
          <Link href={`/portfolio/${portfolio.id}`} className="shrink-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20 transition-all group-hover:border-primary/40">
              <Image
                src={`https://github.com/${portfolio.githubUsername}.png`}
                alt={portfolio.name}
                fill
                className="object-cover"
              />
            </div>
          </Link>
          <div className="flex-1">
            <Link
              href={`/portfolio/${portfolio.id}`}
              className="mb-1 inline-flex items-center gap-2 text-xl font-bold transition-colors hover:text-primary"
            >
              {truncate(portfolio.name, 30)}
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{portfolio.country}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                {portfolio.votes || 0} votes
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 leading-relaxed text-muted-foreground">{truncate(portfolio.description, 150)}</p>

        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {portfolio.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Button size="sm" asChild>
            <Link href={`/portfolio/${portfolio.id}`}>
              View Portfolio
              <ExternalLink className="ml-2 h-3 w-3" />
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={portfolio.websiteUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-3 w-3" />
              Live Demo
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={`https://github.com/${portfolio.githubUsername}`} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-3 w-3" />
              GitHub
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
