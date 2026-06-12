import type { Metadata } from 'next'
import BlogPageContent from '@/components/pages/BlogPageContent'
import { readBlogPosts } from '@/lib/data-store'

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

export default async function BlogPage() {
  const posts = await readBlogPosts()
  return <BlogPageContent posts={posts} />
}
