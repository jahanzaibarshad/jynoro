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

// Portfolio — dynamic data in data/portfolio.json via lib/data-store.ts
export { getProjectHref } from '@/lib/content-types'

// Fiverr client reviews (5-star)
export const TESTIMONIALS = [
  {
    name: 'Andrew',
    role: 'United States · Full Stack Web App',
    content: 'Great to work with. Clean build, fast turnaround, and very responsive. Would hire again.',
  },
  {
    name: 'Maverick',
    role: 'United States · Full Stack Web App',
    content:
      'Converted a Canva template to JSX saving me time to focus on core architecture. Thank you!',
  },
  {
    name: 'Vale',
    role: 'United States · Full Stack Web App',
    content:
      'The quality of the work delivered was outstanding. The attention to detail and expertise truly exceeded my expectations. I highly recommend Jahanzaib to anyone seeking top-notch web design services.',
  },
  {
    name: 'Lucian',
    role: 'United States · Full Stack Web App',
    content:
      'Very excellent website. I am very happy to work with this seller. Good communication with very fast delivery. I recommend you to work with this seller. Thanks!',
  },
  {
    name: 'Design Zone',
    role: 'United States · Cross-Platform Development',
    content:
      'Overall, I am very happy. Communication was great! I will use the services again. Thank you.',
  },
  {
    name: 'Kay',
    role: 'Australia · Cross-Platform Development',
    content:
      'This seller is great to work with and has talent. I can wholeheartedly recommend them for work, and I will certainly use their services again. They are always willing to help and respond promptly.',
  },
  {
    name: 'Judith',
    role: 'United Kingdom · WooCommerce',
    content: 'Delivery on time and delivered a great looking website.',
  },
  {
    name: 'Vinay',
    role: 'India · Full Stack Web App',
    content: 'Nice work!',
  },
  {
    name: 'Dharam',
    role: 'India · Cross-Platform Development',
    content: 'Thanks for your fast delivery.',
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
