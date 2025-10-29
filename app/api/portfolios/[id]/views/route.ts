import { NextResponse } from "next/server"

// Mock view counter
const viewCounts = new Map<string, number>()

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const currentViews = viewCounts.get(id) || 0
  const newViews = currentViews + 1
  viewCounts.set(id, newViews)

  return NextResponse.json({ views: newViews })
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const views = viewCounts.get(id) || 0

  return NextResponse.json({ views })
}
