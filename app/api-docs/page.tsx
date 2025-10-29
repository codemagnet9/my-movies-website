import { Slide } from "@/components/slide"
import { Card } from "@/components/ui/card"

export default function ApiDocsPage() {
  return (
    <main className="container max-w-5xl py-16">
      <Slide delay={0.1}>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">API Documentation</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Access PortfolioHub data programmatically with our REST API.
        </p>
      </Slide>

      <Slide delay={0.2}>
        <Card className="mb-8 p-6">
          <h2 className="mb-4 text-2xl font-semibold">Base URL</h2>
          <code className="block rounded-md bg-muted p-4 text-sm">https://api.portfoliohub.com/v1</code>
        </Card>
      </Slide>

      <Slide delay={0.3}>
        <div className="mb-12 space-y-6">
          <h2 className="text-2xl font-semibold">Endpoints</h2>

          <Card className="p-6">
            <h3 className="mb-2 font-mono text-lg font-semibold">GET /portfolios</h3>
            <p className="mb-4 text-sm text-muted-foreground">Retrieve a list of all portfolios.</p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Query Parameters:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  • <code>page</code> - Page number (default: 1)
                </li>
                <li>
                  • <code>limit</code> - Items per page (default: 20)
                </li>
                <li>
                  • <code>country</code> - Filter by country
                </li>
                <li>
                  • <code>tags</code> - Filter by tags (comma-separated)
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-2 font-mono text-lg font-semibold">GET /portfolios/:id</h3>
            <p className="mb-4 text-sm text-muted-foreground">Retrieve a specific portfolio by ID.</p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Response:</p>
              <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs">
                {`{
  "id": "1",
  "name": "John Doe",
  "website": "https://johndoe.dev",
  "github": "johndoe",
  "country": "United States",
  "tags": ["React", "TypeScript", "Node.js"]
}`}
              </pre>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-2 font-mono text-lg font-semibold">POST /portfolios</h3>
            <p className="mb-4 text-sm text-muted-foreground">Submit a new portfolio (requires authentication).</p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Request Body:</p>
              <pre className="overflow-x-auto rounded-md bg-muted p-4 text-xs">
                {`{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "website": "https://janesmith.dev",
  "github": "janesmith",
  "country": "Canada",
  "description": "Full-stack developer...",
  "tags": ["Vue", "Python", "Docker"]
}`}
              </pre>
            </div>
          </Card>
        </div>
      </Slide>

      <Slide delay={0.4}>
        <Card className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">Authentication</h2>
          <p className="mb-4 text-muted-foreground">
            API requests require an API key. Include it in the Authorization header:
          </p>
          <code className="block rounded-md bg-muted p-4 text-sm">Authorization: Bearer YOUR_API_KEY</code>
          <p className="mt-4 text-sm text-muted-foreground">
            Contact us at api@portfoliohub.com to request an API key.
          </p>
        </Card>
      </Slide>
    </main>
  )
}
