import { NextResponse } from "next/server"

// Mock database
const submissions = new Map()

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { status } = await request.json()
  const { id } = params

  // In production, update the database
  const submission = submissions.get(id)
  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 })
  }

  submission.status = status
  submission.reviewedAt = new Date().toISOString()

  // If approved, add to portfolios
  if (status === "approved") {
    // This would trigger adding to the main portfolio list
    console.log("[v0] Portfolio approved and added to main list:", submission)
  }

  return NextResponse.json(submission)
}
