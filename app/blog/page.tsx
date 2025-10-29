import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { getAllBlogPosts } from "@/lib/mdx"

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts()

  return (
    <main className="container max-w-5xl py-16">
      <div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">Blog</h1>
        <p className="mb-12 text-lg text-muted-foreground">Insights, tips, and stories from the developer community.</p>
      </div>

      {blogPosts.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="p-6 transition-shadow hover:shadow-lg">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="mb-2 text-2xl font-semibold transition-colors hover:text-primary">{post.title}</h2>
                <p className="mb-4 text-muted-foreground">{post.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}