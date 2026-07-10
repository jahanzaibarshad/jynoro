export interface PortfolioProject extends SeoFields {
  id: number
  slug: string
  title: string
  category: string
  description: string
  featuredDescription?: string
  longDescription: string
  highlights: string[]
  image: string
  gallery: string[]
  technologies: string[]
  year: string
  client: string
  featured: boolean
  liveUrl?: string
}

export interface SeoFields {
  focusKeyword?: string
  seoTitle?: string
  seoDescription?: string
}

export interface BlogPost extends SeoFields {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: number
  featured: boolean
  image?: string
}

export function getProjectHref(slug: string) {
  return `/portfolio/${slug}`
}
