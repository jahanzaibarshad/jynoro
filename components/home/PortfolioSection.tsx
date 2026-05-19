'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { PORTFOLIO_PROJECTS, getProjectHref } from '@/lib/portfolio-data'
import { containerVariants, itemVariants } from '@/styles/animations'
import Button from '@/components/ui/Button'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, SECTION_CTA, CARD_GRID } from '@/lib/utils'

export default function PortfolioSection() {
  return (
    <section id="portfolio" className={SECTION_CLASS}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <h2 className={`text-5xl md:text-6xl font-bold ${SECTION_HEADING} text-white`}>
            Featured Work
          </h2>
          <p className={`text-gray-300 text-lg max-w-2xl mx-auto ${SECTION_BODY}`}>
            Explore our portfolio of high-impact digital solutions
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={CARD_GRID}
          style={{ transform: 'translateZ(0)' }}
        >
          {PORTFOLIO_PROJECTS.map((project) => (
            <motion.div key={project.id} variants={itemVariants} style={{ willChange: 'opacity' }}>
              <PortfolioCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`flex justify-center pt-4 ${SECTION_CTA}`}
          style={{ willChange: 'opacity' }}
        >
          <Link href="/portfolio" className="inline-flex">
            <Button variant="primary" size="lg">
              View All Projects
              <ArrowRight size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function PortfolioCard({
  project,
}: {
  project: (typeof PORTFOLIO_PROJECTS)[number]
}) {
  return (
    <Link href={getProjectHref(project.slug)} className="block h-full">
      <motion.div
        whileHover={{
          boxShadow: '0 10px 30px rgba(79, 70, 229, 0.15)',
          borderColor: 'rgba(99, 102, 241, 0.4)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group flex h-full min-h-[280px] flex-col rounded-2xl border border-slate-700/30 bg-gradient-to-br from-slate-800/40 to-slate-900/30 p-6 md:p-8"
        style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
      >
        <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600/10 to-cyan-600/10">
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
          <p className="text-sm leading-relaxed text-gray-300">{project.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-slate-700/30 pt-4">
          <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-lg p-2 text-cyan-400 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-300">
            <ExternalLink size={18} />
          </span>
        </div>
      </motion.div>
    </Link>
  )
}
