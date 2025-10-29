import { NextResponse } from "next/server"
import type { PortfolioSubmission } from "@/types/submission"

// Mock database - in production, this would be a real database
const submissions: PortfolioSubmission[] = [
  {
    id: "sub-1",
    name: "Test User",
    email: "test@example.com",
    websiteUrl: "https://example.com",
    githubUsername: "testuser",
    country: "United States",
    description: "A test portfolio submission",
    tags: ["React", "TypeScript"],
    status: "pending",
    submittedAt: new Date().toISOString(),
  },
]

export async function GET() {
  return NextResponse.json(submissions)
}

export async function POST(request: Request) {
  const body = await request.json()

  const newSubmission: PortfolioSubmission = {
    id: `sub-${Date.now()}`,
    ...body,
    status: "pending",
    submittedAt: new Date().toISOString(),
  }

  submissions.push(newSubmission)

  return NextResponse.json(newSubmission, { status: 201 })
}
