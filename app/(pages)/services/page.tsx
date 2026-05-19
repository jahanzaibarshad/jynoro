import type { Metadata } from 'next'
import ServicesPageContent from '@/components/pages/ServicesPageContent'

export const metadata: Metadata = {
  title: 'Web Development Services | Jynoro',
  description:
    'Professional web development, custom web apps, SEO optimization, and maintenance services. Let us help your business grow.',
  keywords: 'web development, custom web apps, SEO, digital services, web design',
  openGraph: {
    title: 'Web Development Services | Jynoro',
    description:
      'Professional web development, custom web apps, SEO optimization, and maintenance services.',
    type: 'website',
    url: 'https://jynoro.com/services',
    images: [
      {
        url: 'https://picsum.photos/1200/630?random=100',
        width: 1200,
        height: 630,
        alt: 'Jynoro Web Development Services',
      },
    ],
  },
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
