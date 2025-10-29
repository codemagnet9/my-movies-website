import { type NextRequest, NextResponse } from "next/server"
import { mockPortfolios } from "@/lib/mock-data"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const portfolio = mockPortfolios.find((p) => p.id === params.id)

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    // In a real app, this would update the database
    // For now, we'll just increment the votes in memory
    portfolio.votes = (portfolio.votes || 0) + 1

    return NextResponse.json({
      success: true,
      votes: portfolio.votes,
    })
  } catch (error) {
    console.error("Error voting for portfolio:", error)
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 })
  }
}
