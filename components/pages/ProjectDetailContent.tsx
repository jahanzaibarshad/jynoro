'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import SectionCta from '@/components/ui/SectionCta'
import type { PortfolioProject } from '@/lib/content-types'
import { getProjectHref } from '@/lib/content-types'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, SECTION_CTA } from '@/lib/utils'

interface ProjectDetailContentProps {
  project: PortfolioProject
  allProjects: PortfolioProject[]
}

export default function ProjectDetailContent({ project, allProjects }: ProjectDetailContentProps) {
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <motion.article
      className={SECTION_CLASS}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div className="mx-auto w-full max-w-5xl">
        <Link
          href="/portfolio"
          className={`inline-flex items-center gap-2 text-cyan-400 transition-colors hover:text-cyan-300 ${SECTION_BODY}`}
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </Link>

        <div className={`flex flex-wrap items-center gap-3 ${SECTION_BODY}`}>
          <Badge variant="primary">{project.category}</Badge>
          <span className="text-sm text-gray-400">{project.year}</span>
        </div>

        <h1 className={`text-4xl font-bold md:text-5xl ${SECTION_HEADING}`}>{project.title}</h1>
        <p className={`max-w-3xl text-lg text-gray-400 ${SECTION_BODY}`}>{project.description}</p>

        <motion.div className={`relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/40 ${SECTION_BODY}`}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 896px"
            priority
          />
        </motion.div>

        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <User className="h-4 w-4 text-indigo-400" />
              Client
            </div>
            <p className="font-medium text-white">{project.client}</p>
          </div>
          <div className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-5">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="h-4 w-4 text-cyan-400" />
              Year
            </div>
            <p className="font-medium text-white">{project.year}</p>
          </div>
        </div>

        <div className={`space-y-4 text-gray-300 ${SECTION_BODY}`}>
          <h2 className="text-2xl font-bold text-white">Project Overview</h2>
          <p className="leading-relaxed">{project.longDescription}</p>
          <ul className="list-disc space-y-2 pl-5">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {project.gallery.length > 0 && (
          <div className={SECTION_BODY}>
            <h2 className={`text-2xl font-bold text-white ${SECTION_HEADING}`}>Project Gallery</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.gallery.map((src, index) => (
                <motion.div
                  key={`${project.slug}-${index}`}
                  className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <div className={SECTION_BODY}>
          <h2 className={`text-xl font-bold text-white ${SECTION_HEADING}`}>Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-600/60 bg-slate-800/60 px-3 py-1.5 text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          className={`flex flex-col gap-4 border-t border-slate-700/50 pt-10 sm:flex-row sm:justify-between ${SECTION_CTA}`}
        >
          {prevProject ? (
            <Link
              href={getProjectHref(prevProject.slug)}
              className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-white"
            >
              <ArrowLeft size={18} />
              {prevProject.title}
            </Link>
          ) : (
            <span />
          )}
          {nextProject ? (
            <Link
              href={getProjectHref(nextProject.slug)}
              className="inline-flex items-center gap-2 text-gray-300 transition-colors hover:text-white sm:ml-auto"
            >
              {nextProject.title}
              <ArrowRight size={18} />
            </Link>
          ) : null}
        </div>

        <SectionCta
          title="Want a project like this?"
          description="Tell us about your goals and we'll help you plan the right solution."
          buttonLabel="Start Your Project"
        />
      </motion.div>
    </motion.article>
  )
}
