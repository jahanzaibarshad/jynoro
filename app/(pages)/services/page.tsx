import type { Metadata } from 'next'
import ServicesPageContent from '@/components/pages/ServicesPageContent'
import CmsPageRenderer from '@/components/pages/CmsPageRenderer'
import { getPageBySlug } from '@/lib/data-store'
import { buildCmsMetadata } from '@/lib/cms-metadata'

const fallbackMetadata: Metadata = {
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
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('services')
  if (page) return buildCmsMetadata(page, fallbackMetadata)
  return fallbackMetadata
}

export default async function ServicesPage() {
  const page = await getPageBySlug('services')
  if (page) return <CmsPageRenderer page={page} />
  return <ServicesPageContent />
}
