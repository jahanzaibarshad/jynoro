export interface PortfolioProject {
  id: number
  slug: string
  title: string
  category: string
  description: string
  longDescription: string
  highlights: string[]
  image: string
  gallery: string[]
  technologies: string[]
  year: string
  client: string
  featured?: boolean
  liveUrl?: string
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 1,
    slug: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce platform with payment integration',
    longDescription:
      'A modern e-commerce experience built for scale â€” product catalog, secure checkout, order management, and an admin dashboard designed for day-to-day operations. Replace this copy with your final case study when ready.',
    highlights: [
      'Stripe payment integration',
      'Responsive product catalog',
      'Admin order management',
    ],
    image: '/images/projects/project-1.svg',
    gallery: [
      'https://picsum.photos/1200/750?random=101',
      'https://picsum.photos/1200/750?random=102',
      'https://picsum.photos/1200/750?random=103',
      'https://picsum.photos/1200/750?random=104',
    ],
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    year: '2024',
    client: 'Retail Client',
  },
  {
    id: 2,
    slug: 'saas-dashboard',
    title: 'SaaS Dashboard',
    category: 'Custom Web App',
    description: 'Advanced analytics dashboard with real-time data',
    longDescription:
      'A data-rich SaaS dashboard with real-time metrics, user management, and role-based access. Sample screenshots below â€” swap images and text with your production case study content later.',
    highlights: [
      'Real-time analytics widgets',
      'Role-based access control',
      'Exportable reports',
    ],
    image: '/images/projects/project-2.svg',
    gallery: [
      'https://picsum.photos/1200/750?random=201',
      'https://picsum.photos/1200/750?random=202',
      'https://picsum.photos/1200/750?random=203',
    ],
    technologies: ['React', 'Node.js', 'Chart.js', 'REST API'],
    year: '2024',
    client: 'SaaS Startup',
  },
  {
    id: 7,
    slug: 'seo-growth-system',
    title: 'SEO Growth System',
    category: 'SEO Optimized',
    description: 'SEO analytics and optimization setup built to track clicks, impressions, rankings, and technical site health.',
    longDescription:
      'A comprehensive SEO growth system designed to drive organic visibility through technical SEO foundations, keyword tracking, and data-driven optimization strategies.',
    highlights: [
      'Technical SEO foundations',
      'Keyword ranking tracking',
      'Clicks & impressions analytics',
    ],
    image: '/images/projects/SEO growth.webp',
    gallery: [
      'https://picsum.photos/1200/750?random=701',
      'https://picsum.photos/1200/750?random=702',
      'https://picsum.photos/1200/750?random=703',
    ],
    technologies: ['Next.js', 'Contentlayer', 'Tailwind CSS'],
    year: '2024',
    client: 'SEO Growth System',
    featured: true,
  },
  {
    id: 3,
    slug: 'duaa-al-khaleej',
    title: 'Duaa Al Khaleej Co. Ltd',
    category: 'Construction Website',
    description: 'Corporate construction website designed to showcase services, build trust, and drive project inquiries.',
    longDescription:
      'A premium corporate website for Duaa Al Khaleej Co. Ltd, a Gulf-based leader in construction, logistics, and industrial solutions. The site showcases their extensive service portfolio, builds trust with high-quality visuals and case studies, and drives qualified project inquiries.',
    highlights: [
      'Service portfolio showcase',
      'Trust-building design system',
      'Project inquiry optimization',
    ],
    image: '/images/projects/Dua-al-kahleej.webp',
    gallery: [
      'https://picsum.photos/1200/750?random=301',
      'https://picsum.photos/1200/750?random=302',
      'https://picsum.photos/1200/750?random=303',
      'https://picsum.photos/1200/750?random=304',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    year: '2024',
    client: 'Duaa Al Khaleej Co. Ltd',
    featured: true,
    liveUrl: 'https://dakksa.com',
  },
  {
    id: 5,
    slug: 'brand-aviation',
    title: 'Brand Aviation',
    category: 'Marketing Website',
    description: 'Creative marketing and brand activation website designed to showcase services, portfolio, and drive quote inquiries.',
    longDescription:
      'A creative marketing and brand activation website built for Brand Aviation, showcasing their full range of services, portfolio of campaigns, and driving quote inquiries through clear CTAs and compelling case studies.',
    highlights: [
      'Creative portfolio showcase',
      'Service-driven architecture',
      'Quote inquiry optimization',
    ],
    image: '/images/projects/BrandAviation.webp',
    gallery: [
      'https://picsum.photos/1200/750?random=501',
      'https://picsum.photos/1200/750?random=502',
      'https://picsum.photos/1200/750?random=503',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    year: '2024',
    client: 'Brand Aviation',
    featured: true,
    liveUrl: 'https://brandaviation.pk/',
  },
]

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug)
}

export function getProjectHref(slug: string): string {
  return `/portfolio/${slug}`
}
