import type { Metadata } from 'next'
import ContactPageContent from '@/components/pages/ContactPageContent'
import CmsPageRenderer from '@/components/pages/CmsPageRenderer'
import { getPageBySlug } from '@/lib/data-store'
import { buildCmsMetadata } from '@/lib/cms-metadata'

const fallbackMetadata: Metadata = {
  title: 'Contact Us | Get Your Free Consultation | Jynoro',
  description:
    'Ready to grow your business? Get in touch with our team for a free consultation on your web development needs.',
  keywords: 'contact, consultation, web development, quote',
  openGraph: {
    title: 'Contact Us | Jynoro',
    description: 'Get in touch with Jynoro for a free consultation on your web development project.',
    type: 'website',
    url: 'https://jynoro.com/contact',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('contact')
  if (page) return buildCmsMetadata(page, fallbackMetadata)
  return fallbackMetadata
}

export default async function ContactPage() {
  const page = await getPageBySlug('contact')
  if (page) return <CmsPageRenderer page={page} />
  return <ContactPageContent />
}
