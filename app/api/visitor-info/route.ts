import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  const headersList = await headers()

  // Get IP address from headers
  const forwardedFor = headersList.get("x-forwarded-for")
  const realIp = headersList.get("x-real-ip")
  const ip = forwardedFor?.split(",")[0] || realIp || "Unknown"

  try {
    // Use ipapi.co for IP geolocation (free tier available)
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        "User-Agent": "PortfolioHub/1.0",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch IP info")
    }

    const data = await response.json()

    return NextResponse.json({
      ip: data.ip || ip,
      city: data.city || "Unknown",
      region: data.region || "Unknown",
      country: data.country_name || "Unknown",
      countryCode: data.country_code || "XX",
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    })
  } catch (error) {
    // Return mock data if API fails
    return NextResponse.json({
      ip,
      city: "San Francisco",
      region: "California",
      country: "United States",
      countryCode: "US",
      latitude: 37.7749,
      longitude: -122.4194,
      timezone: "America/Los_Angeles",
    })
  }
}
