"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { GiscusComments } from "@/components/giscus-comments"

// Mock comments data
const mockComments = [
  {
    id: "1",
    author: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Amazing platform! Love the design and functionality.",
    timestamp: "2 hours ago",
    provider: "github",
  },
  {
    id: "2",
    author: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "This is exactly what the developer community needed. Great work!",
    timestamp: "5 hours ago",
    provider: "google",
  },
  {
    id: "3",
    author: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "The GitHub integration is seamless. Highly recommend!",
    timestamp: "1 day ago",
    provider: "github",
  },
]

export default function GuestbookPage() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [message, setMessage] = useState("")
  const [comments, setComments] = useState(mockComments)
  const { toast } = useToast()

  const handleGitHubSignIn = () => {
    // Mock sign in
    setIsSignedIn(true)
    toast({
      title: "Signed in with GitHub",
      description: "You can now leave a comment!",
    })
  }

  const handleGoogleSignIn = () => {
    // Mock sign in
    setIsSignedIn(true)
    toast({
      title: "Signed in with Google",
      description: "You can now leave a comment!",
    })
  }

  const handleSubmit = () => {
    if (!message.trim()) return

    const newComment = {
      id: Date.now().toString(),
      author: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      message: message,
      timestamp: "Just now",
      provider: "github",
    }

    setComments([newComment, ...comments])
    setMessage("")
    toast({
      title: "Comment posted!",
      description: "Your message has been added to the guestbook.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold">Guestbook</h1>
            <p className="text-lg text-muted-foreground">
              Leave a comment and share your thoughts about PortfolioHub! Sign in with GitHub or Google to comment.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <GiscusComments />
          </div>
        </div>
      </main>
    </div>
  )
}
