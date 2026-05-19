'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, ExternalLink, Star, BadgeCheck } from 'lucide-react'
import Card from '@/components/ui/Card'
import SectionCta from '@/components/ui/SectionCta'
import { PORTFOLIO_PROJECTS, getProjectHref } from '@/lib/portfolio-data'
import { containerVariants, itemVariants } from '@/styles/animations'
import {
  SECTION_CLASS,
  SECTION_BODY,
  SECTION_HEADING,
  SECTION_CTA,
  CARD_GRID,
  STAT_CARD,
} from '@/lib/utils'

const PORTFOLIO_STATS = [
  {
    icon: Briefcase,
    value: '50+',
    label: 'Projects Completed',
    iconClass: 'border-indigo-400/40 bg-indigo-500/15 text-indigo-400',
  },
  {
    icon: Star,
    value: '30+',
    label: 'Happy Clients',
    iconClass: 'border-cyan-400/40 bg-cyan-500/15 text-cyan-400',
  },
  {
    icon: BadgeCheck,
    value: '100%',
    label: 'Client Satisfaction',
    iconClass: 'border-violet-400/40 bg-violet-500/15 text-violet-400',
  },
] as const

export default function PortfolioPageContent() {
  return (
    <motion.div
      className={SECTION_CLASS}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1 className={`text-5xl font-bold md:text-6xl ${SECTION_HEADING}`}>
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className={`mx-auto max-w-2xl text-xl text-gray-400 ${SECTION_BODY}`}>
            Showcase of successful projects we&apos;ve delivered for clients across various industries
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${CARD_GRID} ${SECTION_BODY}`}
          style={{ transform: 'translateZ(0)' }}
        >
          {PORTFOLIO_PROJECTS.map((project) => (
            <motion.div key={project.id} variants={itemVariants} style={{ willChange: 'opacity' }}>
              <Link href={getProjectHref(project.slug)} className="block h-full">
                <Card className="group h-full cursor-pointer transition-transform duration-300 hover:-translate-y-0.5">
                  <div className="relative mb-4 h-64 w-full overflow-hidden rounded-xl border border-slate-700/40 bg-slate-900/50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-cyan-300">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-400">{project.description}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-700/50 pt-4">
                    <span className="rounded bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm text-cyan-400 transition-colors group-hover:text-cyan-300">
                      View project
                      <ExternalLink size={16} />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 ${SECTION_BODY}`}
          style={{ willChange: 'opacity' }}
        >
          {PORTFOLIO_STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className={STAT_CARD}>
                <div className={`mb-4 inline-flex rounded-xl border p-3 ${stat.iconClass}`}>
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <div className="text-3xl font-bold text-white md:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm text-gray-400 md:text-base">{stat.label}</div>
              </Card>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={SECTION_CTA}
          style={{ willChange: 'opacity' }}
        >
          <SectionCta
            title="Ready to Start Your Project?"
            description="Let us create something amazing for your business."
            buttonLabel="Get Your Free Consultation"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
