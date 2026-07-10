import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostDetailContent from '@/components/pages/BlogPostDetailContent'
import { readBlogPosts } from '@/lib/data-store'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await readBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const posts = await readBlogPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return { title: 'Post Not Found | Jynoro' }
  }

  const seoTitle = post.seoTitle || post.title
  const seoDescription = post.seoDescription || post.excerpt

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      post.focusKeyword || '',
      post.category || '',
      'jynoro blog',
      'web development',
      'ai agents',
      'full stack development',
    ].filter(Boolean),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      url: `https://jynoro.com/blog/${post.slug}`,
      images: post.image ? [{ url: `https://jynoro.com${post.image}`, width: 1200, height: 630, alt: seoTitle }] : undefined,
      publishedTime: post.date,
      authors: ['Jynoro Engineering'],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: post.image ? [`https://jynoro.com${post.image}`] : undefined,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const posts = await readBlogPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return <BlogPostDetailContent post={post} />
}
