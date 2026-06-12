'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Award,
  Briefcase,
  ChevronRight,
  Clock,
  Code2,
  Compass,
  Gauge,
  Lightbulb,
  Search,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SectionCta from '@/components/ui/SectionCta'
import ContactForm from '@/components/sections/ContactForm'
import PortfolioSectionClient from '@/components/home/PortfolioSectionClient'
import BlogPreviewSectionClient from '@/components/home/BlogPreviewSectionClient'
import type { BlogPost, PortfolioProject } from '@/lib/content-types'
import type { PageSection } from '@/lib/page-sections'
import { containerVariants, itemVariants } from '@/styles/animations'
import {
  SECTION_CLASS,
  SECTION_BODY,
  SECTION_HEADING,
  SECTION_CTA,
  CARD_GRID,
  STAT_CARD,
} from '@/lib/utils'

const ICONS: Record<string, LucideIcon> = {
  Code2,
  Zap,
  Search,
  Shield,
  Smartphone,
  Gauge,
  Users,
  TrendingUp,
  Lightbulb,
  Clock,
  Briefcase,
  Award,
  Target,
  Compass,
}

interface SectionRendererProps {
  sections: PageSection[]
  featuredProjects?: PortfolioProject[]
  blogPosts?: BlogPost[]
}

export default function SectionRenderer({
  sections,
  featuredProjects = [],
  blogPosts = [],
}: SectionRendererProps) {
  return (
    <>
      {sections
        .filter((s) => s.enabled)
        .map((section) => (
          <SectionBlock
            key={section.id}
            section={section}
            featuredProjects={featuredProjects}
            blogPosts={blogPosts}
          />
        ))}
    </>
  )
}

