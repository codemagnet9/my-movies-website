import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Portfolio } from "@/types/portfolio"
import { ExternalLink, Github, Eye, Star, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PortfolioCardProps {
  portfolio: Portfolio
}

export function PortfolioCard({ portfolio }: PortfolioCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/portfolio/${portfolio.id}`}>
          <div className="relative aspect-video overflow-hidden bg-muted">
            {portfolio.githubData?.avatarUrl && (
              <Image
                src={portfolio.githubData.avatarUrl || "/placeholder.svg"}
                alt={portfolio.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-balance text-xl font-bold text-white">{portfolio.name}</h3>
              <div className="mt-1 flex items-center gap-1 text-sm text-white/90">
                <MapPin className="h-3 w-3" />
                <span>{portfolio.country}</span>
              </div>
            </div>
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-6">
        <p className="mb-4 line-clamp-2 text-pretty text-sm text-muted-foreground">{portfolio.description}</p>

        <div className="mb-4 flex flex-wrap gap-2">
          {portfolio.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {portfolio.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{portfolio.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{portfolio.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{portfolio.stars}</span>
          </div>
          {portfolio.githubData && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              <span>{portfolio.githubData.publicRepos} repos</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 border-t border-border p-4">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
          <a href={portfolio.websiteUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Site
          </a>
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
          <Link href={`/portfolio/${portfolio.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
