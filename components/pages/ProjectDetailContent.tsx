'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, User, LayoutGrid, Check, Globe } from 'lucide-react'
import SectionCta from '@/components/ui/SectionCta'
import type { PortfolioProject } from '@/lib/content-types'
import { getProjectHref } from '@/lib/content-types'

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
    <article className="relative min-h-screen bg-[#050508] py-24 md:py-32 overflow-hidden">
      {/* Background visual engine */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(7,11,25,0.6),rgba(5,5,8,1))]" />
      <div className="absolute top-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#6C3DFF]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Dynamic Back Link */}
        <div className="mb-10">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-[#00E5FF] transition-colors"
          >
            <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            <span>BACK_TO_PORTFOLIO</span>
          </Link>
        </div>

        {/* Category & Date Node */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 text-xs font-mono rounded bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[#00E5FF]">
            {project.category}
          </span>
          <span className="text-xs font-mono text-gray-500">
            {project.year}
          </span>
        </div>

        {/* Title & Short Description */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          {project.title}
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-4xl mb-12">
          {project.description}
        </p>

        {/* Large Browser Mockup Frame */}
        <div className="relative mb-12 rounded-2xl bg-[#070B19]/30 border border-white/[0.06] backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {/* Mockup Header */}
          <div className="bg-[#050508]/90 border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            {/* URL bar */}
            <div className="flex-1 max-w-[300px] mx-auto bg-[#070B19]/60 border border-white/[0.04] rounded px-3 py-0.5 text-xs font-mono text-gray-400 truncate flex items-center justify-center gap-2">
              <Globe size={10} />
              jynoro.dev/portfolio/{project.slug}
            </div>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#050508]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1024px"
              priority
            />
          </div>
        </div>

        {/* Specs Dashboard Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-6 backdrop-blur-md relative overflow-hidden">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
              <User size={12} className="text-[#00E5FF]" />
              Client Owner
            </div>
            <p className="text-lg font-semibold text-white tracking-tight">{project.client}</p>
          </div>
          
          <div className="rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-6 backdrop-blur-md relative overflow-hidden">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
              <Calendar size={12} className="text-[#6C3DFF]" />
              Deployment Date
            </div>
            <p className="text-lg font-semibold text-white tracking-tight">{project.year}</p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-6 backdrop-blur-md relative overflow-hidden">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
              <LayoutGrid size={12} className="text-emerald-400" />
              Category Module
            </div>
            <p className="text-lg font-semibold text-white tracking-tight">{project.category}</p>
          </div>
        </div>

        {/* Long Details Content */}
        <div className="space-y-6 text-gray-300 mb-16">
          <h2 className="text-2xl font-semibold tracking-tight text-white uppercase font-mono text-sm border-b border-white/[0.05] pb-3">
            // Project Overview
          </h2>
          <p className="leading-relaxed text-gray-400">
            {project.longDescription}
          </p>
          
          <ul className="space-y-3 pt-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                <span className="flex-shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#00E5FF]/10 text-[#00E5FF]">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gallery Section */}
        {project.gallery.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold tracking-tight text-white uppercase font-mono text-sm border-b border-white/[0.05] pb-3 mb-8">
              // Interface Gallery
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.gallery.map((src, index) => (
                <div
                  key={`${project.slug}-${index}`}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070B1A]/30 backdrop-blur-xl group"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-xs font-mono text-gray-400">SCREENSHOT_0{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technology Tag Cloud */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold tracking-tight text-white uppercase font-mono text-sm border-b border-white/[0.05] pb-3 mb-6">
            // Core Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono rounded bg-white/[0.03] border border-white/[0.06] text-gray-300 hover:border-[#00E5FF]/30 hover:text-white transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Navigator Node badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-y border-white/[0.05] py-8 mb-20">
          {prevProject ? (
            <Link
              href={getProjectHref(prevProject.slug)}
              className="group flex items-center gap-3.5 px-5 py-3 rounded-xl bg-[#070B1A]/40 border border-white/[0.05] hover:border-[#00E5FF]/20 text-gray-400 hover:text-white transition-all duration-300"
            >
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
              <div className="text-left">
                <span className="block text-[10px] font-mono text-gray-500 uppercase">PREVIOUS BUILD</span>
                <span className="text-sm font-semibold tracking-tight">{prevProject.title}</span>
              </div>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}

          {nextProject ? (
            <Link
              href={getProjectHref(nextProject.slug)}
              className="group flex items-center gap-3.5 px-5 py-3 rounded-xl bg-[#070B1A]/40 border border-white/[0.05] hover:border-[#00E5FF]/20 text-gray-400 hover:text-white transition-all duration-300 sm:ml-auto"
            >
              <div className="text-right">
                <span className="block text-[10px] font-mono text-gray-500 uppercase">NEXT BUILD</span>
                <span className="text-sm font-semibold tracking-tight">{nextProject.title}</span>
              </div>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </div>

        {/* Case Study CTA */}
        <SectionCta
          title="Want a project like this?"
          description="Tell us about your goals and we'll help you plan the right solution."
          buttonLabel="Start Your Project"
        />
      </div>
    </article>
  )
}
