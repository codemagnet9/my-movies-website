import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Removed duplicate Header - it's already in layout.tsx */}
      <main className="flex flex-1 items-center justify-center">
        <div className="container flex flex-col items-center gap-6 py-20 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h1 className="mb-2 text-3xl font-bold">Portfolio Not Found</h1>
            <p className="text-muted-foreground">The portfolio you're looking for doesn't exist or has been removed.</p>
          </div>
          <Button asChild>
            <Link href="/#portfolios">Back to Gallery</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
