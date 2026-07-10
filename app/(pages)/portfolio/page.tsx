import type { Metadata } from 'next'
import PortfolioPageContent from '@/components/pages/PortfolioPageContent'
import { readPortfolio } from '@/lib/data-store'

export const metadata: Metadata = {
  title: 'Portfolio — Web Development & Custom Software Projects',
  description:
    'Explore Jynoro\'s portfolio of full stack web development projects, custom SaaS platforms, e-commerce solutions, and enterprise software applications built with React, Next.js, and modern cloud infrastructure.',
  keywords: [
    'web development portfolio',
    'full stack development projects',
    'custom software case studies',
    'react project examples',
    'next.js portfolio',
    'saas application examples',
    'e-commerce development',
    'enterprise software projects',
    'web app showcase',
    'custom web applications',
    'ui ux design portfolio',
  ],
  openGraph: {
    title: 'Portfolio — Web Development & Custom Software Projects | Jynoro',
    description: 'Explore Jynoro\'s portfolio of full stack web development projects and custom software applications.',
    type: 'website',
    url: 'https://jynoro.com/portfolio',
  },
  alternates: {
    canonical: '/portfolio',
  },
}

export default async function PortfolioPage() {
  const projects = await readPortfolio()
  return <PortfolioPageContent projects={projects} />
}
