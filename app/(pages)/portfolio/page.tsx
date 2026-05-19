import type { Metadata } from 'next'
import PortfolioPageContent from '@/components/pages/PortfolioPageContent'

export const metadata: Metadata = {
  title: 'Our Portfolio | Jynoro',
  description:
    'View our latest web development projects including e-commerce platforms, SaaS applications, and SEO-optimized websites.',
  keywords: 'portfolio, projects, web development, case studies',
  openGraph: {
    title: 'Our Portfolio | Jynoro',
    description: 'View our latest web development projects and case studies.',
    type: 'website',
    url: 'https://jynoro.com/portfolio',
    images: [
      {
        url: 'https://picsum.photos/1200/630?random=101',
        width: 1200,
        height: 630,
        alt: 'Jynoro Portfolio Projects',
      },
    ],
  },
}

export default function PortfolioPage() {
  return <PortfolioPageContent />
}
