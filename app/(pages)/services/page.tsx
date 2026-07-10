import type { Metadata } from 'next'
import ServicesPageContent from '@/components/pages/ServicesPageContent'

export const metadata: Metadata = {
  title: 'Jynoro Services - Web Development, AI Automation, SEO & Graphic Design',
  description:
    'Explore Jynoro services: web development, custom web apps, AI automation, AI agent development, technical SEO, website maintenance, UI/UX design, and graphic design for growing businesses.',
  keywords: [
    'jynoro services',
    'jynoro web development services',
    'jynoro seo services',
    'jynoro graphic design',
    'web development services',
    'website development services',
    'responsive website development',
    'full stack development',
    'full stack web development services',
    'custom web application development',
    'custom software development services',
    'ai agent development',
    'ai automation services',
    'ai integration services',
    'RAG pipeline development',
    'next.js development services',
    'react development agency',
    'typescript engineering',
    'saas development',
    'technical seo services',
    'on page seo services',
    'core web vitals optimization',
    'seo optimization agency',
    'seo services for business',
    'graphic design services',
    'flyer design services',
    'banner design services',
    'ui ux design services',
    'website maintenance services',
    'website support services',
    'node.js backend development',
    'python backend development',
    'graphql api development',
    'enterprise software development',
    'custom software solutions',
    'web app performance optimization',
    'lighthouse score optimization',
  ],
  openGraph: {
    title: 'Jynoro Services - Web Development, AI Automation, SEO & Graphic Design',
    description:
      'Web development, custom SaaS engineering, AI automation, technical SEO, website maintenance, UI/UX, and graphic design services by Jynoro.',
    type: 'website',
    url: 'https://jynoro.com/services',
  },
  alternates: {
    canonical: '/services',
  },
}

const servicesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Jynoro Digital Services',
  serviceType: 'Web development, AI automation, SEO, website maintenance, UI/UX, and graphic design services',
  provider: {
    '@type': 'Organization',
    name: 'Jynoro',
    url: 'https://jynoro.com',
    logo: 'https://jynoro.com/favicon.webp',
    sameAs: [
      'https://www.facebook.com/share/18i2H9Jmx1/?mibextid=wwXIfr',
      'https://www.instagram.com/thejynoro',
      'https://www.linkedin.com/company/jynoro',
    ],
  },
  areaServed: 'Worldwide',
  url: 'https://jynoro.com/services',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Jynoro Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development Services',
          description: 'Responsive website development with Next.js, React, TypeScript, performance optimization, and SEO-ready structure.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Web App Development',
          description: 'Custom SaaS, dashboards, portals, APIs, and full stack web applications built for business workflows.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Automation Services',
          description: 'AI agent development, workflow automation, RAG pipelines, and LLM integrations for business operations.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Technical SEO Services',
          description: 'Technical SEO audits, keyword strategy, structured data, Core Web Vitals, and on-page SEO improvements.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Graphic Design Services',
          description: 'Brand graphics, marketing flyers, exhibition banners, social media creatives, UI design, and polished digital visuals.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Maintenance Services',
          description: 'Ongoing website support, bug fixes, updates, uptime checks, performance monitoring, and content improvements.',
        },
      },
    ],
  },
}

export default async function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
      />
      <ServicesPageContent />
    </>
  )
}