function SectionBlock({
  section,
  featuredProjects,
  blogPosts,
}: {
  section: PageSection
  featuredProjects: PortfolioProject[]
  blogPosts: BlogPost[]
}) {
  const d = section.data

  switch (section.type) {
    case 'breadcrumb': {
      const items = (d.items as { label: string; href: string }[]) || []
      return (
        <nav className="mx-auto max-w-7xl px-4 py-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            {items.map((item, i) => (
              <li key={`${item.label}-${i}`} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={14} className="text-gray-600" />}
                {i < items.length - 1 ? (
                  <Link href={item.href} className="hover:text-cyan-400">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-300">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )
    }

    case 'page-header':
      return (
        <section className={SECTION_CLASS}>
          <div className="mx-auto max-w-7xl text-center">
            <h1 className={`text-5xl font-bold md:text-6xl ${SECTION_HEADING}`}>
              {String(d.title)}{' '}
              {d.titleHighlight ? <span className="text-gradient">{String(d.titleHighlight)}</span> : null}
            </h1>
            {d.subtitle ? (
              <p className={`mx-auto max-w-2xl text-xl text-gray-400 ${SECTION_BODY}`}>{String(d.subtitle)}</p>
            ) : null}
          </div>
        </section>
      )

    case 'hero':
      return (
        <section className={`${SECTION_CLASS} -mt-[5.25rem] pt-[5.25rem]`}>
          <div className="mx-auto max-w-7xl text-center">
            {d.eyebrow ? (
              <span className="mb-4 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
                {String(d.eyebrow)}
              </span>
            ) : null}
            <h1 className={`text-5xl font-bold md:text-7xl ${SECTION_HEADING}`}>
              {String(d.headline)}{' '}
              {d.headlineHighlight ? (
                <span className="text-gradient">{String(d.headlineHighlight)}</span>
              ) : null}
            </h1>
            {d.subtitle ? <p className={`mx-auto max-w-2xl text-xl text-gray-300 ${SECTION_BODY}`}>{String(d.subtitle)}</p> : null}
            <div className={`flex flex-wrap justify-center gap-4 ${SECTION_BODY}`}>
              {d.primaryCta ? (
                <Link href={(d.primaryCta as { href: string }).href}>
                  <Button variant="primary" size="lg">
                    {(d.primaryCta as { label: string }).label}
                  </Button>
                </Link>
              ) : null}
              {d.secondaryCta ? (
                <Link href={(d.secondaryCta as { href: string }).href}>
                  <Button variant="secondary" size="lg">
                    {(d.secondaryCta as { label: string }).label}
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      )

    case 'stats': {
      const items = (d.items as { value: string; label: string; icon: string }[]) || []
      return (
        <section className={SECTION_CLASS}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 ${SECTION_BODY}`}
          >
            {items.map((item) => {
              const Icon = ICONS[item.icon] || Briefcase
              return (
                <motion.div key={item.label} variants={itemVariants}>
                  <Card className={STAT_CARD}>
                    <div className="mb-4 w-fit self-start rounded-xl border border-indigo-400/40 bg-indigo-500/15 p-3 text-indigo-400">
                      <Icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <div className="text-3xl font-bold text-white md:text-4xl">{item.value}</div>
                    <p className="mt-2 text-sm text-gray-400 md:text-base">{item.label}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </section>
      )
    }

    case 'services-grid': {
      const items = (d.items as {
        title: string
        description: string
        icon: string
        features?: string[]
        price?: string
        ctaLabel?: string
        ctaHref?: string
      }[]) || []
      const detailed = Boolean(d.detailed)
      return (
        <section className={SECTION_CLASS}>
          <div className="mx-auto max-w-7xl">
            {d.title ? (
              <div className="mb-10 text-center">
                <h2 className={`text-3xl font-bold md:text-4xl ${SECTION_HEADING}`}>{String(d.title)}</h2>
                {d.subtitle ? <p className={`text-gray-400 ${SECTION_BODY}`}>{String(d.subtitle)}</p> : null}
              </div>
            ) : null}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className={CARD_GRID}>
              {items.map((item) => {
                const Icon = ICONS[item.icon] || Code2
                return (
                  <motion.div key={item.title} variants={itemVariants}>
                    <Card className="flex h-full flex-col">
                      <div className="mb-4 w-fit self-start rounded-xl border border-indigo-400/30 bg-indigo-500/10 p-3 text-indigo-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mb-4 flex-grow text-sm text-gray-400">{item.description}</p>
                      {detailed && item.features ? (
                        <ul className="mb-4 space-y-1 text-sm text-gray-400">
                          {item.features.map((f) => (
                            <li key={f} className="flex items-center gap-2">
                              <span className="text-cyan-400">✓</span> {f}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {detailed && item.price ? (
                        <p className="mb-4 text-sm font-medium text-cyan-400">{item.price}</p>
                      ) : null}
                      {item.ctaHref && item.ctaLabel ? (
                        <Link href={item.ctaHref}>
                          <Button variant="secondary" size="sm">
                            {item.ctaLabel}
                          </Button>
                        </Link>
                      ) : null}
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )
    }

    case 'features-grid': {
      const items = (d.items as { title: string; description: string; icon: string }[]) || []
      return (
        <section className={SECTION_CLASS}>
          <div className="mx-auto max-w-7xl">
            {d.title ? (
              <div className="mb-10 text-center">
                <h2 className={`text-3xl font-bold md:text-4xl ${SECTION_HEADING}`}>{String(d.title)}</h2>
                {d.subtitle ? <p className={`text-gray-400 ${SECTION_BODY}`}>{String(d.subtitle)}</p> : null}
              </div>
            ) : null}
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className={CARD_GRID}>
              {items.map((item) => {
                const Icon = ICONS[item.icon] || Lightbulb
                return (
                  <motion.div key={item.title} variants={itemVariants}>
                    <Card className="text-center">
                      <div className="mx-auto mb-4 w-fit rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-3 text-cyan-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )
    }

    case 'testimonials': {
      const items = (d.items as { name: string; role: string; content: string; avatar?: string }[]) || []
      return (
        <section className={SECTION_CLASS}>
          <div className="mx-auto max-w-7xl">
            {d.title ? (
              <div className="mb-10 text-center">
                <h2 className={`text-3xl font-bold md:text-4xl ${SECTION_HEADING}`}>{String(d.title)}</h2>
                {d.subtitle ? <p className={`text-gray-400 ${SECTION_BODY}`}>{String(d.subtitle)}</p> : null}
              </div>
            ) : null}
            <div className={CARD_GRID}>
              {items.map((item) => (
                <Card key={item.name} className="flex flex-col">
                  <p className="mb-6 flex-grow text-gray-300 italic">&ldquo;{item.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )
    }

    case 'cta':
      return (
        <section className={SECTION_CLASS}>
          <SectionCta
            title={String(d.title || '')}
            description={String(d.description || '')}
            buttonLabel={String(d.buttonLabel || 'Contact Us')}
            href={String(d.buttonHref || '/contact')}
          />
        </section>
      )

    case 'rich-text':
      return (
        <section className={SECTION_CLASS}>
          <div className="prose prose-invert mx-auto max-w-3xl">
            {d.title ? <h2 className={`${SECTION_HEADING} mb-6 text-3xl font-bold`}>{String(d.title)}</h2> : null}
            {String(d.content || '')
              .split('\n\n')
              .filter(Boolean)
              .map((para) => (
                <p key={para.slice(0, 40)} className={`text-gray-300 leading-relaxed ${SECTION_BODY}`}>
                  {para}
                </p>
              ))}
          </div>
        </section>
      )

    case 'two-column': {
      const columns = (d.columns as { icon?: string; title: string; content: string }[]) || []
      return (
        <section className={`${SECTION_CLASS} border-t border-slate-800/50`}>
          <div className={`mx-auto grid max-w-7xl gap-6 md:grid-cols-2 ${SECTION_BODY}`}>
            {columns.map((col) => {
              const Icon = ICONS[col.icon || 'Target'] || Target
              return (
                <Card key={col.title} className="p-6 md:p-8">
                  <div className="mb-4 w-fit self-start rounded-lg border border-indigo-400/30 bg-indigo-500/10 p-2.5">
                    <Icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{col.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{col.content}</p>
                </Card>
              )
            })}
          </div>
        </section>
      )
    }

    case 'faq': {
      const items = (d.items as { question: string; answer: string }[]) || []
      return (
        <section className={SECTION_CLASS}>
          <div className="mx-auto max-w-4xl">
            {d.title ? (
              <h2 className={`text-center text-3xl font-bold ${SECTION_HEADING} ${SECTION_BODY}`}>{String(d.title)}</h2>
            ) : null}
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.question} className="p-6">
                  <h3 className="mb-2 font-semibold text-white">{item.question}</h3>
                  <p className="text-sm text-gray-400">{item.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )
    }

    case 'contact-info': {
      const items = (d.items as { icon: string; title: string; value: string }[]) || []
      return (
        <section className={SECTION_CLASS}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3 ${SECTION_BODY}`}
          >
            {items.map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="min-h-[140px] rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 text-center backdrop-blur md:p-8"
              >
                <div className="mb-3 text-3xl">{item.icon}</div>
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )
    }

    case 'contact-form':
      return (
        <section className={SECTION_CLASS}>
          <div className="mx-auto max-w-3xl">
            {d.title ? <h2 className={`text-center text-2xl font-bold ${SECTION_HEADING} ${SECTION_BODY}`}>{String(d.title)}</h2> : null}
            {d.subtitle ? <p className={`text-center text-gray-400 ${SECTION_BODY}`}>{String(d.subtitle)}</p> : null}
            <ContactForm />
          </div>
        </section>
      )

    case 'founder':
      return (
        <section className={`${SECTION_CLASS} border-t border-slate-800/50`}>
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <h2 className={`text-3xl font-bold md:text-4xl ${SECTION_HEADING}`}>
                {String(d.sectionTitle || 'Meet Our Founder')}
              </h2>
              {d.sectionSubtitle ? (
                <p className={`text-gray-400 ${SECTION_BODY}`}>{String(d.sectionSubtitle)}</p>
              ) : null}
            </div>
            <Card className="mx-auto max-w-4xl p-6 md:p-10">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-3xl font-bold text-white">
                  {String(d.initials || 'J')}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white">{String(d.name)}</h3>
                  <p className="mb-4 text-cyan-400">{String(d.role)}</p>
                  {(d.bio as string[] || []).map((para) => (
                    <p key={para.slice(0, 30)} className="mb-3 text-gray-400 leading-relaxed">
                      {para}
                    </p>
                  ))}
                  <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                    {(d.tags as string[] || []).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-600/60 bg-slate-800/60 px-3 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )

    case 'image-text': {
      const imageLeft = d.imagePosition !== 'right'
      const textBlock = (
        <div className="flex flex-col justify-center">
          <h2 className={`text-2xl font-bold text-white md:text-3xl ${SECTION_HEADING}`}>{String(d.title)}</h2>
          <p className={`text-gray-400 leading-relaxed ${SECTION_BODY}`}>{String(d.content)}</p>
        </div>
      )
      const imageBlock = (
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-700/50">
          <Image src={String(d.image)} alt={String(d.alt || d.title || 'Image')} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      )
      return (
        <section className={SECTION_CLASS}>
          <div className={`mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 ${SECTION_BODY}`}>
            {imageLeft ? (
              <>
                {imageBlock}
                {textBlock}
              </>
            ) : (
              <>
                {textBlock}
                {imageBlock}
              </>
            )}
          </div>
        </section>
      )
    }

    case 'buttons': {
      const items = (d.items as { label: string; href: string; variant?: string }[]) || []
      const align = d.align === 'left' ? 'justify-start' : 'justify-center'
      return (
        <section className={SECTION_CLASS}>
          <div className={`flex flex-wrap gap-4 ${align} ${SECTION_CTA}`}>
            {items.map((btn) => (
              <Link key={btn.label} href={btn.href}>
                <Button variant={btn.variant === 'secondary' ? 'secondary' : 'primary'} size="lg">
                  {btn.label}
                </Button>
              </Link>
            ))}
          </div>
        </section>
      )
    }

    case 'portfolio-featured':
      return featuredProjects.length > 0 ? (
        <PortfolioSectionClient projects={featuredProjects} />
      ) : null

    case 'blog-preview':
      return blogPosts.length > 0 ? <BlogPreviewSectionClient posts={blogPosts} /> : null

    default:
      return null
  }
}
