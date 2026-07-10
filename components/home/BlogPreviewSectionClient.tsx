'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import GlowOrb from '@/components/ui/GlowOrb'
import { useMagneticButton } from '@/lib/hooks'
import type { BlogPost } from '@/lib/content-types'
import { containerVariants, itemVariants } from '@/styles/animations'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, SECTION_CTA } from '@/lib/utils'

interface BlogPreviewSectionClientProps {
  posts: BlogPost[]
}

export default function BlogPreviewSectionClient({ posts }: BlogPreviewSectionClientProps) {
  const previewPosts = posts.slice(0, 3)
  const featuredPost = previewPosts[0]
  const secondaryPosts = previewPosts.slice(1)
  const btnRef = useRef<HTMLDivElement>(null)
  useMagneticButton(btnRef, 25)

  return (
    <section className={`${SECTION_CLASS} bg-gradient-to-b from-[#050508] via-[#09112b] to-[#070b19] overflow-hidden`}>
      {/* Background glowing elements */}
      <GlowOrb size="md" color="indigo" className="absolute -left-24 top-[15%] opacity-20" />
      <GlowOrb size="md" color="cyan" className="absolute -right-24 bottom-[15%] opacity-15" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.04),transparent_60%)]" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold ${SECTION_HEADING} text-white`}>
            Latest From Our{' '}
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>
          <p className={`text-zinc-300 text-lg max-w-2xl mx-auto ${SECTION_BODY}`}>
            Insights, tips, and best practices for web development and business growth
          </p>
        </motion.div>

        {/* Featured Post Highlight Card */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-8"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="group block relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070B1A]/40 transition-all duration-300 hover:border-[#00E5FF]/45 hover:shadow-[0_20px_50px_rgba(0,229,255,0.02)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-6 relative aspect-[16/10] lg:aspect-auto min-h-[280px] overflow-hidden bg-[#050508]/80">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-[#00E5FF]/15 z-0 pointer-events-none" />
                  
                  {featuredPost.image ? (
                    <>
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 ease-in-out z-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#070B1A] z-10 pointer-events-none hidden lg:block" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070B1A] via-transparent to-transparent z-10 pointer-events-none lg:hidden" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,229,255,0.15),transparent_60%)] z-0" />
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 z-0" />
                      <div className="absolute inset-0 flex items-center justify-center text-[#00E5FF]/40 font-mono text-[11px] uppercase tracking-[0.2em] border border-white/[0.03] z-10 m-8 rounded-xl bg-[#050508]/40">
                        Technical Journal // {featuredPost.category}
                      </div>
                    </>
                  )}
                </div>
                
                <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-3 py-1 text-xs font-semibold text-[#00E5FF] backdrop-blur-md">
                      Featured Article
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">{featuredPost.date}</span>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-5 border-t border-white/[0.06] text-xs text-zinc-400 mt-2">
                    <span>{featuredPost.readTime} min read</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-[#00E5FF] group-hover:gap-2.5 transition-all">
                      Read Article
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Secondary Posts Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ transform: 'translateZ(0)' }}
        >
          {secondaryPosts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants} style={{ willChange: 'opacity' }}>
              <Link href={`/blog/${post.slug}`}>
                <BlogCard post={post} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`flex justify-center pt-8 ${SECTION_CTA}`}
          style={{ willChange: 'opacity' }}
        >
          <div ref={btnRef} className="inline-flex">
            <Link href="/blog" className="inline-flex">
              <Button variant="outline" size="lg">
                View All Articles
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BlogCard({ post }: { post: BlogPost }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect()
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    rectRef.current = null
    setIsHovered(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect()
    }
    const rect = rectRef.current
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer group relative flex h-full flex-col rounded-3xl border border-white/[0.08] bg-[#070B1A]/40 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_20px_60px_rgba(0,229,255,0.08)] hover:-translate-y-1 backdrop-blur-xl overflow-hidden justify-between"
    >
      {/* Tech corner accents */}
      <div className="absolute left-4 top-4 w-4 h-4 border-l-2 border-t-2 border-[#00E5FF]/45 rounded-tl transition-colors group-hover:border-[#00E5FF]" />
      <div className="absolute right-4 top-4 w-4 h-4 border-r-2 border-t-2 border-[#00E5FF]/45 rounded-tr transition-colors group-hover:border-[#00E5FF]" />
      <div className="absolute left-4 bottom-4 w-4 h-4 border-l-2 border-b-2 border-[#00E5FF]/45 rounded-bl transition-colors group-hover:border-[#00E5FF]" />
      <div className="absolute right-4 bottom-4 w-4 h-4 border-r-2 border-b-2 border-[#00E5FF]/45 rounded-br transition-colors group-hover:border-[#00E5FF]" />

      {/* Interactive cursor tracking glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 255, 0.08), transparent 85%)`,
        }}
      />
      
      {/* Fallback ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.03),transparent_65%)] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Background Image */}
      {post.image && (
        <>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B1A] via-[#070B1A]/80 to-transparent z-0 pointer-events-none" />
        </>
      )}

      <div className="relative flex flex-col h-full z-10 flex-grow">
        <div className="flex justify-between items-start mb-4 gap-2">
          <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider">{post.category}</span>
          {post.featured && <Badge variant="secondary">Featured</Badge>}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#00E5FF] transition-colors duration-300 tracking-tight">
          {post.title}
        </h3>
        
        <p className="text-sm text-zinc-300 line-clamp-3 mb-6 flex-grow leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between text-xs font-mono text-zinc-500 border-t border-white/[0.06] pt-5">
          <span>{post.date}</span>
          <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-white group-hover:text-[#00E5FF] transition-colors">
            Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  )
}
