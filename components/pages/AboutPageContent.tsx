'use client'

import { motion } from 'framer-motion'
import { Award, Briefcase, Target, Compass, User, Code2, TrendingUp } from 'lucide-react'
import Card from '@/components/ui/Card'
import SectionCta from '@/components/ui/SectionCta'
import AboutAmbientBackground from '@/components/effects/AboutAmbientBackground'
import { useReducedMotion } from '@/lib/hooks'
import { containerVariants, itemVariants } from '@/styles/animations'
import {
  SECTION_CLASS,
  SECTION_BODY,
  SECTION_HEADING,
  SECTION_CTA,
  STAT_CARD,
} from '@/lib/utils'

const STATS = [
  {
    icon: Briefcase,
    value: '5+',
    label: 'Years of Experience',
    iconClass: 'border-indigo-400/40 bg-indigo-500/15 text-indigo-400',
  },
  {
    icon: Award,
    value: '50+',
    label: 'Projects Delivered',
    iconClass: 'border-cyan-400/40 bg-cyan-500/15 text-cyan-400',
  },
  {
    icon: TrendingUp,
    value: '100%',
    label: 'Client Satisfaction',
    iconClass: 'border-violet-400/40 bg-violet-500/15 text-violet-400',
  },
] as const

export default function AboutPageContent() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative overflow-hidden">
      <AboutAmbientBackground paused={prefersReducedMotion} />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <section className={SECTION_CLASS}>
          <div className="mx-auto w-full max-w-7xl text-center">
            <h1 className={`text-5xl font-bold md:text-6xl ${SECTION_HEADING}`}>
              About <span className="text-gradient">Jynoro</span>
            </h1>
            <p className={`mx-auto max-w-2xl text-xl text-gray-400 ${SECTION_BODY}`}>
              A young, technology-driven team building modern digital products that help businesses
              grow with confidence
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 ${SECTION_BODY}`}
          >
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label} variants={itemVariants}>
                  <Card className={STAT_CARD}>
                    <div
                      className={`mb-4 inline-flex rounded-xl border p-3 ${stat.iconClass}`}
                    >
                      <Icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                    <p className="mt-2 text-sm text-gray-400 md:text-base">{stat.label}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </section>

        <section className={`${SECTION_CLASS} border-t border-slate-800/50`}>
          <div className="mx-auto w-full max-w-7xl">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-center"
            >
              <h2 className={`text-3xl font-bold md:text-4xl ${SECTION_HEADING}`}>
                Meet Our <span className="text-gradient">Founder</span>
              </h2>
              <p className={`mx-auto max-w-2xl text-lg text-gray-400 ${SECTION_BODY}`}>
                The vision and leadership behind Jynoro
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Card className="overflow-hidden !p-0">
                <div className="grid gap-0 md:grid-cols-[280px_1fr]">
                  <div className="flex flex-col items-center justify-center border-b border-slate-700/50 bg-gradient-to-br from-indigo-600/20 via-slate-900/40 to-cyan-600/15 p-8 md:border-b-0 md:border-r md:border-slate-700/50">
                    <div className="mb-4 flex h-28 w-28 items-center justify-center rounded-full border-2 border-indigo-400/50 bg-gradient-to-br from-indigo-500/30 to-cyan-500/20 text-3xl font-bold text-white shadow-lg shadow-indigo-500/20">
                      JA
                    </div>
                    <h3 className="text-2xl font-bold text-white">Jahanzaib Arshad</h3>
                    <p className="mt-1 text-sm font-medium text-cyan-400">Founder & CEO</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                      <User className="h-4 w-4 text-indigo-400" />
                      Young Tech Leader
                    </div>
                  </div>

                  <div className="space-y-4 p-6 md:p-8">
                    <p className="leading-relaxed text-gray-300">
                      <span className="font-semibold text-white">Jahanzaib Arshad</span> is the
                      Founder and CEO of Jynoro — a passionate, hands-on technology expert with{' '}
                      <span className="text-indigo-300">5+ years of experience</span> building modern
                      websites, web applications, and digital solutions for growing businesses.
                    </p>
                    <p className="leading-relaxed text-gray-300">
                      As a young entrepreneur in the tech space, he combines fresh thinking with
                      practical engineering skills to deliver products that look premium, perform
                      reliably, and drive real results. He leads every project with a focus on clear
                      communication, clean code, and long-term partnerships.
                    </p>
                    <p className="leading-relaxed text-gray-300">
                      Under his leadership, Jynoro has helped clients launch brands online, scale their
                      digital presence, and turn ideas into production-ready platforms — always with
                      transparency, quality, and a commitment to excellence.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      {[
                        { icon: Code2, label: 'Full-Stack Development' },
                        { icon: Target, label: 'Product Strategy' },
                        { icon: TrendingUp, label: 'Business Growth' },
                      ].map(({ icon: TagIcon, label }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-2 rounded-full border border-slate-600/60 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-gray-300"
                        >
                          <TagIcon className="h-3.5 w-3.5 text-cyan-400" />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className={SECTION_CLASS}>
          <div className="mx-auto grid w-full max-w-7xl gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Card className="h-full">
                <div className="mb-4 inline-flex rounded-xl border border-indigo-400/30 bg-indigo-500/15 p-3">
                  <Target className="h-6 w-6 text-indigo-400" />
                </div>
                <h2 className={`text-2xl font-bold text-white md:text-3xl ${SECTION_HEADING}`}>
                  Our Vision
                </h2>
                <p className="leading-relaxed text-gray-300">
                  To become the most trusted digital partner for businesses that want to turn great
                  ideas into products people love — built with clarity, craft, and long-term impact.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.5, ease: 'easeOut' }}
            >
              <Card className="h-full">
                <div className="mb-4 inline-flex rounded-xl border border-cyan-400/30 bg-cyan-500/15 p-3">
                  <Compass className="h-6 w-6 text-cyan-400" />
                </div>
                <h2 className={`text-2xl font-bold text-white md:text-3xl ${SECTION_HEADING}`}>
                  Our Mission
                </h2>
                <p className="leading-relaxed text-gray-300">
                  We design and build modern websites and web applications that drive real business
                  results — through transparent communication, reliable delivery, and technology
                  chosen for your goals.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className={`${SECTION_CLASS} border-t border-slate-800/60`}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={SECTION_CTA}
          >
            <SectionCta
              title={
                <>
                  Ready to build something <span className="text-gradient">great</span>?
                </>
              }
              description="Tell us about your project and we'll help you bring your vision to life."
              buttonLabel="Get Your Free Consultation"
            />
          </motion.div>
        </section>
      </motion.div>
    </div>
  )
}
