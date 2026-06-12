import type { SeoFields } from './content-types'

export type SectionType =
  | 'breadcrumb'
  | 'page-header'
  | 'hero'
  | 'stats'
  | 'services-grid'
  | 'features-grid'
  | 'testimonials'
  | 'cta'
  | 'rich-text'
  | 'two-column'
  | 'faq'
  | 'contact-info'
  | 'contact-form'
  | 'founder'
  | 'image-text'
  | 'buttons'
  | 'portfolio-featured'
  | 'blog-preview'

export interface PageSection {
  id: string
  type: SectionType
  enabled: boolean
  data: Record<string, unknown>
}

export interface CmsPage extends SeoFields {
  slug: string
  path: string
  title: string
  sections: PageSection[]
}

export const SECTION_CATALOG: {
  type: SectionType
  label: string
  description: string
  category: 'layout' | 'content' | 'conversion' | 'dynamic'
}[] = [
  { type: 'breadcrumb', label: 'Breadcrumb', description: 'Navigation trail for inner pages', category: 'layout' },
  { type: 'page-header', label: 'Page Header', description: 'Title, highlight & subtitle', category: 'layout' },
  { type: 'hero', label: 'Hero Banner', description: 'Large hero with CTAs and stats', category: 'layout' },
  { type: 'stats', label: 'Stats Row', description: 'Numbers and metrics in a row', category: 'content' },
  { type: 'services-grid', label: 'Services Grid', description: 'Service cards with icons', category: 'content' },
  { type: 'features-grid', label: 'Features Grid', description: 'Benefits or feature highlights', category: 'content' },
  { type: 'testimonials', label: 'Reviews', description: 'Client testimonials and quotes', category: 'content' },
  { type: 'rich-text', label: 'Rich Text', description: 'Paragraphs and long-form content', category: 'content' },
  { type: 'two-column', label: 'Two Columns', description: 'Side-by-side cards (vision/mission)', category: 'content' },
  { type: 'image-text', label: 'Image + Text', description: 'Image beside text content', category: 'content' },
  { type: 'faq', label: 'FAQ', description: 'Frequently asked questions', category: 'content' },
  { type: 'contact-info', label: 'Contact Info', description: 'Email, phone, response time cards', category: 'content' },
  { type: 'contact-form', label: 'Contact Form', description: 'Lead capture form', category: 'conversion' },
  { type: 'buttons', label: 'Button Row', description: 'Row of call-to-action buttons', category: 'conversion' },
  { type: 'cta', label: 'CTA Banner', description: 'Call-to-action section', category: 'conversion' },
  { type: 'founder', label: 'Founder Profile', description: 'Team member or founder bio', category: 'content' },
  { type: 'portfolio-featured', label: 'Featured Portfolio', description: 'Auto-loads featured projects', category: 'dynamic' },
  { type: 'blog-preview', label: 'Blog Preview', description: 'Auto-loads latest blog posts', category: 'dynamic' },
]

