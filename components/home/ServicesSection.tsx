'use client'

import type { CSSProperties } from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Code2, MonitorCog, Palette, Search, Shield, Zap, CheckCircle2 } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { containerVariants, itemVariants } from '@/styles/animations'
import { SECTION_BODY, SECTION_CLASS, SECTION_HEADING } from '@/lib/utils'
import Button from '@/components/ui/Button'

const iconMap = {
  Code2,
  Zap,
  Search,
  Shield,
  Palette,
}

const serviceStyles = [
  {
    accent: '#00E5FF', // Vibrant Cyan
    glow: 'rgba(0, 229, 255, 0.15)',
    motif: 'Code systems',
    image: '/images/our service web dvelopmnt homepage.webp',
    features: ['Fully Responsive Layouts', 'Next.js & React Core', 'Speed Optimized (95+ Lighthouse)'],
    tech: ['Next.js', 'React', 'TailwindCSS', 'TypeScript'],
  },
  {
    accent: '#6C3DFF', // Neon Purple
    glow: 'rgba(108, 61, 255, 0.12)',
    motif: 'Autonomous Agents',
    image: '/images/agntic ai.webp',
    features: ['LLM & Agent Workflows', 'Business Process Automation', 'Custom AI Integrations'],
    tech: ['OpenAI', 'LangChain', 'Python', 'Vector DBs'],
  },
  {
    accent: '#00E6B8', // Emerald Green-Cyan
    glow: 'rgba(0, 230, 184, 0.12)',
    motif: 'Search intelligence',
    image: '/images/seo.webp',
    features: ['Keyword Analysis & Strategy', 'Technical SEO Audits', 'Core Web Vitals Optimization'],
    tech: ['Google Analytics', 'Schema.org', 'PageSpeed Insights', 'Metadata Engine'],
  },
  {
    accent: '#4F8CFF', // Tech Blue
    glow: 'rgba(79, 140, 255, 0.15)',
    motif: 'Always-on monitoring',
    image: '/images/maintainance.webp',
    features: ['24/7 Server Monitoring', 'Regular Backups & Security', 'Fast Performance Tune-ups'],
    tech: ['Docker', 'AWS', 'Sentry', 'SSL / HTTPS'],
  },
  {
    accent: '#FF007A', // Cyber Magenta
    glow: 'rgba(255, 0, 122, 0.12)',
    motif: 'Visual identity',
    image: '/images/graphic design.webp',
    features: ['Vector UI Assets & Iconsets', 'High-Fidelity Figma Prototypes', 'Modern Branding Guidelines'],
    tech: ['Figma', 'Illustrator', 'Motion Design', 'Design Systems'],
  },
]

