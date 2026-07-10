'use client'

import type { CSSProperties } from 'react'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import type { PortfolioProject } from '@/lib/content-types'
import { containerVariants, itemVariants } from '@/styles/animations'
import Button from '@/components/ui/Button'
import GlowOrb from '@/components/ui/GlowOrb'
import { useMagneticButton } from '@/lib/hooks'
import { SECTION_BODY, SECTION_CLASS, SECTION_HEADING } from '@/lib/utils'

interface PortfolioSectionClientProps {
  projects: PortfolioProject[]
}

const accents = [
  { color: '#00E5FF', glow: 'rgba(0, 229, 255, 0.15)' }, // Vibrant Cyan
  { color: '#6C3DFF', glow: 'rgba(108, 61, 255, 0.12)' }, // Neon Purple
  { color: '#00E6B8', glow: 'rgba(0, 230, 184, 0.12)' }, // Tech Teal/Emerald
  { color: '#4F8CFF', glow: 'rgba(79, 140, 255, 0.15)' }, // Tech Blue
]

export default function PortfolioSectionClient({ projects }: PortfolioSectionClientProps) {
  const btnRef = useRef<HTMLDivElement>(null)
  useMagneticButton(btnRef, 25)

  return (
    <section id="portfolio" className={`${SECTION_CLASS} bg-gradient-to-b from-[#070b19] via-[#050508] to-[#050508] overflow-hidden`}>
      {/* Premium background glowing elements */}
      <GlowOrb size="lg" color="cyan" className="absolute -left-48 top-[20%] opacity-35" />
      <GlowOrb size="lg" color="purple" className="absolute -right-48 bottom-[10%] opacity-25" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_14%,rgba(0, 229, 255, 0.08),transparent_35%),radial-gradient(circle_at_90%_18%,rgba(108, 61, 255, 0.08),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-[#050508]/60 px-3 py-2 text-xs font-semibold text-[#00E5FF] shadow-none backdrop-blur-md sm:px-4 sm:text-sm">
              <Sparkles className="h-4 w-4 shrink-0 text-[#00E5FF]" />
              Selected work
            </div>
            <h2 className={`text-4xl font-bold tracking-tight text-white md:text-6xl ${SECTION_HEADING}`}>
              Featured Work
            </h2>
            <p className={`max-w-2xl text-lg leading-8 text-zinc-300 ${SECTION_BODY}`}>
              Premium websites and digital systems crafted for clarity, conversion, and long-term growth.
            </p>
          </div>

          <div ref={btnRef} className="inline-flex md:mb-8">
            <Link href="/portfolio" className="inline-flex w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full justify-center sm:w-auto">
                View All Projects
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col gap-16 md:gap-28 lg:gap-36"
          style={{ transform: 'translateZ(0)' }}
        >
          {projects.map((project, index) => {
            const isEven = index % 2 === 0
            const accent = accents[index % accents.length]
            return (
              <motion.div key={project.id} variants={itemVariants} style={{ willChange: 'opacity' }}>
                <PortfolioRow
                  project={project}
                  index={index}
                  isEven={isEven}
                  accent={accent}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

interface PortfolioRowProps {
  project: PortfolioProject
  index: number
  isEven: boolean
  accent: typeof accents[number]
}

function PortfolioRow({ project, index, isEven, accent }: PortfolioRowProps) {
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

  const contentCol = (
    <div className="z-10 flex flex-col justify-center gap-4 sm:gap-6 lg:col-span-5">
      {/* Index and Accent Tag */}
      <div className="flex items-center gap-3 sm:gap-4">
        <span 
          className="text-4xl font-bold tracking-tight font-mono opacity-15 sm:text-5xl lg:text-7xl"
          style={{ color: accent.color }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex flex-wrap gap-2">
          <span 
            className="rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md"
            style={{ 
              color: accent.color, 
              borderColor: `${accent.color}30`,
              backgroundColor: `${accent.color}08`
            }}
          >
            {project.category}
          </span>
          <span className="rounded-full border border-white/10 bg-[#050508]/60 px-3 py-1 text-xs font-semibold text-zinc-300">
            {project.year}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[var(--project-accent)] sm:text-3xl lg:text-4xl">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-300 sm:text-base lg:text-lg">
        {project.featuredDescription ?? project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 pt-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/[0.06] bg-[#070B1A]/40 px-3 py-1 text-xs font-medium text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* View Link */}
      <div className="flex items-center pt-2 sm:pt-4">
        <span 
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
          style={{ color: accent.color }}
        >
          {project.liveUrl ? 'View Live Website' : 'Project Snapshot'}
          {project.liveUrl && <ArrowUpRight className="h-4 w-4" />}
        </span>
        <div 
          className="ml-4 h-[1px] flex-1 transition-all duration-500 origin-left scale-x-50 group-hover:scale-x-100"
          style={{ 
            background: `linear-gradient(90deg, ${accent.color}, transparent)`
          }}
        />
      </div>
    </div>
  )

  const mockupCol = (
    <div className="relative z-10 lg:col-span-7 flex justify-center">
      {/* Background radial glow */}
      <div 
        className="absolute h-56 w-56 rounded-full opacity-20 blur-[80px] pointer-events-none transition-transform duration-700 scale-100 group-hover:scale-125 sm:h-80 sm:w-80 sm:blur-[100px]"
        style={{ backgroundColor: accent.color }}
      />

      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-[4/3] rounded-2xl border border-white/[0.08] bg-[#070B1A]/40 p-1 transition-all duration-500 group-hover:border-[var(--project-accent)]/40 group-hover:shadow-[0_30px_60px_-15px_var(--project-glow)] sm:aspect-[16/10] md:p-1.5"
        style={{
          '--project-accent': accent.color,
          '--project-glow': accent.glow,
        } as CSSProperties}
      >
        {/* Dynamic cursor glow inside mockup */}
        <div
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none z-0 rounded-2xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, var(--project-glow), transparent 85%)`,
          }}
        />

        {/* Browser Mockup Window */}
        <div className="relative w-full h-full flex flex-col rounded-[0.85rem] border border-white/[0.04] bg-[#050508]/60 overflow-hidden z-10">
          {/* Browser Top Bar */}
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/[0.06] bg-[#050508]/85 shrink-0">
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <span className="w-2 h-2 rounded-full bg-green-500/60" />
            <div className="mx-auto flex h-4 w-1/2 min-w-0 items-center justify-center truncate rounded border border-white/[0.04] bg-[#070B1A]/80 px-2 text-[8px] font-mono text-zinc-500 sm:text-[9px]">
              jynoro.com/{project.slug}
            </div>
          </div>
          {/* Browser Content */}
          <div className="relative flex-1 bg-[#050508]/40 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )

  const rowContent = (
    <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
      {isEven ? (
        <>
          {contentCol}
          {mockupCol}
        </>
      ) : (
        <>
          {/* On mobile content is always first, on desktop swap */}
          <div className="lg:order-2 lg:col-span-5">{contentCol}</div>
          <div className="lg:order-1 lg:col-span-7">{mockupCol}</div>
        </>
      )}
    </div>
  )

  return (
    project.liveUrl ? (
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group block">
        {rowContent}
      </a>
    ) : (
      <div className="group block">
        {rowContent}
      </div>
    )
  )
}
