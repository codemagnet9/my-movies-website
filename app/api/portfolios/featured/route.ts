import { NextResponse } from "next/server"
import { mockPortfolios } from "@/lib/mock-data"

export async function GET() {
  try {
    // Get the portfolio with the most votes
    const featured = mockPortfolios.reduce((prev, current) => {
      return (current.votes || 0) > (prev.votes || 0) ? current : prev
    })

    return NextResponse.json(featured)
  } catch (error) {
    console.error("Error fetching featured portfolio:", error)
    return NextResponse.json({ error: "Failed to fetch featured portfolio" }, { status: 500 })
  }
}
