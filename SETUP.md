# PortfolioHub Setup Guide

This guide will help you set up the PortfolioHub application with all its features.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git

## Installation

1. **Clone or download the project**
   \`\`\`bash
   # If using the shadcn CLI (recommended)
   npx shadcn@latest init
   
   # Or download the ZIP file from v0
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Features Overview

### 1. Portfolio Showcase
- Browse portfolios from developers worldwide
- Filter by tags and search by name
- Sort by recent, popular, or most starred

### 2. Portfolio Submission
- Users can submit their portfolios via the form
- GitHub integration fetches live data
- Submissions go to a pending queue for approval

### 3. Portfolio Detail Pages
- Large profile image at the top
- Name and description
- Real-time stats: views, stars, GitHub repos
- GitHub activity and repositories
- Demo and GitHub repository links

### 4. Guestbook
- Users can sign in with GitHub or Google (mock implementation)
- Leave comments and messages
- View all community comments

### 5. Admin Approval System (Mock)
The submission system uses mock APIs. Here's how it works:

#### Submission Flow:
1. User submits portfolio via form
2. Submission is stored with "pending" status
3. Admin reviews submission
4. Admin approves/rejects
5. If approved, portfolio appears on main site

#### API Endpoints:

**GET /api/submissions**
- Returns all submissions
- Response: Array of PortfolioSubmission objects

**POST /api/submissions**
- Create new submission
- Body: Portfolio data
- Response: Created submission with "pending" status

**PATCH /api/submissions/[id]**
- Update submission status
- Body: `{ status: "approved" | "rejected" }`
- Response: Updated submission

**POST /api/portfolios/[id]/views**
- Increment view count
- Response: `{ views: number }`

**GET /api/portfolios/[id]/views**
- Get current view count
- Response: `{ views: number }`

## Database Setup (For Production)

Currently, the app uses in-memory mock data. To set up a real database:

### Option 1: Supabase (Recommended)

1. **Create a Supabase project**
   - Go to https://supabase.com
   - Create a new project

2. **Create tables**
   \`\`\`sql
   -- Portfolios table
   CREATE TABLE portfolios (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     website_url TEXT NOT NULL,
     github_username TEXT NOT NULL,
     country TEXT NOT NULL,
     description TEXT NOT NULL,
     tags TEXT[] NOT NULL,
     views INTEGER DEFAULT 0,
     stars INTEGER DEFAULT 0,
     status TEXT DEFAULT 'pending',
     submitted_at TIMESTAMP DEFAULT NOW(),
     reviewed_at TIMESTAMP
   );

   -- Guestbook comments table
   CREATE TABLE guestbook_comments (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     author TEXT NOT NULL,
     avatar TEXT,
     message TEXT NOT NULL,
     provider TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Views tracking table
   CREATE TABLE portfolio_views (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     portfolio_id UUID REFERENCES portfolios(id),
     viewed_at TIMESTAMP DEFAULT NOW()
   );
   \`\`\`

3. **Add environment variables**
   Create a `.env.local` file:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`

4. **Update API routes**
   Replace mock data with Supabase client calls

### Option 2: Other Databases

You can use any database (PostgreSQL, MySQL, MongoDB, etc.) by:
1. Setting up the database
2. Creating the schema
3. Updating the API routes to use your database client

## Authentication Setup (For Production)

Currently using mock authentication. To implement real auth:

### GitHub OAuth

1. **Create GitHub OAuth App**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create new OAuth App
   - Set callback URL: `http://localhost:3000/api/auth/callback/github`

2. **Add environment variables**
   \`\`\`
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   \`\`\`

3. **Install NextAuth.js**
   \`\`\`bash
   npm install next-auth
   \`\`\`

4. **Configure NextAuth**
   Create `app/api/auth/[...nextauth]/route.ts`

### Google OAuth

1. **Create Google OAuth credentials**
   - Go to Google Cloud Console
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI

2. **Add environment variables**
   \`\`\`
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   \`\`\`

## GitHub API Integration

The app uses GitHub's public API (no auth required for public data).

**Rate Limits:**
- Unauthenticated: 60 requests/hour
- Authenticated: 5000 requests/hour

To increase rate limits, add a GitHub token:

1. **Create GitHub Personal Access Token**
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate new token (no scopes needed for public data)

2. **Add to environment variables**
   \`\`\`
   GITHUB_TOKEN=your_github_token
   \`\`\`

3. **Update GitHub API calls**
   Add token to headers in `lib/github.ts`

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   \`\`\`

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables
   - Deploy

### Environment Variables for Production

\`\`\`
# Database (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Authentication (if using NextAuth)
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_secret_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub API (optional, for higher rate limits)
GITHUB_TOKEN=your_github_token
\`\`\`

## Troubleshooting

### GitHub API Rate Limit
If you hit rate limits, add a GitHub token (see above).

### Images Not Loading
Make sure to add image domains to `next.config.js`:
\`\`\`js
images: {
  domains: ['avatars.githubusercontent.com', 'github.com'],
}
\`\`\`

### Build Errors
Clear cache and rebuild:
\`\`\`bash
rm -rf .next
npm run build
\`\`\`

## Support

For issues or questions:
- Check the documentation
- Review the code comments
- Open an issue on GitHub

## Next Steps

1. Set up a real database (Supabase recommended)
2. Implement real authentication (NextAuth.js)
3. Add admin dashboard for managing submissions
4. Implement email notifications
5. Add analytics tracking
6. Set up automated testing

---

Built with Next.js, TypeScript, and Tailwind CSS
