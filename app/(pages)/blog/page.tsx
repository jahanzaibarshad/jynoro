import type { Metadata } from 'next'
import BlogPageContent from '@/components/pages/BlogPageContent'

export const metadata: Metadata = {
  title: 'Blog | Jynoro',
  description:
    'Read our latest articles on web development, digital marketing, and business growth strategies.',
  keywords: 'blog, web development, digital marketing, tutorials, guides',
  openGraph: {
    title: 'Blog | Jynoro',
    description: 'Read our latest articles on web development and digital strategy.',
    type: 'website',
    url: 'https://jynoro.com/blog',
    images: [
      {
        url: 'https://picsum.photos/1200/630?random=102',
        width: 1200,
        height: 630,
        alt: 'Jynoro Blog',
      },
    ],
  },
}

const samplePosts = [
  {
    slug: 'modern-web-development-2024',
    title: 'The Complete Guide to Modern Web Development in 2024',
    excerpt:
      'Explore the latest technologies and best practices for building fast, secure, and scalable web applications in 2024.',
    category: 'Web Development',
    date: 'Jan 15, 2024',
    readTime: 8,
  },
  {
    slug: 'high-converting-landing-pages',
    title: '10 Tips for Building High-Converting Landing Pages',
    excerpt:
      'Learn the proven strategies to create landing pages that convert visitors into customers and boost your business growth.',
    category: 'Marketing',
    date: 'Jan 10, 2024',
    readTime: 6,
  },
  {
    slug: 'responsive-design-essential',
    title: 'Why Responsive Design is Essential for Your Business',
    excerpt:
      "Discover why responsive design isn't just a nice-to-have feature but a critical requirement for modern web applications.",
    category: 'Web Design',
    date: 'Jan 5, 2024',
    readTime: 5,
  },
]

export default function BlogPage() {
  return <BlogPageContent posts={samplePosts} />
}
