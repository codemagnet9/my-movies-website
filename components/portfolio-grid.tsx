"use client"

import { useState } from "react"
import { PortfolioCard } from "@/components/portfolio-card"
import type { Portfolio } from "@/types/portfolio"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PortfolioGridProps {
  portfolios: Portfolio[]
}

export function PortfolioGrid({ portfolios }: PortfolioGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedTag, setSelectedTag] = useState("all")

  // Get all unique tags
  const allTags = Array.from(new Set(portfolios.flatMap((p) => p.tags)))

  // Filter portfolios
  const filteredPortfolios = portfolios.filter((portfolio) => {
    const matchesSearch =
      portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTag = selectedTag === "all" || portfolio.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  // Sort portfolios
  const sortedPortfolios = [...filteredPortfolios].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      case "popular":
        return b.views - a.views
      case "stars":
        return b.stars - a.stars
      default:
        return 0
    }
  })

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search portfolios, tags, or names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Select value={selectedTag} onValueChange={setSelectedTag}>
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="stars">Most Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        Showing {sortedPortfolios.length} of {portfolios.length} portfolios
      </div>

      {/* Grid */}
      {sortedPortfolios.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedPortfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border p-8 text-center">
          <Search className="h-12 w-12 text-muted-foreground" />
          <div>
            <h3 className="mb-2 text-lg font-semibold">No portfolios found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedTag("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
