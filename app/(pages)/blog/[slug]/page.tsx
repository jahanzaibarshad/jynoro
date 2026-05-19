'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING } from '@/lib/utils'

interface BlogPost {
  title: string
  category: string
  date: string
  readTime: number
  excerpt: string
}

const blogPosts: Record<string, BlogPost> = {
  'modern-web-development-2024': {
    title: 'The Complete Guide to Modern Web Development in 2024',
    category: 'Web Development',
    date: 'Jan 15, 2024',
    readTime: 8,
    excerpt:
      'Explore the latest technologies and best practices for building fast, secure, and scalable web applications in 2024.',
  },
  'high-converting-landing-pages': {
    title: '10 Tips for Building High-Converting Landing Pages',
    category: 'Marketing',
    date: 'Jan 10, 2024',
    readTime: 6,
    excerpt:
      'Learn the proven strategies to create landing pages that convert visitors into customers and boost your business growth.',
  },
  'responsive-design-essential': {
    title: 'Why Responsive Design is Essential for Your Business',
    category: 'Web Design',
    date: 'Jan 5, 2024',
    readTime: 5,
    excerpt:
      "Discover why responsive design isn't just a nice-to-have feature but a critical requirement for modern web applications.",
  },
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <motion.div
        className={`${SECTION_CLASS} text-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ willChange: 'opacity' }}
      >
        <h1 className={`text-3xl font-bold ${SECTION_HEADING}`}>Post Not Found</h1>
        <Link href="/blog">
          <Button variant="primary">Back to Blog</Button>
        </Link>
      </motion.div>
    )
  }

  return (
    <article className={SECTION_CLASS}>
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={SECTION_BODY}
          style={{ willChange: 'opacity' }}
        >
          <Link href="/blog" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={SECTION_BODY}
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <div className="flex gap-2 mb-4">
            <Badge variant="primary">{post.category}</Badge>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold ${SECTION_HEADING} leading-tight`}>{post.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm mb-8 pb-8 border-b border-slate-700/50">
            <span>{post.date}</span>
            <span>{post.readTime} min read</span>
            <button
              type="button"
              className="ml-auto p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <Share2 size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          className={`prose prose-invert max-w-none ${SECTION_BODY} text-gray-300`}
          style={{ willChange: 'opacity' }}
        >
          <p>{post.excerpt}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="border-t border-slate-700/50 pt-12"
          style={{ willChange: 'opacity' }}
        >
          <div className="rounded-2xl p-6 md:p-8 bg-slate-800/50 backdrop-blur border border-slate-700/50">
            <h3 className={`text-xl font-bold ${SECTION_HEADING}`}>Want to discuss this with us?</h3>
            <p className={`text-gray-400 ${SECTION_BODY}`}>
              Get in touch for a free consultation about your web development needs.
            </p>
            <Link href="/contact">
              <Button variant="primary">Contact Us</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  )
}
