'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react'
import { containerVariants, itemVariants } from '@/styles/animations'

type Post = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: number
}

export default function BlogPageContent({ posts }: { posts: Post[] }) {
  const featuredPost = posts[0]
  const secondaryPosts = posts.slice(1)

  return (
    <div className="relative min-h-screen bg-[#050508] py-24 md:py-32 overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(7,11,25,0.6),rgba(5,5,8,1))]" />
      <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#6C3DFF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Engineering <span className="bg-gradient-to-r from-[#00E5FF] via-[#4F8CFF] to-[#6C3DFF] bg-clip-text text-transparent">Journal</span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            Insights, tutorials, and strategic guides regarding modern web frameworks, cloud deployments, and SEO mechanics.
          </motion.p>
        </div>

        {/* Featured Post (Journal Split Feed) */}
        {featuredPost && (
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative rounded-2xl bg-[#070B19]/30 border border-white/[0.06] backdrop-blur-xl p-8 md:p-12 overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_15px_40px_rgba(0,229,255,0.05)]">
                
                {/* Visual Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,229,255,0.03),transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  {/* Left Column: Visual Artwork Frame */}
                  <div className="lg:col-span-5 aspect-[1.4/1] rounded-xl bg-[#050508]/80 border border-white/[0.06] p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-[#00E5FF]/20 transition-colors duration-300">
                    <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/20 z-20" />
                    <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/20 z-20" />
                    <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/20 z-20" />
                    <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/20 z-20" />
                    
                    {/* Background image if exists */}
                    {(featuredPost as any).image && (
                      <>
                        <Image
                          src={(featuredPost as any).image}
                          alt={featuredPost.title}
                          fill
                          className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 ease-in-out z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent z-10 pointer-events-none" />
                      </>
                    )}

                    <div className="flex justify-between items-start relative z-20">
                      <span className="text-[10px] font-mono text-gray-500 tracking-wider">FEATURED_JOURNAL_BLOCK</span>
                      <BookOpen size={16} className="text-[#00E5FF] opacity-65" />
                    </div>

                    <div className="flex flex-col space-y-1 relative z-20">
                      <span className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">MODULE 01</span>
                      <span className="text-xl font-bold tracking-tight text-white line-clamp-2">
                        {featuredPost.title}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Content and Metadata */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500">
                      <span className="px-2.5 py-1 rounded bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF]">
                        {featuredPost.category}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        {featuredPost.readTime} MIN READ
                      </span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white group-hover:text-[#00E5FF] transition-colors duration-300">
                      {featuredPost.title}
                    </h2>

                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {featuredPost.excerpt}
                    </p>

                    <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#00E5FF] group-hover:text-white transition-colors">
                      READ COMPLETE ARTICLE
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          </motion.div>
        )}

        {/* Secondary Posts Grid */}
        {secondaryPosts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {secondaryPosts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants} style={{ willChange: 'opacity' }} className="group">
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="relative h-full rounded-3xl border border-white/[0.08] bg-[#070B1A]/40 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-500 group-hover:border-white/[0.12] group-hover:shadow-[0_20px_60px_rgba(0,229,255,0.08)] group-hover:-translate-y-1">
                    
                    {/* Tech corner accents */}
                    <div className="absolute left-4 top-4 w-4 h-4 border-l-2 border-t-2 border-[#00E5FF]/45 rounded-tl transition-colors group-hover:border-[#00E5FF]" />
                    <div className="absolute right-4 top-4 w-4 h-4 border-r-2 border-t-2 border-[#00E5FF]/45 rounded-tr transition-colors group-hover:border-[#00E5FF]" />
                    <div className="absolute left-4 bottom-4 w-4 h-4 border-l-2 border-b-2 border-[#00E5FF]/45 rounded-bl transition-colors group-hover:border-[#00E5FF]" />
                    <div className="absolute right-4 bottom-4 w-4 h-4 border-r-2 border-b-2 border-[#00E5FF]/45 rounded-br transition-colors group-hover:border-[#00E5FF]" />

                    {/* Background radial glow */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.05),transparent_65%)] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Background Image */}
                    {(post as any).image && (
                      <>
                        <Image
                          src={(post as any).image}
                          alt={post.title}
                          fill
                          className="object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070B1A] via-[#070B1A]/80 to-transparent z-0 pointer-events-none" />
                      </>
                    )}

                    <div className="relative z-20 flex-grow space-y-4">
                      {/* Meta */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider">
                        <span>{post.category}</span>
                        <span className="flex items-center gap-1 text-zinc-500">
                          <Clock size={10} />
                          {post.readTime} MIN
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#00E5FF] transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase text-zinc-500 group-hover:text-white transition-colors">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <ArrowRight size={14} className="group-hover:text-[#00E5FF] transition-colors" />
                    </div>

                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </div>
  )
}
