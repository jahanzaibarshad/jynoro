import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import PortfolioSection from '@/components/home/PortfolioSection'
import WhyJynoroSection from '@/components/home/WhyJynoroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BlogPreviewSection from '@/components/home/BlogPreviewSection'
import CTASection from '@/components/home/CTASection'
import NewsletterSection from '@/components/home/NewsletterSection'
import ParallaxSection from '@/components/effects/ParallaxSection'

// JSON-LD Structured Data for Google Rich Results
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Jynoro',
  url: 'https://jynoro.com',
  logo: 'https://jynoro.com/favicon.webp',
  description:
    'Jynoro is a premium web development, AI automation, SEO, and graphic design agency that builds responsive websites, Next.js applications, custom SaaS platforms, and growth-focused digital systems.',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Jahanzaib Arshad',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@jynoro.com',
    telephone: '+923361058649',
    contactType: 'customer service',
    availableLanguage: ['English', 'Urdu'],
  },
  sameAs: [
    'https://www.facebook.com/share/18i2H9Jmx1/?mibextid=wwXIfr',
    'https://www.instagram.com/thejynoro',
    'https://www.linkedin.com/company/jynoro',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
  },
  areaServed: 'Worldwide',
  serviceType: [
    'Web Development',
    'Full Stack Development',
    'AI Agent Integration',
    'Custom Software Development',
    'SEO Optimization',
    'Technical SEO Services',
    'UI/UX Design',
    'Graphic Design',
    'Website Maintenance',
    'SaaS Development',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Jynoro',
  url: 'https://jynoro.com',
  description: 'Elite Web Development, Full Stack & AI Agency',
  publisher: {
    '@type': 'Organization',
    name: 'Jynoro',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What web frameworks does Jynoro use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We build with React/Next.js and TypeScript on the frontend, and Node.js/Python on the backend. This gives unmatched speed, modularity, and SEO indexability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Jynoro integrate AI agents into existing applications?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We can integrate autonomous AI agents, Retrieval-Augmented Generation (RAG) pipelines, and LLM orchestration tools directly into your existing business software.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the standard timeline for a web development project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on complexity. A corporate landing page takes 2-4 weeks. A full custom SaaS web application typically requires 8-12 weeks from blueprinting to final launch.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do code handoffs and IP ownership work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Once project balances are cleared, full source code and Intellectual Property (IP) is pushed to your organization accounts — clean, documented Git repositories included.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Jynoro speed up or refactor my existing website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We audit slow WordPress or React sites and convert them to blazing-fast Next.js architectures that consistently score 95+ on Google Lighthouse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will my website be mobile responsive and SEO optimized?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '100%. All our interfaces are built mobile-first. We implement semantic HTML, structured data, and server-side rendering to ensure your site is deeply optimized for search engines right out of the box.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Jynoro offer post-launch maintenance and support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer dedicated maintenance retainers that include 24/7 server monitoring, dependency updates, security patches, and priority bug fixing to ensure your app scales flawlessly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Jynoro help with domain setup and hosting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — domain configuration, SSL, DNS routing, and deployment on Vercel, AWS, and Netlify are all part of our process.',
      },
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Jynoro',
  url: 'https://jynoro.com',
  priceRange: '$$',
  image: 'https://jynoro.com/favicon.webp',
  description: 'Premium web development, AI automation, technical SEO, website maintenance, custom web app, and graphic design services.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'PK',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web & AI Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full Stack Web Development',
          alternateName: ['Web Development Services', 'Responsive Website Development', 'Next.js Development'],
          description: 'Custom React and Next.js web development services with TypeScript, responsive design, semantic HTML, and performance-focused engineering.',
          areaServed: 'Worldwide',
          provider: {
            '@type': 'Organization',
            name: 'Jynoro',
          },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Automation and AI Agent Integration',
          alternateName: ['AI Agent Development', 'AI Automation Services', 'RAG Pipeline Development'],
          description: 'Autonomous AI agent development, workflow automation, RAG pipelines, and LLM-powered features for business applications.',
          areaServed: 'Worldwide',
          provider: {
            '@type': 'Organization',
            name: 'Jynoro',
          },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom SaaS Development',
          alternateName: ['Custom Web App Development', 'SaaS Application Development', 'Custom Software Development'],
          description: 'End-to-end SaaS platform and custom web application development with authentication, databases, APIs, dashboards, and cloud deployment.',
          areaServed: 'Worldwide',
          provider: {
            '@type': 'Organization',
            name: 'Jynoro',
          },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Technical SEO Services',
          alternateName: ['SEO Optimization', 'SEO Services', 'Core Web Vitals Optimization'],
          description: 'Technical SEO audits, keyword strategy, on-page SEO, Core Web Vitals optimization, structured data, and search performance improvements.',
          areaServed: 'Worldwide',
          provider: {
            '@type': 'Organization',
            name: 'Jynoro',
          },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Graphic Design and UI/UX Design',
          alternateName: ['Graphic Design Services', 'UI UX Design Services', 'Brand Design'],
          description: 'Professional graphic design, UI/UX design, Figma prototypes, branding assets, marketing flyers, banners, and modern design systems.',
          areaServed: 'Worldwide',
          provider: {
            '@type': 'Organization',
            name: 'Jynoro',
          },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Maintenance and Support',
          alternateName: ['Website Maintenance Services', 'Website Support', 'Ongoing Web Support'],
          description: 'Website maintenance, bug fixing, dependency updates, uptime monitoring, performance checks, and ongoing technical support.',
          areaServed: 'Worldwide',
          provider: {
            '@type': 'Organization',
            name: 'Jynoro',
          },
        },
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ParallaxSection tall={false}>
        <WhyJynoroSection />
      </ParallaxSection>
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
      <NewsletterSection />
    </>
  )
}
