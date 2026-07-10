import type { Metadata } from 'next'
import BlogPageContent from '@/components/pages/BlogPageContent'
import { readBlogPosts } from '@/lib/data-store'

export const metadata: Metadata = {
  title: 'Blog — AI, Web Development & Full Stack Engineering Insights',
  description:
    'Read the latest insights on autonomous AI agents, generative UI design, full stack web development, RAG vs fine-tuning, LLM-powered architectures, and the future of digital design from the Jynoro engineering team.',
  keywords: [
    'ai blog',
    'web development blog',
    'full stack development articles',
    'ai agents news',
    'autonomous ai agents',
    'generative ui design',
    'rag vs fine tuning',
    'llm web architecture',
    'headless cms ai',
    'ai digital employees',
    'graphic design ai',
    'next.js tutorials',
    'react development guides',
    'tech blog 2026',
    'ai news latest',
    'web development trends',
  ],
  openGraph: {
    title: 'Blog — AI, Web Development & Full Stack Engineering Insights | Jynoro',
    description: 'Read the latest insights on AI agents, web development, and full stack engineering from the Jynoro team.',
    type: 'website',
    url: 'https://jynoro.com/blog',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const posts = await readBlogPosts()
  return <BlogPageContent posts={posts} />
}
