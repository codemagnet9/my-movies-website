# Giscus Comments Setup Guide

This guide will help you set up Giscus comments for your PortfolioHub website.

## What is Giscus?

Giscus is a comments system powered by GitHub Discussions. It allows visitors to leave comments using their GitHub or Google accounts.

## Prerequisites

- A GitHub account
- A public GitHub repository for your project

## Step-by-Step Setup

### 1. Enable GitHub Discussions

1. Go to your GitHub repository
2. Click on **Settings**
3. Scroll down to **Features** section
4. Check the box for **Discussions**

### 2. Install Giscus App

1. Visit [https://github.com/apps/giscus](https://github.com/apps/giscus)
2. Click **Install**
3. Select your repository
4. Grant the necessary permissions

### 3. Configure Giscus

1. Go to [https://giscus.app](https://giscus.app)
2. Enter your repository in the format: `username/repo-name`
3. Choose your preferred settings:
   - **Page ↔️ Discussions Mapping**: Select "pathname"
   - **Discussion Category**: Choose "General" or create a new category
   - **Features**: Enable reactions
   - **Theme**: Select "preferred_color_scheme" for automatic dark/light mode

### 4. Get Your Configuration

After configuring, Giscus will generate a script tag. You'll need these values:

- `data-repo`: Your repository (e.g., "username/repo-name")
- `data-repo-id`: Your repository ID (auto-generated)
- `data-category`: Discussion category name
- `data-category-id`: Category ID (auto-generated)

### 5. Update Your Code

Open `components/giscus-comments.tsx` and replace the placeholder values:

\`\`\`tsx
script.setAttribute("data-repo", "your-username/your-repo") // Replace with your repo
script.setAttribute("data-repo-id", "YOUR_REPO_ID") // Replace with your repo ID
script.setAttribute("data-category", "General") // Replace with your category
script.setAttribute("data-category-id", "YOUR_CATEGORY_ID") // Replace with your category ID
\`\`\`

### 6. Test Your Comments

1. Deploy your website
2. Navigate to the Guestbook page or any Portfolio detail page
3. Try leaving a comment using your GitHub account
4. Comments will appear as GitHub Discussions in your repository

## Features

- **GitHub & Google Sign-in**: Users can sign in with either account
- **Reactions**: Users can react to comments with emojis
- **Markdown Support**: Full markdown formatting in comments
- **Automatic Theme**: Switches between light/dark mode automatically
- **Moderation**: Manage comments through GitHub Discussions

## Troubleshooting

**Comments not loading?**
- Verify your repository is public
- Check that GitHub Discussions is enabled
- Ensure Giscus app is installed on your repository
- Verify all configuration IDs are correct

**Theme not switching?**
- The theme automatically follows your site's theme
- Check that `data-theme` is set to "preferred_color_scheme"

## Support

For more help, visit:
- [Giscus Documentation](https://giscus.app)
- [GitHub Discussions Guide](https://docs.github.com/en/discussions)