type ServiceStyleVars = CSSProperties & {
  '--service-accent'?: string
  '--service-glow'?: string
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0)
  const currentService = SERVICES[activeTab] || SERVICES[0]
  const currentStyle = serviceStyles[activeTab] || serviceStyles[0]
  const ActiveIcon = iconMap[currentService.icon as keyof typeof iconMap] || Code2

  return (
    <section
      id="services"
      className={`${SECTION_CLASS} bg-gradient-to-b from-[#050508] via-[#091026] to-[#070b19] pt-10 md:pt-16 overflow-hidden`}
    >
      {/* Background decoration (ambient dark-mode tech glow) */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,8,0.4)_0%,rgba(7,11,26,0.2)_100%)] z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(0,229,255,0.12),transparent_45%),radial-gradient(circle_at_86%_22%,rgba(108,61,255,0.08),transparent_50%)] z-0" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_50%,black,transparent_75%)] z-0" />

      <div className="relative mx-auto w-full max-w-7xl z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <div className="mx-auto mb-4 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[#050508]/60 px-3 py-2 text-xs font-semibold text-[#00E5FF] shadow-none backdrop-blur-md sm:px-5 sm:py-2.5 sm:text-sm">
            <MonitorCog className="h-4 w-4 shrink-0 text-[#00E5FF]" />
            <span>Digital systems engineered for outcomes</span>
          </div>
          <h2 className={`text-4xl font-bold tracking-tight text-white md:text-6xl ${SECTION_HEADING}`}>
            Our Services
          </h2>
          <p className={`mx-auto max-w-2xl text-lg leading-8 text-zinc-400 ${SECTION_BODY}`}>
            Comprehensive, world-class web solutions crafted with attention to every detail
          </p>
        </motion.div>

        {/* Interactive Matrix Showcase Grid */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Interactive Tab Selectors (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {SERVICES.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Code2
              const style = serviceStyles[index] || serviceStyles[0]
              const isActive = activeTab === index

              return (
                <button
                  key={service.id}
                  type="button"
                  onMouseEnter={() => setActiveTab(index)}
                  onClick={() => setActiveTab(index)}
                  className={`group relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer sm:gap-4 sm:p-5 ${
                    isActive
                      ? 'bg-[#070B1A]/60 border-white/[0.08] shadow-[0_12px_30px_rgba(0,0,0,0.3)]'
                      : 'border-transparent bg-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Accent Node */}
                  <span 
                    className={`w-2 h-2 rounded-full transition-all duration-300 shrink-0 ${
                      isActive ? 'bg-[var(--node-color)] shadow-[0_0_8px_var(--node-color)]' : 'bg-zinc-600 group-hover:bg-zinc-400'
                    }`}
                    style={{ '--node-color': style.accent } as CSSProperties}
                  />

                  {/* Icon */}
                  <div 
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                      isActive 
                        ? 'bg-[#050508]/80 text-[var(--icon-color)] border-white/10' 
                        : 'bg-transparent text-zinc-400 border-transparent group-hover:text-white'
                    }`}
                    style={{ '--icon-color': style.accent } as CSSProperties}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  {/* Label */}
                  <div className="flex-grow">
                    <h3 className={`text-base font-bold transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Indicator Arrow */}
                  <ArrowRight 
                    className={`w-4 h-4 text-zinc-500 transition-all duration-300 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}
                    style={{ color: style.accent }}
                  />
                </button>
              )
            })}
          </div>

          {/* Right Column: Dynamic Detail Cockpit (7 cols) */}
          <div className="h-full min-h-[unset] lg:col-span-7 lg:min-h-[460px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 12, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -12, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070B1A]/40 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-6 md:p-10"
                style={
                  {
                    '--service-accent': currentStyle.accent,
                    '--service-glow': currentStyle.glow,
                  } as ServiceStyleVars
                }
              >
                {/* Tech corner accents */}
                <div className="absolute left-4 top-4 w-4 h-4 border-l-2 border-t-2 border-[var(--service-accent)]/45 rounded-tl" />
                <div className="absolute right-4 top-4 w-4 h-4 border-r-2 border-t-2 border-[var(--service-accent)]/45 rounded-tr" />
                <div className="absolute left-4 bottom-4 w-4 h-4 border-l-2 border-b-2 border-[var(--service-accent)]/45 rounded-bl" />
                <div className="absolute right-4 bottom-4 w-4 h-4 border-r-2 border-b-2 border-[var(--service-accent)]/45 rounded-br" />

                {/* Background radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--service-glow),transparent_65%)] pointer-events-none" />

                {/* Service Image - prominently visible */}
                <div className="relative z-10 -mx-5 -mt-5 mb-6 overflow-hidden rounded-t-3xl border-b border-white/[0.06] sm:-mx-6 sm:-mt-6 md:-mx-10 md:-mt-10">
                  <Image
                    src={currentStyle.image}
                    alt={currentService.title}
                    width={800}
                    height={400}
                    className="h-52 w-full object-cover sm:h-64 md:h-80"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B1A] via-[#070B1A]/30 to-transparent pointer-events-none" />
                </div>

                <div className="relative z-10 flex flex-col gap-5">
                  {/* Category and Icon */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em]" style={{ color: currentStyle.accent }}>
                      {currentStyle.motif}
                    </span>
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-[#050508]/80 text-[var(--service-accent)] shadow-lg">
                      <ActiveIcon className="h-6 w-6" strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Heading & Paragraph */}
                  <div>
                    <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                      {currentService.title}
                    </h3>
                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                      {currentService.description}
                    </p>
                  </div>

                  {/* Capabilities features Checklist */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">Core Capabilities</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentStyle.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: currentStyle.accent }} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack badge list */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentStyle.tech.map((techItem) => (
                        <span 
                          key={techItem}
                          className="px-2.5 py-1 rounded-full border border-white/[0.04] bg-[#050508]/40 text-[10px] font-mono text-zinc-400"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom navigation link */}
                <div className="relative z-10 mt-6 flex flex-col gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-zinc-500 font-mono">Premium Service Node</span>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button variant="primary" size="md" className="group w-full justify-center sm:w-auto">
                      Get Started
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}

