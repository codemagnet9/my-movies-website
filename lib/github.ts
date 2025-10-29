export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
  topics: string[]
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`[v0] GitHub API error: ${response.status} ${response.statusText}`)
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Error fetching GitHub user:", error)
    return null
  }
}

export async function fetchGitHubRepos(username: string, limit = 6): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`[v0] GitHub API error: ${response.status} ${response.statusText}`)
      return []
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Error fetching GitHub repos:", error)
    return []
  }
}

export async function fetchGitHubStats(username: string) {
  const user = await fetchGitHubUser(username)
  const repos = await fetchGitHubRepos(username)

  if (!user) {
    return null
  }

  // Calculate total stars across all repos
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

  // Get most used languages
  const languages = repos
    .filter((repo) => repo.language)
    .map((repo) => repo.language)
    .reduce(
      (acc, lang) => {
        acc[lang] = (acc[lang] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang]) => lang)

  return {
    user,
    repos,
    totalStars,
    topLanguages,
  }
}
