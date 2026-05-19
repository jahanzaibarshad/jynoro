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
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 1,
    slug: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'Full-stack e-commerce platform with payment integration',
    longDescription:
      'A modern e-commerce experience built for scale — product catalog, secure checkout, order management, and an admin dashboard designed for day-to-day operations. Replace this copy with your final case study when ready.',
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
      'A data-rich SaaS dashboard with real-time metrics, user management, and role-based access. Sample screenshots below — swap images and text with your production case study content later.',
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
    id: 3,
    slug: 'seo-blog-platform',
    title: 'SEO Blog Platform',
    category: 'SEO Optimized',
    description: 'High-ranking content management system',
    longDescription:
      'Content platform optimized for search performance — fast pages, structured metadata, and a CMS workflow built for publishing teams. Update this section with your SEO results and content strategy.',
    highlights: [
      'Technical SEO foundations',
      'MDX content workflow',
      'Core Web Vitals focused',
    ],
    image: '/images/projects/project-3.svg',
    gallery: [
      'https://picsum.photos/1200/750?random=301',
      'https://picsum.photos/1200/750?random=302',
      'https://picsum.photos/1200/750?random=303',
      'https://picsum.photos/1200/750?random=304',
    ],
    technologies: ['Next.js', 'Contentlayer', 'Tailwind CSS'],
    year: '2023',
    client: 'Media Brand',
  },
  {
    id: 4,
    slug: 'mobile-app-website',
    title: 'Mobile App Website',
    category: 'Web Development',
    description: 'Landing page for iOS and Android app',
    longDescription:
      'High-converting marketing site for a mobile app launch — clear value proposition, app store CTAs, and social proof sections. Replace gallery images with your app screens and brand assets.',
    highlights: [
      'App store conversion CTAs',
      'Feature showcase sections',
      'Mobile-first layout',
    ],
    image: '/images/projects/project-4.svg',
    gallery: [
      'https://picsum.photos/1200/750?random=401',
      'https://picsum.photos/1200/750?random=402',
      'https://picsum.photos/1200/750?random=403',
    ],
    technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    year: '2024',
    client: 'App Studio',
  },
  {
    id: 5,
    slug: 'agency-website',
    title: 'Agency Website',
    category: 'Web Development',
    description: 'Modern portfolio site for creative agency',
    longDescription:
      'Brand-forward agency website with portfolio filtering, team highlights, and lead capture. Use this template section to describe your creative direction and delivery process.',
    highlights: [
      'Portfolio case study grid',
      'Service pages architecture',
      'Contact funnel optimization',
    ],
    image: '/images/projects/project-5.svg',
    gallery: [
      'https://picsum.photos/1200/750?random=501',
      'https://picsum.photos/1200/750?random=502',
      'https://picsum.photos/1200/750?random=503',
      'https://picsum.photos/1200/750?random=504',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    year: '2023',
    client: 'Creative Agency',
  },
  {
    id: 6,
    slug: 'saas-startup',
    title: 'SaaS Startup',
    category: 'Custom Web App',
    description: 'Complete solution for no-code platform',
    longDescription:
      'End-to-end web platform for a SaaS startup — marketing site, onboarding flow, and product landing pages. Add your metrics, screenshots, and stack details when the case study is finalized.',
    highlights: [
      'Multi-page marketing funnel',
      'Pricing and signup flows',
      'Scalable component system',
    ],
    image: '/images/projects/project-6.svg',
    gallery: [
      'https://picsum.photos/1200/750?random=601',
      'https://picsum.photos/1200/750?random=602',
      'https://picsum.photos/1200/750?random=603',
    ],
    technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
    year: '2024',
    client: 'Startup Founder',
  },
]

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug)
}

export function getProjectHref(slug: string): string {
  return `/portfolio/${slug}`
}
