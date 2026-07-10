import type { Metadata } from 'next'
import AboutPageContent from '@/components/pages/AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us — Meet the Team Behind Jynoro',
  description:
    'Jynoro is a premium web development and AI integration agency founded by Jahanzaib Arshad. We specialize in full stack development, AI agent orchestration, and high-performance digital experiences for startups and enterprises worldwide.',
  keywords: [
    'about jynoro',
    'web development agency',
    'full stack development team',
    'ai integration company',
    'jahanzaib arshad',
    'digital agency pakistan',
    'react developers',
    'next.js agency',
    'custom software company',
    'enterprise web solutions',
  ],
  openGraph: {
    title: 'About Us — Meet the Team Behind Jynoro',
    description:
      'Jynoro is a premium web development and AI integration agency. Full stack engineering, AI agents, and enterprise-grade digital solutions.',
    type: 'website',
    url: 'https://jynoro.com/about',
  },
  alternates: {
    canonical: '/about',
  },
}

export default async function AboutPage() {
  return <AboutPageContent />
}
