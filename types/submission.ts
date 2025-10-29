export interface PortfolioSubmission {
  id: string
  name: string
  email: string
  websiteUrl: string
  githubUsername: string
  country: string
  description: string
  tags: string[]
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
}
