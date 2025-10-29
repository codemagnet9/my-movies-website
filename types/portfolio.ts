export interface Portfolio {
  id: string
  name: string
  description: string
  websiteUrl: string
  githubUsername: string
  country: string
  tags: string[]
  submittedAt: string
  views: number
  stars: number
  votes: number // Added votes field for voting system
  githubData?: {
    avatarUrl: string
    bio: string
    publicRepos: number
    followers: number
    following: number
  }
}
