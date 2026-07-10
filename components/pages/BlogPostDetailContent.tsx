'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowLeft, Share2, Calendar, Clock, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import type { BlogPost } from '@/lib/content-types'

interface BlogPostDetailContentProps {
  post: BlogPost
}

export default function BlogPostDetailContent({ post }: BlogPostDetailContentProps) {
  const paragraphs = post.content.split('\n\n').filter(Boolean)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <article className="relative min-h-screen bg-[#050508] py-24 md:py-32 overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(7,11,25,0.6),rgba(5,5,8,1))]" />
      <div className="absolute top-[15%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#6C3DFF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Back Button */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-[#00E5FF] transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>BACK_TO_JOURNAL</span>
          </Link>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-2.5 py-1 text-xs font-mono rounded bg-white/[0.04] border border-white/[0.06] text-gray-400">
            {post.category}
          </span>
          {post.featured && (
            <span className="px-2.5 py-1 text-xs font-mono rounded bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF]">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Cover Image */}
        {(post as any).image && (
          <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1] mb-12 rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl">
            <Image
              src={(post as any).image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* HUD Toolbar */}
        <div className="flex items-center justify-between gap-6 border-b border-white/[0.05] pb-8 mb-12 text-sm text-gray-500 font-mono">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-gray-600" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-gray-600" />
              {post.readTime} MIN READ
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="group flex items-center justify-center w-9 h-9 rounded-full bg-[#070B19]/80 border border-white/[0.06] text-gray-400 hover:text-[#00E5FF] transition-all duration-300 hover:border-[#00E5FF]/30"
            aria-label="Share post"
          >
            <Share2 size={15} className="transition-transform group-hover:scale-105" />
          </button>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none text-gray-300 space-y-6 leading-relaxed text-base md:text-lg mb-16">
          <p className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed border-l-2 border-[#00E5FF]/40 pl-4 py-1 mb-8">
            {post.excerpt}
          </p>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-gray-300/90 hover:text-white transition-colors duration-250">
              {paragraph}
            </p>
          ))}
        </div>

        {/* High-Fidelity Author Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-8 backdrop-blur-md overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.04),transparent_50%)]" />
          
          <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
            {/* Visual Icon Badge */}
            <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00E5FF]/20 bg-[#00E5FF]/10 text-[#00E5FF] shadow-[0_8px_24px_rgba(0,229,255,0.08)]">
              <Sparkles className="h-6 w-6" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">Jynoro Engineering Group</h3>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">RESEARCH & DEPLOYMENT TEAM</p>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">
                We design premium web interfaces and deploy optimized digital assets. Contact us to audit your existing system or build custom, high-speed architectures.
              </p>

              <div className="pt-2">
                <Link href="/contact">
                  <Button variant="primary" className="shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                    Consult with Engineers
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </article>
  )
}
