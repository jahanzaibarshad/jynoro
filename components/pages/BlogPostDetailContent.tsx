'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2 } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import type { BlogPost } from '@/lib/content-types'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING } from '@/lib/utils'

interface BlogPostDetailContentProps {
  post: BlogPost
}

export default function BlogPostDetailContent({ post }: BlogPostDetailContentProps) {
  const paragraphs = post.content.split('\n\n').filter(Boolean)

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
            {post.featured && <Badge variant="secondary">Featured</Badge>}
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
          className={`prose prose-invert max-w-none ${SECTION_BODY} text-gray-300 space-y-4`}
          style={{ willChange: 'opacity' }}
        >
          <p className="text-lg text-gray-400">{post.excerpt}</p>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
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
