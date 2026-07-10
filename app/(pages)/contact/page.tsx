import type { Metadata } from 'next'
import ContactPageContent from '@/components/pages/ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact Us — Free Consultation for Web Development & AI Projects',
  description:
    'Get a free consultation from Jynoro for your next web development, full stack engineering, or AI integration project. We respond within 24 hours and serve clients globally from Pakistan.',
  keywords: [
    'contact web developer',
    'hire full stack developer',
    'web development consultation',
    'free website consultation',
    'hire ai developer',
    'web development quote',
    'custom software quote',
    'contact digital agency',
    'hire react developer',
    'hire next.js developer',
    'web development pakistan',
    'freelance full stack developer',
  ],
  openGraph: {
    title: 'Contact Us — Free Consultation | Jynoro',
    description: 'Get in touch with Jynoro for a free consultation on your web development, full stack, or AI project.',
    type: 'website',
    url: 'https://jynoro.com/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default async function ContactPage() {
  return <ContactPageContent />
}
