export const PARALLAX_BG_IMAGE = '/images/parallax-bg.jpg'

// Brand Colors
export const COLORS = {
  primary: '#4F46E5', // Indigo
  accent: '#06B6D4', // Cyan
  background: '#0F172A',
  card: '#1E2937',
  text: '#FFFFFF',
  textSecondary: '#E2E8F0',
  border: '#334155',
} as const

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
]

// Services
export const SERVICES = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Modern, responsive websites built with cutting-edge technologies. Perfect for startups and established businesses.',
    icon: 'Code2',
  },
  {
    id: 2,
    title: 'Custom Web Apps',
    description: 'Tailored solutions for complex business needs. From SaaS platforms to enterprise applications.',
    icon: 'Zap',
  },
  {
    id: 3,
    title: 'SEO Optimized Sites',
    description: 'Rank higher on search engines with our SEO-first approach and performance optimization.',
    icon: 'Search',
  },
  {
    id: 4,
    title: 'Maintenance & Support',
    description: 'Ongoing support, updates, and improvements to keep your digital presence running smoothly.',
    icon: 'Shield',
  },
]

// Why Jynoro
export const WHY_JYNORO = [
  {
    title: 'Expert Team',
    description: 'Years of experience in building scalable digital solutions',
    icon: 'Users',
  },
  {
    title: 'Results Driven',
    description: 'Focus on measurable business outcomes and lead generation',
    icon: 'TrendingUp',
  },
  {
    title: 'Modern Tech Stack',
    description: 'Latest technologies and best practices for optimal performance',
    icon: 'Lightbulb',
  },
  {
    title: '24/7 Support',
    description: 'Always available to support your business growth',
    icon: 'Clock',
  },
]

// Portfolio Projects — full data in lib/portfolio-data.ts
export { PORTFOLIO_PROJECTS, getProjectBySlug, getProjectHref } from '@/lib/portfolio-data'

// Testimonials
export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechStart Inc',
    content: 'Jynoro transformed our digital presence. Within 3 months, we saw a 250% increase in leads.',
    avatar: 'https://picsum.photos/64/64?random=10',
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Director, Growth Co',
    content: 'Professional team, exceptional results. They understand both business and technology.',
    avatar: 'https://picsum.photos/64/64?random=11',
  },
  {
    name: 'Emma Davis',
    role: 'Founder, Creative Studios',
    content: 'Best investment we made for our online business. Highly recommended!',
    avatar: 'https://picsum.photos/64/64?random=12',
  },
  {
    name: 'David Wilson',
    role: 'Owner, E-Commerce Store',
    content: 'The team at Jynoro exceeded all expectations. Outstanding technical expertise and support.',
    avatar: 'https://picsum.photos/64/64?random=13',
  },
]

// Social Links
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: '#', icon: 'Linkedin' },
  { name: 'Twitter', url: '#', icon: 'Twitter' },
  { name: 'Email', url: '#', icon: 'Mail' },
]

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
}
