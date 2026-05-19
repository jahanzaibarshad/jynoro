'use client'

import { motion } from 'framer-motion'
import { Users, TrendingUp, Lightbulb, Clock, Sparkles } from 'lucide-react'
import Card from '@/components/ui/Card'
import { WHY_JYNORO } from '@/lib/constants'
import { containerVariants, itemVariants } from '@/styles/animations'
import { SECTION_BODY, SECTION_HEADING } from '@/lib/utils'

const iconMap = {
  Users,
  TrendingUp,
  Lightbulb,
  Clock,
}

export default function WhyJynoroSection() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
        style={{ willChange: 'opacity' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-950/60 px-5 py-2.5 text-sm font-medium text-cyan-200 shadow-lg shadow-cyan-500/20 ring-1 ring-white/10 ${SECTION_HEADING}`}
        >
          <Sparkles className="h-4 w-4 text-cyan-300" />
          Built for growth
        </motion.div>

        <h2 className={`text-4xl font-bold md:text-5xl lg:text-6xl ${SECTION_HEADING}`}>
          Why Choose{' '}
          <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(99,102,241,0.35)]">
            Jynoro
          </span>
          ?
        </h2>
        <p className={`mx-auto max-w-2xl text-lg text-slate-200/90 md:text-xl ${SECTION_BODY}`}>
          We&apos;re committed to delivering exceptional results and driving real business growth
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {WHY_JYNORO.map((benefit, idx) => {
          const Icon = iconMap[benefit.icon as keyof typeof iconMap]
          return (
            <motion.div key={idx} variants={itemVariants} style={{ willChange: 'opacity' }}>
              <Card glass className="h-full transition-transform duration-300 hover:-translate-y-1">
                <div className="flex h-full flex-col items-center text-center">
                  <div className="mb-4 inline-flex rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-500/30 to-indigo-600/25 p-4 shadow-lg shadow-cyan-500/25 ring-1 ring-white/10">
                    <Icon className="h-7 w-7 text-cyan-300" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{benefit.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-300/90">{benefit.description}</p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