function uid() {
  return `sec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
}

export function createSection(type: SectionType): PageSection {
  const defaults: Record<SectionType, Record<string, unknown>> = {
    breadcrumb: { items: [{ label: 'Home', href: '/' }, { label: 'Page', href: '#' }] },
    'page-header': { title: 'Page Title', titleHighlight: 'Highlight', subtitle: 'Add a compelling subtitle for this page.' },
    hero: {
      eyebrow: 'Welcome',
      headline: 'Build Something',
      headlineHighlight: 'Amazing',
      subtitle: 'Describe your value proposition in one or two sentences.',
      primaryCta: { label: 'Get Started', href: '/contact' },
      secondaryCta: { label: 'View Work', href: '/portfolio' },
      stats: [
        { value: '50+', label: 'Projects', icon: 'Briefcase' },
        { value: '30+', label: 'Clients', icon: 'Users' },
        { value: '5+', label: 'Years', icon: 'Award' },
      ],
    },
    stats: {
      items: [
        { value: '50+', label: 'Projects Delivered', icon: 'Briefcase' },
        { value: '100%', label: 'Client Satisfaction', icon: 'Award' },
        { value: '24/7', label: 'Support', icon: 'Clock' },
      ],
    },
    'services-grid': {
      title: 'Our Services',
      subtitle: 'What we offer',
      detailed: true,
      items: [
        {
          title: 'Web Development',
          description: 'Modern responsive websites.',
          icon: 'Code2',
          features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
          price: 'From $2,000',
          ctaLabel: 'Learn More',
          ctaHref: '/contact',
        },
      ],
    },
    'features-grid': {
      title: 'Why Choose Us',
      subtitle: 'What sets us apart',
      items: [
        { title: 'Expert Team', description: 'Experienced developers and designers.', icon: 'Users' },
        { title: 'Results Driven', description: 'Focused on measurable outcomes.', icon: 'TrendingUp' },
      ],
    },
    testimonials: {
      title: 'What Clients Say',
      subtitle: 'Trusted by businesses worldwide',
      items: [
        { name: 'Client Name', role: 'CEO, Company', content: 'Outstanding work and great communication.', avatar: '' },
      ],
    },
    cta: {
      title: 'Ready to get started?',
      description: 'Tell us about your project and we will help you plan the right solution.',
      buttonLabel: 'Contact Us',
      buttonHref: '/contact',
    },
    'rich-text': { title: 'About This Section', content: 'Write your content here.\n\nAdd multiple paragraphs separated by blank lines.' },
    'two-column': {
      columns: [
        { icon: 'Target', title: 'Our Vision', content: 'Describe your long-term vision here.' },
        { icon: 'Compass', title: 'Our Mission', content: 'Describe your mission and how you deliver value.' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [{ question: 'How can I get started?', answer: 'Contact us for a free consultation.' }],
    },
    'contact-info': {
      items: [
        { icon: '📧', title: 'Email', value: 'hello@jynoro.com' },
        { icon: '💬', title: 'WhatsApp', value: 'Quick consultation' },
        { icon: '🚀', title: 'Response Time', value: 'Within 24 hours' },
      ],
    },
    'contact-form': { title: 'Send a Message', subtitle: 'We typically respond within 24 hours.' },
    founder: {
      sectionTitle: 'Meet Our Founder',
      sectionSubtitle: 'The person behind the brand',
      name: 'Founder Name',
      role: 'Founder & CEO',
      initials: 'FN',
      bio: ['First paragraph about the founder.', 'Second paragraph with background and expertise.'],
      tags: ['Web Development', 'Strategy', 'Leadership'],
    },
    'image-text': {
      image: '/images/parallax-bg.jpg',
      alt: 'Section image',
      title: 'Section Title',
      content: 'Supporting text for this image section. Great for case studies and SEO-rich content.',
      imagePosition: 'left',
    },
    buttons: {
      align: 'center',
      items: [
        { label: 'Primary Action', href: '/contact', variant: 'primary' },
        { label: 'View Portfolio', href: '/portfolio', variant: 'secondary' },
      ],
    },
    'portfolio-featured': { title: 'Featured Work', subtitle: 'Explore our latest projects' },
    'blog-preview': { title: 'Latest From Our Blog', subtitle: 'Insights and tips' },
  }

  return { id: uid(), type, enabled: true, data: defaults[type] }
}

export function extractPageText(page: CmsPage): string {
  const parts: string[] = [page.title, page.seoTitle || '', page.seoDescription || '']

  for (const section of page.sections.filter((s) => s.enabled)) {
    const d = section.data
    switch (section.type) {
      case 'page-header':
        parts.push(String(d.title || ''), String(d.subtitle || ''))
        break
      case 'hero':
        parts.push(String(d.headline || ''), String(d.subtitle || ''))
        break
      case 'rich-text':
        parts.push(String(d.title || ''), String(d.content || ''))
        break
      case 'services-grid':
      case 'features-grid':
        parts.push(String(d.title || ''), String(d.subtitle || ''))
        for (const item of (d.items as { title?: string; description?: string; features?: string[] }[]) || []) {
          parts.push(item.title || '', item.description || '', ...(item.features || []))
        }
        break
      case 'testimonials':
        for (const item of (d.items as { content?: string }[]) || []) parts.push(item.content || '')
        break
      case 'faq':
        for (const item of (d.items as { question?: string; answer?: string }[]) || []) {
          parts.push(item.question || '', item.answer || '')
        }
        break
      case 'two-column':
        for (const col of (d.columns as { title?: string; content?: string }[]) || []) {
          parts.push(col.title || '', col.content || '')
        }
        break
      case 'founder':
        parts.push(String(d.name || ''), ...(d.bio as string[] || []))
        break
      case 'image-text':
        parts.push(String(d.title || ''), String(d.content || ''), String(d.alt || ''))
        break
      default:
        break
    }
  }

  return parts.filter(Boolean).join('\n')
}

export function countPageImages(page: CmsPage): number {
  let count = 0
  for (const section of page.sections.filter((s) => s.enabled)) {
    if (section.type === 'image-text' && section.data.image) count++
    if (section.type === 'founder') count++
    if (section.type === 'testimonials') {
      count += ((section.data.items as { avatar?: string }[]) || []).filter((i) => i.avatar).length
    }
  }
  return count
}
