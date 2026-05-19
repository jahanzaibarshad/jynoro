'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { containerVariants, itemVariants } from '@/styles/animations'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, CARD_GRID } from '@/lib/utils'

type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: number
}

export default function BlogPageContent({ posts }: { posts: Post[] }) {
  return (
    <motion.div
      className={SECTION_CLASS}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center">
          <h1 className={`text-5xl md:text-6xl font-bold ${SECTION_HEADING}`}>
            Our <span className="text-gradient">Blog</span>
          </h1>
          <p className={`text-xl text-gray-400 max-w-2xl mx-auto ${SECTION_BODY}`}>
            Insights, tips, and best practices for web development and business growth
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={CARD_GRID}
          style={{ transform: 'translateZ(0)' }}
        >
          {posts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants} style={{ willChange: 'opacity' }}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="cursor-pointer group">
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <Badge variant="primary">{post.category}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <motion.div className="border-t border-slate-700/50 pt-4 flex items-center justify-between text-xs text-gray-500">
                    <div>{post.date}</div>
                    <span>{post.readTime} min read</span>
                  </motion.div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
