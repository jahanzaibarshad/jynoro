'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import type { BlogPost } from '@/lib/content-types'
import { containerVariants, itemVariants } from '@/styles/animations'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, SECTION_CTA, CARD_GRID } from '@/lib/utils'

interface BlogPreviewSectionClientProps {
  posts: BlogPost[]
}

export default function BlogPreviewSectionClient({ posts }: BlogPreviewSectionClientProps) {
  const previewPosts = posts.slice(0, 3)

  return (
    <section className={SECTION_CLASS}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold ${SECTION_HEADING}`}>
            Latest From Our{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className={`text-gray-400 text-lg max-w-2xl mx-auto ${SECTION_BODY}`}>
            Insights, tips, and best practices for web development and business growth
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={CARD_GRID}
          style={{ transform: 'translateZ(0)' }}
        >
          {previewPosts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants} style={{ willChange: 'opacity' }}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="cursor-pointer group">
                  <motion.div className="flex justify-between items-start mb-4 gap-2">
                    <Badge variant="primary">{post.category}</Badge>
                    {post.featured && <Badge variant="secondary">Featured</Badge>}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="border-t border-slate-700/50 pt-4 flex items-center justify-between text-xs text-gray-500">
                    <div>{post.date}</div>
                    <motion.div className="flex items-center gap-1">
                      {post.readTime} min read
                      <ArrowRight size={14} className="text-cyan-400" />
                    </motion.div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`flex justify-center pt-4 ${SECTION_CTA}`}
          style={{ willChange: 'opacity' }}
        >
          <Link href="/blog" className="inline-flex">
            <Button variant="primary" size="lg">
              View All Articles
              <ArrowRight size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
