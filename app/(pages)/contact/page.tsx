import type { Metadata } from 'next'
import ContactPageContent from '@/components/pages/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us | Get Your Free Consultation | Jynoro',
  description:
    'Ready to grow your business? Get in touch with our team for a free consultation on your web development needs.',
  keywords: 'contact, consultation, web development, quote',
  openGraph: {
    title: 'Contact Us | Jynoro',
    description: 'Get in touch with Jynoro for a free consultation on your web development project.',
    type: 'website',
    url: 'https://jynoro.com/contact',
    images: [
      {
        url: 'https://picsum.photos/1200/630?random=103',
        width: 1200,
        height: 630,
        alt: 'Contact Jynoro',
      },
    ],
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}
