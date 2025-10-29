# Tinybird Setup Guide

This guide will help you set up Tinybird for visitor tracking on your PortfolioHub website.

## Prerequisites

- A Vercel account
- A Tinybird account (free tier available at https://www.tinybird.co/)

## Step 1: Create a Tinybird Account

1. Go to https://www.tinybird.co/ and sign up for a free account
2. Create a new workspace for your project

## Step 2: Create the Visits Data Source

1. In your Tinybird workspace, create a new Data Source called `visits`
2. Use the following schema:

\`\`\`sql
SCHEMA >
    `timestamp` DateTime,
    `country` String,
    `country_region` String,
    `city` String

ENGINE "MergeTree"
ENGINE_PARTITION_KEY "toYYYYMM(timestamp)"
ENGINE_SORTING_KEY "timestamp"
\`\`\`

## Step 3: Create the Get Last Visit Pipe

1. Create a new Pipe called `get_last_visit`
2. Use the following SQL:

\`\`\`sql
SELECT
    country,
    country_region,
    city,
    timestamp,
    (SELECT count() FROM visits) as total_visits
FROM visits
ORDER BY timestamp DESC
LIMIT 1
\`\`\`

3. Publish the pipe and note the API endpoint

## Step 4: Get Your API Keys

1. Go to your Tinybird workspace settings
2. Navigate to "Tokens" section
3. Copy your API token (you'll need this for both reading and writing)

## Step 5: Add Environment Variables to Vercel

Add the following environment variable to your Vercel project:

\`\`\`
TINYBIRD_API_KEY=your_tinybird_api_token_here
\`\`\`

You can add this in:
- Vercel Dashboard → Your Project → Settings → Environment Variables
- Or through the Vercel CLI: `vercel env add TINYBIRD_API_KEY`

## Step 6: Deploy

Once you've added the environment variable, redeploy your application:

\`\`\`bash
vercel --prod
\`\`\`

## How It Works

1. **Visitor Tracking**: Every time someone visits your homepage, the `logVisit()` function sends their location data (country, region, city) to Tinybird
2. **Last Visitor Display**: The footer fetches the most recent visitor information and displays it along with the total visit count
3. **Vercel Headers**: The system uses Vercel's edge headers (`X-Vercel-IP-Country`, `X-Vercel-IP-Country-Region`, `X-Vercel-IP-City`) to get visitor location data

## Testing Locally

When running locally (not on Vercel), the visitor tracking will be skipped automatically. You'll see a console message: `[!] Not on Vercel, skipping log visit`

## Troubleshooting

- **No visitor data showing**: Make sure your `TINYBIRD_API_KEY` environment variable is set correctly
- **API errors**: Check that your Tinybird pipe is published and the endpoint is accessible
- **Location data not accurate**: This is normal - Vercel's IP geolocation is approximate and may not always be precise

## Privacy Note

This implementation only tracks:
- Country
- Region/State
- City
- Timestamp

No personal information, IP addresses, or user-identifying data is stored.
