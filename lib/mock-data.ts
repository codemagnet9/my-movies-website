import type { Portfolio } from "@/types/portfolio"

export const mockPortfolios: Portfolio[] = [
  {
    id: "1",
    name: "Sarah Chen",
    description:
      "Full-stack developer specializing in React, Node.js, and cloud architecture. Passionate about building scalable web applications.",
    websiteUrl: "https://sarahchen.dev",
    githubUsername: "sarahchen",
    country: "United States",
    tags: ["React", "Node.js", "TypeScript", "AWS"],
    submittedAt: "2025-01-15T10:00:00Z",
    views: 1250,
    stars: 45,
    votes: 89, // Added votes field for voting system
    githubData: {
      avatarUrl: "/professional-developer-portrait.png",
      bio: "Building the future, one commit at a time",
      publicRepos: 87,
      followers: 342,
      following: 156,
    },
  },
  {
    id: "2",
    name: "Alex Kumar",
    description:
      "UI/UX designer and frontend developer creating beautiful, accessible web experiences with modern frameworks.",
    websiteUrl: "https://alexkumar.io",
    githubUsername: "alexkumar",
    country: "India",
    tags: ["Vue.js", "Tailwind", "Design Systems", "Accessibility"],
    submittedAt: "2025-01-14T15:30:00Z",
    views: 980,
    stars: 38,
    votes: 67, // Added votes field
    githubData: {
      avatarUrl: "/creative-designer-portrait.png",
      bio: "Crafting pixel-perfect interfaces",
      publicRepos: 52,
      followers: 218,
      following: 89,
    },
  },
  {
    id: "3",
    name: "Maria Garcia",
    description: "DevOps engineer and cloud architect with expertise in Kubernetes, Docker, and CI/CD pipelines.",
    websiteUrl: "https://mariagarcia.tech",
    githubUsername: "mariagarcia",
    country: "Spain",
    tags: ["DevOps", "Kubernetes", "Docker", "Python"],
    submittedAt: "2025-01-13T09:15:00Z",
    views: 1450,
    stars: 62,
    votes: 142, // Added votes field - highest votes for featured portfolio
    githubData: {
      avatarUrl: "/tech-professional-portrait.jpg",
      bio: "Automating everything",
      publicRepos: 103,
      followers: 489,
      following: 201,
    },
  },
  {
    id: "4",
    name: "Yuki Tanaka",
    description:
      "Mobile app developer focused on React Native and Flutter. Creating cross-platform experiences that users love.",
    websiteUrl: "https://yukitanaka.dev",
    githubUsername: "yukitanaka",
    country: "Japan",
    tags: ["React Native", "Flutter", "Mobile", "Firebase"],
    submittedAt: "2025-01-12T14:20:00Z",
    views: 820,
    stars: 29,
    votes: 54, // Added votes field
    githubData: {
      avatarUrl: "/mobile-developer-portrait.jpg",
      bio: "Mobile-first mindset",
      publicRepos: 64,
      followers: 167,
      following: 92,
    },
  },
  {
    id: "5",
    name: "James Wilson",
    description:
      "Backend engineer specializing in microservices, GraphQL, and distributed systems. Love solving complex problems.",
    websiteUrl: "https://jameswilson.codes",
    githubUsername: "jameswilson",
    country: "United Kingdom",
    tags: ["Go", "GraphQL", "Microservices", "PostgreSQL"],
    submittedAt: "2025-01-11T11:45:00Z",
    views: 1120,
    stars: 51,
    votes: 78, // Added votes field
    githubData: {
      avatarUrl: "/backend-engineer-portrait.jpg",
      bio: "Scaling systems at scale",
      publicRepos: 78,
      followers: 294,
      following: 134,
    },
  },
  {
    id: "6",
    name: "Priya Sharma",
    description:
      "Data scientist and ML engineer building intelligent applications with Python, TensorFlow, and modern AI tools.",
    websiteUrl: "https://priyasharma.ai",
    githubUsername: "priyasharma",
    country: "Canada",
    tags: ["Python", "Machine Learning", "TensorFlow", "Data Science"],
    submittedAt: "2025-01-10T16:00:00Z",
    views: 1580,
    stars: 73,
    votes: 95, // Added votes field
    githubData: {
      avatarUrl: "/data-scientist-portrait.png",
      bio: "Teaching machines to learn",
      publicRepos: 91,
      followers: 521,
      following: 178,
    },
  },
]
