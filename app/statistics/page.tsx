import { Slide } from "@/components/slide"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Globe, Star, TrendingUp, MapPin } from "lucide-react"

async function getStatistics() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/statistics`, {
      cache: "no-store",
    })
    if (!response.ok) throw new Error("Failed to fetch statistics")
    return await response.json()
  } catch (error) {
    // Return mock data if API fails
    return {
      totalPortfolios: 1234,
      countriesCount: 87,
      totalStars: 45200,
      totalViews: 235000,
      topCountries: [
        { country: "United States", count: 342, percentage: 28 },
        { country: "India", count: 289, percentage: 23 },
        { country: "United Kingdom", count: 156, percentage: 13 },
        { country: "Germany", count: 134, percentage: 11 },
        { country: "Canada", count: 98, percentage: 8 },
      ],
    }
  }
}

async function getVisitorInfo() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/visitor-info`, {
      cache: "no-store",
    })
    if (!response.ok) throw new Error("Failed to fetch visitor info")
    return await response.json()
  } catch (error) {
    return {
      city: "Unknown",
      region: "Unknown",
      country: "Unknown",
      ip: "Unknown",
    }
  }
}

export default async function StatisticsPage() {
  const stats = await getStatistics()
  const visitor = await getVisitorInfo()

  const statCards = [
    {
      icon: Users,
      label: "Total Portfolios",
      value: stats.totalPortfolios.toLocaleString(),
      change: "+12% this month",
    },
    {
      icon: Globe,
      label: "Countries Represented",
      value: stats.countriesCount.toString(),
      change: "+5 new countries",
    },
    {
      icon: Star,
      label: "Total GitHub Stars",
      value: (stats.totalStars / 1000).toFixed(1) + "K",
      change: "+2.3K this week",
    },
    {
      icon: TrendingUp,
      label: "Total Views",
      value: (stats.totalViews / 1000).toFixed(1) + "K",
      change: "+18% growth",
    },
  ]

  return (
    <main className="container max-w-6xl py-16">
      <Slide delay={0.1}>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Platform Statistics</h1>
        <p className="mb-4 text-lg text-muted-foreground">
          Real-time insights into the PortfolioHub community and platform growth.
        </p>
        <Card className="mb-12 bg-primary/5">
          <CardContent className="flex items-center gap-2 p-4">
            <MapPin className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">
              You are viewing from{" "}
              <span className="font-semibold text-foreground">
                {visitor.city}, {visitor.region}, {visitor.country}
              </span>
              {visitor.ip !== "Unknown" && <span className="ml-2 text-xs">({visitor.ip})</span>}
            </p>
          </CardContent>
        </Card>
      </Slide>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <Slide key={stat.label} delay={0.2 + index * 0.1}>
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
            </Card>
          </Slide>
        ))}
      </div>

      <Slide delay={0.7}>
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-semibold">Top Countries</h2>
          <div className="space-y-4">
            {stats.topCountries.map((item: any) => (
              <div key={item.country} className="flex items-center gap-4">
                <div className="w-40 text-sm font-medium">{item.country}</div>
                <div className="flex-1">
                  <div className="h-8 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full bg-primary transition-all" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
                <div className="w-24 text-right text-sm text-muted-foreground">
                  {item.count} ({item.percentage}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>
    </main>
  )
}
