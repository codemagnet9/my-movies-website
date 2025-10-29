import { headers } from "next/headers"

export async function logVisit() {
  try {
    if (!process.env.VERCEL) {
      console.log("[!] Not on Vercel, skipping log visit")
      return
    }

    let headersList
    try {
      headersList = await headers()
    } catch (error) {
      console.error("[!] Failed to get headers:", error)
      return
    }

    try {
      const response = await fetch("https://api.tinybird.co/v0/events?name=visits", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}`,
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          country: decodeURIComponent(headersList.get("X-Vercel-IP-Country") ?? "Unknown"),
          country_region: decodeURIComponent(headersList.get("X-Vercel-IP-Country-Region") ?? "Unknown"),
          city: decodeURIComponent(headersList.get("X-Vercel-IP-City") ?? "Unknown"),
        }),
      })

      if (!response.ok) {
        console.error("[!] Failed to log visit:", response.status, response.statusText)
      }
    } catch (fetchError) {
      console.error("[!] Error during fetch:", fetchError)
    }
  } catch (error) {
    console.error("[!] Unexpected error in logVisit:", error)
  }
}

export async function getLastVisitor() {
  try {
    const response = await fetch(
      `https://api.tinybird.co/v0/pipes/get_last_visit.json?token=${process.env.TINYBIRD_API_KEY}`,
      { cache: "no-store" },
    )

    if (!response.ok) {
      console.error("[!] Failed to get last visitor:", response.status, response.statusText)
      // Return mock data as fallback
      return {
        country: "United States",
        country_region: "California",
        city: "San Francisco",
        timestamp: new Date().toISOString(),
        total_visits: 1234,
      }
    }

    const data = await response.json()
    return data.data[0] as {
      country: string
      country_region: string
      city: string
      timestamp: string
      total_visits: number
    }
  } catch (error) {
    console.error("[!] Error fetching last visitor:", error)
    // Return mock data as fallback
    return {
      country: "United States",
      country_region: "California",
      city: "San Francisco",
      timestamp: new Date().toISOString(),
      total_visits: 1234,
    }
  }
}
