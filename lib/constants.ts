export const PARALLAX_BG_IMAGE = '/images/why-jynoro-bg.webp'

// Brand Colors
export const COLORS = {
  primary: '#4F8CFF',
  accent: '#00E5FF',
  violet: '#6C3DFF',
  teal: '#00E6B8',
  background: '#070B1A',
  midnight: '#101832',
  card: '#121A30',
  text: '#FFFFFF',
  textSecondary: '#AAB3C5',
  border: 'rgba(255, 255, 255, 0.08)',
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
    title: 'Full-Stack Development',
    description: 'Modern, responsive websites built with cutting-edge technologies. Perfect for startups and established businesses.',
    icon: 'Code2',
  },
  {
    id: 2,
    title: 'Agentic AI & Automation',
    description: 'Intelligent AI agents and automated workflows designed to scale operations and eliminate manual tasks.',
    icon: 'Zap',
  },
  {
    id: 3,
    title: 'Full-Spectrum SEO Strategies',
    description: 'Comprehensive Technical, On-Page, and Off-Page SEO to dominate search rankings and drive organic growth.',
    icon: 'Search',
  },
  {
    id: 4,
    title: 'Maintenance & Support',
    description: 'Ongoing support, updates, and improvements to keep your digital presence running smoothly.',
    icon: 'Shield',
  },
  {
    id: 5,
    title: 'Graphic Design',
    description: 'Clean brand visuals, social creatives, and web graphics that make your business look premium.',
    icon: 'Palette',
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
  { name: 'Facebook', url: 'https://www.facebook.com/share/18i2H9Jmx1/?mibextid=wwXIfr', icon: 'Facebook' },
  { name: 'Instagram', url: 'https://www.instagram.com/thejynoro', icon: 'Instagram' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/jynoro', icon: 'Linkedin' },
  { name: 'Email', url: 'mailto:info@jynoro.com', icon: 'Mail' },
  { name: 'WhatsApp', url: 'https://wa.me/923361058649', icon: 'MessageSquare' },
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
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}
