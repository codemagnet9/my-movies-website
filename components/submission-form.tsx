"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GitHubPreview } from "@/components/github-preview"
import { CheckCircle2, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SubmissionForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    websiteUrl: "",
    githubUsername: "",
    country: "",
    description: "",
    tags: [] as string[],
  })
  const [currentTag, setCurrentTag] = useState("")
  const [showGitHubPreview, setShowGitHubPreview] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    toast({
      title: "Portfolio submitted successfully!",
      description: "We'll review your submission and add it to the gallery soon.",
    })

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        name: "",
        email: "",
        websiteUrl: "",
        githubUsername: "",
        country: "",
        description: "",
        tags: [],
      })
      setShowGitHubPreview(false)
    }, 3000)
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag.trim()] })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const handleGitHubUsernameBlur = () => {
    if (formData.githubUsername.trim()) {
      setShowGitHubPreview(true)
    }
  }

  if (isSuccess) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Submission Successful!</h3>
          <p className="text-center text-muted-foreground">
            Thank you for submitting your portfolio. We'll review it and add it to our gallery soon.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Submit Your Portfolio</CardTitle>
          <CardDescription>
            Share your portfolio with the global developer community. Fill out the form below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteUrl">
                Portfolio Website URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="websiteUrl"
                type="url"
                placeholder="https://yourportfolio.com"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">The URL to your live portfolio website</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubUsername">
                GitHub Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="githubUsername"
                placeholder="johndoe"
                value={formData.githubUsername}
                onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
                onBlur={handleGitHubUsernameBlur}
                required
              />
              <p className="text-xs text-muted-foreground">
                We'll fetch your GitHub data automatically to display on your portfolio card
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">
                Country <span className="text-destructive">*</span>
              </Label>
              <Input
                id="country"
                placeholder="United States"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Tell us about yourself and your work..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
              <p className="text-xs text-muted-foreground">A brief description of your skills and experience</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Skills & Technologies</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="e.g., React, Node.js, TypeScript"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" variant="secondary" onClick={addTag}>
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 rounded-full hover:bg-secondary-foreground/20"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">Add tags to help others discover your portfolio</p>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Portfolio"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="lg:sticky lg:top-24 lg:self-start">
        {showGitHubPreview && formData.githubUsername ? (
          <GitHubPreview username={formData.githubUsername} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Live GitHub Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enter your GitHub username to see a live preview of how your GitHub data will appear on your portfolio
                card.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
