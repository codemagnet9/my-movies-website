import { NextResponse } from "next/server"
import { mockPortfolios } from "@/lib/mock-data"

export async function GET() {
  // Calculate statistics from mock data
  const totalPortfolios = mockPortfolios.length

  // Count unique countries
  const countries = new Set(mockPortfolios.map((p) => p.country))
  const countriesCount = countries.size

  // Calculate total stars
  const totalStars = mockPortfolios.reduce((sum, p) => sum + p.stars, 0)

  // Calculate total views
  const totalViews = mockPortfolios.reduce((sum, p) => sum + p.views, 0)

  // Count portfolios by country
  const countryStats = mockPortfolios.reduce(
    (acc, portfolio) => {
      acc[portfolio.country] = (acc[portfolio.country] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Sort countries by count
  const topCountries = Object.entries(countryStats)
    .map(([country, count]) => ({
      country,
      count,
      percentage: Math.round((count / totalPortfolios) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return NextResponse.json({
    totalPortfolios,
    countriesCount,
    totalStars,
    totalViews,
    topCountries,
    lastUpdated: new Date().toISOString(),
  })
}
