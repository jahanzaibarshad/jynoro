'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Briefcase, ExternalLink, Star, BadgeCheck } from 'lucide-react'
import SectionCta from '@/components/ui/SectionCta'
import type { PortfolioProject } from '@/lib/content-types'
import { containerVariants, itemVariants } from '@/styles/animations'

const PORTFOLIO_STATS = [
  {
    icon: Briefcase,
    value: '50+',
    label: 'Projects Completed',
    percentage: 92,
    gradient: 'from-[#00E5FF] to-[#4F8CFF]',
    color: '#00E5FF',
  },
  {
    icon: Star,
    value: '30+',
    label: 'Happy Clients',
    percentage: 96,
    gradient: 'from-[#6C3DFF] to-[#4F8CFF]',
    color: '#6C3DFF',
  },
  {
    icon: BadgeCheck,
    value: '100%',
    label: 'Client Satisfaction',
    percentage: 100,
    gradient: 'from-[#00E5FF] to-[#00E6B8]',
    color: '#00E6B8',
  },
] as const

interface PortfolioPageContentProps {
  projects: PortfolioProject[]
}

export default function PortfolioPageContent({ projects }: PortfolioPageContentProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050508] py-20 md:py-32">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(7,11,25,0.7),rgba(5,5,8,1))]" />
      <div className="absolute top-[30%] right-[-10%] w-[35%] h-[35%] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#6C3DFF]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-24">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Our <span className="bg-gradient-to-r from-[#00E5FF] via-[#4F8CFF] to-[#6C3DFF] bg-clip-text text-transparent">Portfolio</span>
          </motion.h1>
          <motion.p
            className="text-base leading-relaxed text-gray-400 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            Showcase of successful projects we&apos;ve delivered for clients across various industries, engineered for optimal business results.
          </motion.p>
        </div>

        {/* Project Showcase Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20 grid grid-cols-1 gap-6 md:mb-28 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {projects.map((project) => {
            const cardContent = (
              <>
                {/* Widescreen Browser Mockup Card */}
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070B1A]/40 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-500 group-hover:border-white/[0.12] group-hover:shadow-[0_20px_60px_rgba(0,229,255,0.08)] group-hover:-translate-y-1 sm:p-6 md:p-8">
                  
                  {/* Tech corner accents */}
                  <div className="absolute left-4 top-4 w-4 h-4 border-l-2 border-t-2 border-[#00E5FF]/45 rounded-tl transition-colors group-hover:border-[#00E5FF]" />
                  <div className="absolute right-4 top-4 w-4 h-4 border-r-2 border-t-2 border-[#00E5FF]/45 rounded-tr transition-colors group-hover:border-[#00E5FF]" />
                  <div className="absolute left-4 bottom-4 w-4 h-4 border-l-2 border-b-2 border-[#00E5FF]/45 rounded-bl transition-colors group-hover:border-[#00E5FF]" />
                  <div className="absolute right-4 bottom-4 w-4 h-4 border-r-2 border-b-2 border-[#00E5FF]/45 rounded-br transition-colors group-hover:border-[#00E5FF]" />

                  {/* Background radial glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.05),transparent_65%)] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Project Image */}
                  <div className="relative z-10 -mx-5 -mt-5 mb-5 h-52 overflow-hidden rounded-t-3xl border-b border-white/[0.06] sm:-mx-6 sm:-mt-6 md:-mx-8 md:-mt-8 md:mb-6 md:h-56">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B1A] via-[#070B1A]/30 to-transparent pointer-events-none" />
                  </div>

                  {/* Details */}
                  <div className="relative z-10 flex-grow flex flex-col">
                    <h3 className="mb-2 text-2xl font-bold tracking-tight text-white group-hover:text-[#00E5FF] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#00E5FF] uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span className="inline-flex shrink-0 items-center gap-1.5 text-right text-[10px] font-mono font-bold uppercase tracking-wider text-white transition-colors group-hover:text-[#00E5FF] sm:text-xs">
                        {project.liveUrl ? 'View Website' : 'Project Snapshot'}
                        {project.liveUrl && <ExternalLink size={14} strokeWidth={2.5} />}
                      </span>
                    </div>
                  </div>

                </div>
              </>
            )

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group"
                style={{ willChange: 'opacity' }}
              >
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {cardContent}
                  </a>
                ) : (
                  <div className="block h-full">{cardContent}</div>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Custom Dashboard Stats Widgets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-28"
        >
          {PORTFOLIO_STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="relative rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-6 backdrop-blur-md overflow-hidden group"
              >
                {/* Visual Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.03),transparent_50%)]" />

                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  {/* Circular Dial Gauge */}
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-white/5"
                        strokeWidth="7"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={stat.color}
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        whileInView={{ strokeDashoffset: 251.2 - (251.2 * stat.percentage) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Icon className="h-5 w-5 text-gray-400 mb-0.5 group-hover:text-white transition-colors" />
                      <span className="text-xl font-bold text-white tracking-tight">{stat.value}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-tight">{stat.label}</h4>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-1">Verified Stat</p>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionCta
            title="Ready to Start Your Project?"
            description="Let us create something amazing for your business."
            buttonLabel="Get Your Free Consultation"
          />
        </motion.div>
      </div>
    </div>
  )
}
