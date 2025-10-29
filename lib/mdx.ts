import fs from "fs"
import path from "path"
import matter from "gray-matter"

// Change this to point to content/blog instead of just content
const contentDirectory = path.join(process.cwd(), "content", "blog")

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  readTime: string
  tags: string[]
  content: string
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    // Check if content directory exists
    if (!fs.existsSync(contentDirectory)) {
      console.log("[v0] Content directory does not exist, returning empty array")
      return []
    }

    const files = fs.readdirSync(contentDirectory)
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"))

    const posts = mdxFiles.map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const filePath = path.join(contentDirectory, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        author: data.author || "PortfolioHub Team",
        readTime: data.readTime || "5 min read",
        tags: data.tags || [],
        content,
      }
    })

    // Sort by date, newest first
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("[v0] Error reading blog posts:", error)
    return []
  }
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`)

    if (!fs.existsSync(filePath)) {
      console.log(`[v0] Blog post not found: ${slug}`)
      return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString(),
      author: data.author || "PortfolioHub Team",
      readTime: data.readTime || "5 min read",
      tags: data.tags || [],
      content,
    }
  } catch (error) {
    console.error(`[v0] Error reading blog post ${slug}:`, error)
    return null
  }
}