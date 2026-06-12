import type { Metadata } from 'next'
import AboutPageContent from '@/components/pages/AboutPageContent'
import CmsPageRenderer from '@/components/pages/CmsPageRenderer'
import { getPageBySlug } from '@/lib/data-store'
import { buildCmsMetadata } from '@/lib/cms-metadata'

const fallbackMetadata: Metadata = {
  title: 'About Us | Jynoro - Web Development Experts',
  description:
    'Learn about Jynoro, meet Founder & CEO Jahanzaib Arshad, and discover our mission to help businesses grow through modern web solutions.',
  keywords: 'about us, team, web development company, digital agency',
  openGraph: {
    title: 'About Us | Jynoro',
    description: 'Learn about Jynoro and our mission to help businesses grow.',
    type: 'website',
    url: 'https://jynoro.com/about',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about')
  if (page) return buildCmsMetadata(page, fallbackMetadata)
  return fallbackMetadata
}

export default async function AboutPage() {
  const page = await getPageBySlug('about')
  if (page) return <CmsPageRenderer page={page} />
  return <AboutPageContent />
}
