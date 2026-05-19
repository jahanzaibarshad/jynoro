'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Rocket, Star, BadgeCheck } from 'lucide-react'
import Button from '@/components/ui/Button'
import HeroAuroraBackground from '@/components/effects/HeroAuroraBackground'
import { containerVariants, itemVariants } from '@/styles/animations'
import { useReducedMotion } from '@/lib/hooks'
import { SECTION_CLASS, SECTION_BODY, SECTION_CTA, SECTION_HEADING } from '@/lib/utils'

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      className="relative -mt-[5.25rem] flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 pt-28 md:px-6 md:py-20 md:pt-32 lg:px-12 lg:px-24"
    >
      <HeroAuroraBackground paused={prefersReducedMotion} />

      <motion.div
        className="hero-content relative z-10 mx-auto w-full max-w-7xl text-center"
        variants={prefersReducedMotion ? undefined : containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className={`flex justify-center ${SECTION_CTA}`}>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-gradient-to-r from-indigo-500/25 via-slate-800/50 to-cyan-500/25 px-8 py-3.5 text-sm font-medium tracking-wide text-indigo-200 shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 backdrop-blur-md">
            <span className="text-cyan-300">✨</span>
            Premium Web Development Solutions
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className={`text-5xl font-bold text-white md:text-7xl lg:text-8xl ${SECTION_HEADING} leading-tight`}
        >
          Tech Solutions for{' '}
          <span className="text-gradient">Real Business Growth</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={`mx-auto max-w-3xl text-lg font-light leading-relaxed text-gray-300 md:text-xl ${SECTION_BODY}`}
        >
          We build extraordinary digital experiences that drive real results. From concept to launch, we deliver premium web solutions with uncompromising quality.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className={`flex flex-col flex-wrap items-center justify-center gap-6 sm:flex-row sm:gap-8 md:gap-10 ${SECTION_CTA}`}
        >
          <Link href="/contact" className="inline-flex">
            <Button variant="primary" size="lg">
              <Zap size={20} />
              Start Your Project
            </Button>
          </Link>
          <Link href="/portfolio" className="inline-flex">
            <Button variant="outline" size="lg">
              View Our Work
            </Button>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              value: '50+',
              label: 'Projects Delivered',
              icon: Rocket,
              iconClass: 'border-indigo-400/40 bg-indigo-500/15 text-indigo-400',
            },
            {
              value: '30+',
              label: 'Satisfied Clients',
              icon: Star,
              iconClass: 'border-cyan-400/40 bg-cyan-500/15 text-cyan-400',
            },
            {
              value: '100%',
              label: 'Client Satisfaction',
              icon: BadgeCheck,
              iconClass: 'border-violet-400/40 bg-violet-500/15 text-violet-400',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="min-h-[140px] rounded-2xl border border-slate-700/30 bg-slate-800/40 p-6 text-center backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 md:p-8"
              >
                <div className={`mx-auto mb-3 inline-flex rounded-xl border p-3 ${stat.iconClass}`}>
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
              </div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
