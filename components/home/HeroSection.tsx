'use client'

import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Rocket,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { containerVariants, itemVariants } from '@/styles/animations'
import { useReducedMotion } from '@/lib/hooks'
import { SECTION_BODY, SECTION_CTA, SECTION_HEADING } from '@/lib/utils'
import dynamic from 'next/dynamic'

const InteractiveParticles = dynamic(() => import('./InteractiveParticles'), {
  ssr: false,
})

const stats = [
  {
    value: '50+',
    label: 'Projects Delivered',
    icon: Rocket,
    accent: '#09A9C2',
    glow: 'rgba(9, 169, 194, 0.12)',
  },
  {
    value: '30+',
    label: 'Satisfied Clients',
    icon: Star,
    accent: '#00E5FF',
    glow: 'rgba(0, 229, 255, 0.12)',
  },
  {
    value: '100%',
    label: 'Client Satisfaction',
    icon: BadgeCheck,
    accent: '#6C3DFF',
    glow: 'rgba(108, 61, 255, 0.10)',
  },
]

type AccentStyle = CSSProperties & {
  '--stat-accent'?: string
  '--stat-glow'?: string
}

function useCountUp(value: string, active: boolean, reducedMotion: boolean) {
  const number = Number(value.match(/\d+/)?.[0] ?? 0)
  const suffix = value.replace(String(number), '')
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active || reducedMotion) {
      return
    }

    let animationFrame = 0
    const start = performance.now()
    const duration = 1100

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(number * eased))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick)
      }
    }

    animationFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animationFrame)
  }, [active, number, reducedMotion])

  return `${reducedMotion ? number : display}${suffix}`
}

function StatCard({
  stat,
  reducedMotion,
}: {
  stat: (typeof stats)[number]
  reducedMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = stat.icon
  const value = useCountUp(stat.value, inView, reducedMotion)

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      whileHover={reducedMotion ? undefined : { y: -4, scale: 1.01 }}
      className="group relative flex min-h-[96px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 px-4 py-5 text-center shadow-none transition-all duration-300 hover:border-[var(--stat-accent)]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] sm:min-h-[108px] sm:px-6 sm:py-6"
      style={{ '--stat-accent': stat.accent, '--stat-glow': stat.glow } as AccentStyle}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--stat-accent),transparent)] opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--stat-glow),transparent_65%)] opacity-35" />
      <div className="relative flex w-full items-center justify-center gap-3 sm:gap-4 md:flex-col md:gap-2 lg:flex-row lg:gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[var(--stat-accent)]/20 bg-[var(--stat-glow)] text-[var(--stat-accent)] transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-[20px] w-[20px]" strokeWidth={1.9} />
        </span>
        <div className="text-left md:text-center lg:text-left">
          <div className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">{value}</div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8] transition-colors duration-300 group-hover:text-white sm:text-xs sm:tracking-[0.16em]">
            {stat.label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="hero-stage relative -mt-[4.75rem] min-h-[100svh] overflow-hidden bg-[#050508] px-3 pb-12 pt-[6.75rem] sm:px-4 md:-mt-[5.25rem] md:px-6 md:pb-20 md:pt-[8.5rem] lg:px-10">
      {/* Particle Animation Background Layer covering the WHOLE hero section */}
      <InteractiveParticles className="z-0" />

      {/* Ambient background glow and grid lines (updated for dark theme) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_16%_22%,rgba(0,229,255,0.15),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(108,61,255,0.12),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(79,140,255,0.15),transparent_42%)]" />
      <div className="pointer-events-none absolute -left-24 top-20 z-0 h-56 w-56 rounded-full border border-[#4F8CFF]/10 bg-[#00E5FF]/5 blur-2xl sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute -right-24 top-36 z-0 h-64 w-64 rounded-full border border-[#6C3DFF]/10 bg-[#6C3DFF]/5 blur-2xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_28%,black,transparent_74%)]" />

      {/* Subtle dark gradient overlay to ensure perfect typography readability */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#050508]/40 via-transparent to-[#050508]/80" />

      <motion.div
        className="hero-content pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-8 pt-4 text-center sm:gap-10 md:pt-8 lg:min-h-[calc(100vh-4rem)] lg:justify-center"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-5xl">
          <motion.div variants={itemVariants} className="mb-7 flex justify-center">
            <div className="pointer-events-auto inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[#050508]/60 px-3 py-2 text-xs font-semibold tracking-wide text-zinc-200 shadow-[0_14px_40px_rgba(79,140,255,0.12)] backdrop-blur-md sm:px-4 sm:text-sm md:px-5">
              <Sparkles className="h-4 w-4 shrink-0 text-[#00E5FF]" />
              <span className="min-w-0">Premium websites, apps, automation, and design</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className={`mx-auto max-w-5xl text-[2.65rem] font-bold leading-[1.04] tracking-tight text-white min-[380px]:text-5xl md:text-7xl lg:text-[5.7rem] ${SECTION_HEADING}`}
          >
            Tech Solutions for
            <span className="block bg-[linear-gradient(100deg,#00E5FF_0%,#4F8CFF_48%,#6C3DFF_100%)] bg-clip-text text-transparent">
              Real Business Growth
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className={`mx-auto max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl ${SECTION_BODY}`}
          >
            We build extraordinary digital experiences that drive real results. From concept to
            launch, we deliver premium web solutions with uncompromising quality.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className={`pointer-events-auto mx-auto flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row sm:gap-4 ${SECTION_CTA}`}
          >
            <Link href="/contact" className="inline-flex w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full">
                <Zap size={20} />
                Start Your Project
                <ArrowRight size={19} />
              </Button>
            </Link>
            <Link href="/portfolio" className="inline-flex w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-white/10 hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/5 hover:text-white">
                View Our Work
                <ArrowRight size={19} />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs font-semibold text-zinc-400 sm:text-sm"
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00E5FF]" />
              Strategy, build, launch
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00E5FF]" />
              Conversion-focused delivery
            </span>
          </motion.div>
        </div>


        <motion.div
          variants={containerVariants}
            className="pointer-events-auto grid w-full max-w-5xl grid-cols-1 gap-3 rounded-[1.5rem] border border-white/[0.06] bg-[#070B1A]/40 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:gap-3.5 sm:p-3.5 md:grid-cols-3 md:rounded-[1.75rem]"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} reducedMotion={prefersReducedMotion} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
