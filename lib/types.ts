export interface BlogPost {
  title: string
  date: string
  excerpt: string
  category: string
  featured: boolean
  slug: string
  url: string
  body: any
  _raw: {
    flattenedPath: string
  }
}

export interface ContactFormData {
  name: string
  businessName: string
  email: string
  serviceNeeded: string
  budget: string
  message: string
  website?: string // honeypot field
}

export interface ServiceCard {
  id: number
  title: string
  description: string
  icon: string
}

export type { PortfolioProject as Portfolio } from '@/lib/portfolio-data'

export interface Testimonial {
  name: string
  role: string
  content: string
  avatar: string
}
