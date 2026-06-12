import 'server-only'
import fs from 'fs/promises'
import path from 'path'
import type { BlogPost, PortfolioProject } from './content-types'
import type { CmsPage } from './page-sections'

export type { BlogPost, PortfolioProject } from './content-types'
export { getProjectHref } from './content-types'

const DATA_DIR = path.join(process.cwd(), 'data')
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json')
const BLOG_FILE = path.join(DATA_DIR, 'blog.json')
const PAGES_FILE = path.join(DATA_DIR, 'pages.json')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')

export interface SiteSettings {
  googleAnalyticsId: string
}

const DEFAULT_SETTINGS: SiteSettings = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

export async function readPortfolio(): Promise<PortfolioProject[]> {
  try {
    const raw = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    const data = JSON.parse(raw) as { projects: PortfolioProject[] }
    return data.projects
  } catch {
    const { PORTFOLIO_PROJECTS } = await import('./portfolio-data')
    return PORTFOLIO_PROJECTS.map((p) => ({ ...p, featured: p.featured ?? true }))
  }
}

export async function writePortfolio(projects: PortfolioProject[]) {
  await ensureDataDir()
  await fs.writeFile(PORTFOLIO_FILE, JSON.stringify({ projects }, null, 2), 'utf-8')
}

export async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(BLOG_FILE, 'utf-8')
    const data = JSON.parse(raw) as { posts: BlogPost[] }
    return data.posts
  } catch {
    return defaultBlogPosts()
  }
}

export async function writeBlogPosts(posts: BlogPost[]) {
  await ensureDataDir()
  await fs.writeFile(BLOG_FILE, JSON.stringify({ posts }, null, 2), 'utf-8')
}

function defaultBlogPosts(): BlogPost[] {
  return [
    {
      slug: 'modern-web-development-2024',
      title: 'The Complete Guide to Modern Web Development in 2024',
      excerpt:
        'Explore the latest technologies and best practices for building fast, secure, and scalable web applications in 2024.',
      content:
        'Modern web development continues to evolve rapidly. In this guide we cover frameworks, performance, security, and deployment best practices for production apps.',
      category: 'Web Development',
      date: 'Jan 15, 2024',
      readTime: 8,
      featured: true,
    },
    {
      slug: 'high-converting-landing-pages',
      title: '10 Tips for Building High-Converting Landing Pages',
      excerpt:
        'Learn the proven strategies to create landing pages that convert visitors into customers and boost your business growth.',
      content:
        'Landing pages are the front door of your campaigns. Focus on clarity, speed, social proof, and a single strong call to action.',
      category: 'Marketing',
      date: 'Jan 10, 2024',
      readTime: 6,
      featured: true,
    },
    {
      slug: 'responsive-design-essential',
      title: 'Why Responsive Design is Essential for Your Business',
      excerpt:
        "Discover why responsive design isn't just a nice-to-have feature but a critical requirement for modern web applications.",
      content:
        'Responsive design ensures your product works on every screen size. It improves SEO, usability, and conversion rates.',
      category: 'Web Design',
      date: 'Jan 5, 2024',
      readTime: 5,
      featured: false,
    },
  ]
}

export async function getProjectBySlug(slug: string) {
  const projects = await readPortfolio()
  return projects.find((p) => p.slug === slug)
}

export async function readPages(): Promise<CmsPage[]> {
  try {
    const raw = await fs.readFile(PAGES_FILE, 'utf-8')
    const data = JSON.parse(raw) as { pages: CmsPage[] }
    return data.pages
  } catch {
    const { defaultPages } = await import('./default-pages')
    return defaultPages()
  }
}

export async function writePages(pages: CmsPage[]) {
  await ensureDataDir()
  await fs.writeFile(PAGES_FILE, JSON.stringify({ pages }, null, 2), 'utf-8')
}

export async function getPageBySlug(slug: string) {
  const pages = await readPages()
  return pages.find((p) => p.slug === slug)
}

function resolveGoogleAnalyticsId(fileValue?: string) {
  return fileValue?.trim() || process.env.NEXT_PUBLIC_GA_ID?.trim() || ''
}

export async function readSettings(): Promise<SiteSettings> {
  try {
    const raw = await fs.readFile(SETTINGS_FILE, 'utf-8')
    const file = JSON.parse(raw) as SiteSettings
    return { googleAnalyticsId: resolveGoogleAnalyticsId(file.googleAnalyticsId) }
  } catch {
    return { googleAnalyticsId: resolveGoogleAnalyticsId() }
  }
}

export async function writeSettings(settings: SiteSettings) {
  await ensureDataDir()
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8')
}
