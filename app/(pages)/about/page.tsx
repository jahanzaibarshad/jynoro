import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import AboutPageContent from '@/components/pages/AboutPageContent'

export const metadata: Metadata = {
  title: 'About Us | Jynoro - Web Development Experts',
  description:
    'Learn about Jynoro, meet Founder & CEO Jahanzaib Arshad, and discover our mission to help businesses grow through modern web solutions.',
  keywords: 'about us, team, web development company, digital agency',
  openGraph: {
    title: 'About Us | Jynoro',
    description: 'Learn about Jynoro and our mission to help businesses grow.',
    type: 'website',
    url: 'https://jynoro.com/about',
    images: [
      {
        url: 'https://picsum.photos/1200/630?random=104',
        width: 1200,
        height: 630,
        alt: 'About Jynoro',
      },
    ],
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}
