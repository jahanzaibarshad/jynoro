'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2, Zap, Search, Shield, Palette,
  Check, Plus, Minus, Layers, Terminal,
  Server, Cpu, Star, ArrowRight,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionCta from '@/components/ui/SectionCta'
import { SERVICES } from '@/lib/constants'
import { containerVariants, itemVariants } from '@/styles/animations'

// Match exactly the same icon map as ServicesSection on homepage
const iconMap = {
  Code2,
  Zap,
  Search,
  Shield,
  Palette,
}

// Per-service extended details — titles match SERVICES constant exactly
const serviceDetails = [
  {
    image: '/images/our service web dvelopmnt homepage.webp',
    accent: '#00E5FF',
    glow: 'rgba(0, 229, 255, 0.15)',
    features: ['Fully Responsive Layouts', 'Next.js & React Core', 'Speed Optimized (95+ Lighthouse)', 'Mobile-First Approach', 'Clean Semantic Code', 'SEO-Ready Structure'],
    tech: ['Next.js', 'React', 'TailwindCSS', 'TypeScript'],
    price: 'Starting from $2,000',
  },
  {
    image: '/images/agntic ai.webp',
    accent: '#6C3DFF',
    glow: 'rgba(108, 61, 255, 0.15)',
    features: ['Secure Auth & Database Systems', 'REST / GraphQL APIs', 'Real-time WebSocket Updates', 'Scalable Architecture', 'Full IP Code Ownership', 'Role-based Access Control'],
    tech: ['Node.js', 'PostgreSQL', 'GraphQL', 'Prisma'],
    price: 'Starting from $5,000',
  },
  {
    image: '/images/seo.webp',
    accent: '#00E6B8',
    glow: 'rgba(0, 230, 184, 0.15)',
    features: ['Keyword Research & Strategy', 'Technical SEO Audits', 'Core Web Vitals Optimization', 'On-Page & Off-Page SEO', 'Content Strategy Planning', 'Monthly Analytics Reports'],
    tech: ['Google Analytics', 'Schema.org', 'PageSpeed Insights', 'Search Console'],
    price: 'Starting from $1,000/mo',
  },
  {
    image: '/images/maintainance.webp',
    accent: '#4F8CFF',
    glow: 'rgba(79, 140, 255, 0.15)',
    features: ['24/7 Server Monitoring', 'Regular Backups & Security', 'Fast Performance Tune-ups', 'Security Updates & Patches', 'Bug Fixes & Improvements', 'Monthly Progress Reports'],
    tech: ['Docker', 'AWS', 'Sentry', 'SSL / HTTPS'],
    price: 'Starting from $500/mo',
  },
  {
    image: '/images/graphic design.webp',
    accent: '#FF007A',
    glow: 'rgba(255, 0, 122, 0.15)',
    features: ['Vector UI Assets & Iconsets', 'High-Fidelity Figma Prototypes', 'Modern Branding Guidelines', 'Social Media Creatives', 'Logo & Identity Design', 'Design System Setup'],
    tech: ['Figma', 'Illustrator', 'Motion Design', 'Design Systems'],
    price: 'Starting from $800',
  },
]

const processSteps = [
  { step: '01', title: 'Discovery & Audit', description: 'We analyze your goals, market, and existing setup to build the perfect blueprint.' },
  { step: '02', title: 'System Blueprinting', description: 'Custom architecture design including data schemas, cloud setup, and UX wireframes.' },
  { step: '03', title: 'Premium Engineering', description: 'Clean, scalable components built with React/Next.js, Tailwind, and Framer Motion.' },
  { step: '04', title: 'Quality Assurance', description: 'Rigorous testing: mobile, Lighthouse performance audits, SEO, and load tests.' },
  { step: '05', title: 'Launch & Handover', description: 'Deployed on edge infrastructure with CI/CD pipelines and full code ownership transfer.' },
]

const techCategories = [
  { title: 'Frontend Engine', techs: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], icon: Layers },
  { title: 'Backend & APIs', techs: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST & GraphQL'], icon: Terminal },
  { title: 'Database Pipeline', techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'SQL Server'], icon: Server },
  { title: 'Cloud & Launch', techs: ['AWS S3/EC2', 'Vercel Edge', 'Docker', 'GitHub Actions CI', 'Sentry Logs'], icon: Cpu },
]

const faqs = [
  { question: 'What web frameworks do you use and why?', answer: 'We build with React/Next.js and TypeScript on the frontend, and Node.js/Python on the backend. This gives unmatched speed, modularity, and SEO indexability.' },
  { question: 'Do you integrate AI agents into existing applications?', answer: 'Yes. We can integrate autonomous AI agents, Retrieval-Augmented Generation (RAG) pipelines, and LLM orchestration tools directly into your existing business software.' },
  { question: 'What is the standard timeline for a web development project?', answer: 'It depends on complexity. A corporate landing page takes 2-4 weeks. A full custom SaaS web application typically requires 8-12 weeks from blueprinting to final launch.' },
  { question: 'How do code handoffs and IP ownership work?', answer: 'Once project balances are cleared, full source code and Intellectual Property (IP) is pushed to your organization accounts — clean, documented Git repositories included.' },
  { question: 'Can you speed up or refactor my existing website?', answer: 'Absolutely. We audit slow WordPress or React sites and convert them to blazing-fast Next.js architectures that consistently score 95+ on Google Lighthouse.' },
  { question: 'How do you handle maintenance after the website is launched?', answer: 'We offer dedicated maintenance retainers that include 24/7 server monitoring, dependency updates, security patches, and priority bug fixing to ensure your app scales flawlessly.' },
  { question: 'Will my website be mobile responsive and SEO optimized?', answer: '100%. All our interfaces are built mobile-first. We implement semantic HTML, structured data, and server-side rendering to ensure your site is deeply optimized for search engines right out of the box.' },
  { question: 'Do you help with domain setup and hosting?', answer: 'Yes — domain configuration, SSL, DNS routing, and deployment on Vercel, AWS, and Netlify are all part of our process.' },
]

export default function ServicesPageContent() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null)

  return (
    <div className="relative min-h-screen bg-[#050508] py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(7,11,25,0.7),rgba(5,5,8,1))]" />
      <div className="absolute top-[10%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#6C3DFF]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 relative z-10">

        {/* Hero Header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#050508]/60 px-5 py-2.5 text-sm font-semibold text-[#00E5FF] mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Code2 className="h-4 w-4" />
            What We Do
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            Our <span className="bg-gradient-to-r from-[#00E5FF] via-[#4F8CFF] to-[#6C3DFF] bg-clip-text text-transparent">Services</span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            Everything you need to build, grow, and scale your digital presence — crafted with precision and delivered with care.
          </motion.p>
        </div>

        {/* Services — Alternating Layout using same services as homepage */}
        <div className="space-y-28 md:space-y-36 mb-36">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Code2
            const detail = serviceDetails[index]
            const isEven = index % 2 === 0

            return (
              <div key={service.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

                {/* Content */}
                <motion.div
                  className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono tracking-widest uppercase px-2.5 py-1 rounded border border-white/[0.06] bg-[#070B19]" style={{ color: detail.accent }}>
                      0{index + 1}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-[#070B1A]/40" style={{ color: detail.accent }}>
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {service.title}
                  </h2>

                  <p className="text-gray-400 leading-relaxed text-base">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-3">Core Capabilities</h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {detail.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full" style={{ backgroundColor: `${detail.accent}18`, color: detail.accent }}>
                            <Check size={10} strokeWidth={3} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-widest mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {detail.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full border border-white/[0.06] bg-[#050508]/50 text-[10px] font-mono text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.05] flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider" style={{ color: detail.accent }}>Ready to start?</p>
                      <p className="text-sm font-semibold mt-0.5 text-white">Let&apos;s discuss your project</p>
                    </div>
                    <Link href="/contact">
                      <Button variant="primary" className="group">
                        Get Started
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>

                {/* Image */}
                <motion.div
                  className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                >
                  <div className="relative group rounded-2xl border border-white/[0.08] bg-[#070B1A]/40 p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/[0.14] hover:shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
                    {/* Glowing top line */}
                    <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${detail.accent}, transparent)` }} />
                    <Image
                      src={detail.image}
                      alt={service.title}
                      width={900}
                      height={506}
                      className="w-full h-auto rounded-xl object-cover"
                    />
                    {/* Bottom overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 via-transparent to-transparent pointer-events-none rounded-xl" />
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                      style={{ background: `radial-gradient(circle at 50% 100%, ${detail.glow}, transparent 65%)` }}
                    />
                  </div>
                </motion.div>

              </div>
            )
          })}
        </div>

        {/* Our Process */}
        <div className="border-t border-white/[0.06] pt-24 mb-32">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              How We <span className="bg-gradient-to-r from-[#00E5FF] to-[#6C3DFF] bg-clip-text text-transparent">Work</span>
            </h2>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mt-2">Our Process</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
                className="relative rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-6 backdrop-blur-md group hover:border-[#00E5FF]/30 transition-all duration-300"
              >
                {idx < 4 && (
                  <div className="hidden md:block absolute top-11 left-full w-full h-px bg-gradient-to-r from-[#00E5FF]/40 to-transparent z-0" />
                )}
                <div className="text-3xl font-black bg-gradient-to-br from-[#00E5FF] to-[#4F8CFF] bg-clip-text text-transparent font-mono mb-3">{step.step}</div>
                <h3 className="font-semibold text-white text-sm leading-tight mb-2">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Jynoro Advantage Bento Box */}
        <div className="border-t border-white/[0.06] pt-24 mb-32 relative">
          <div className="text-center mb-14 max-w-2xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              The Jynoro <span className="bg-gradient-to-r from-[#00E5FF] to-[#6C3DFF] bg-clip-text text-transparent">Advantage</span>
            </h2>
            <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest mt-2">Why Partner With Us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
            {/* Bento Card 1: Large */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#070B1A]/80 to-[#050508] p-8 md:p-10 overflow-hidden relative group hover:border-[#00E5FF]/30 transition-all duration-500"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/10 blur-[80px] rounded-full group-hover:bg-[#00E5FF]/20 transition-all duration-500" />
              <Shield className="w-10 h-10 text-[#00E5FF] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Enterprise-Grade Security</h3>
              <p className="text-zinc-400 max-w-md leading-relaxed">We build with bank-level security protocols, ensuring your user data, proprietary algorithms, and payment gateways are completely protected from day one.</p>
            </motion.div>

            {/* Bento Card 2: Tall */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#070B1A]/80 to-[#050508] p-8 overflow-hidden relative group hover:border-[#6C3DFF]/30 transition-all duration-500"
            >
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#6C3DFF]/10 blur-[60px] rounded-full group-hover:bg-[#6C3DFF]/20 transition-all duration-500" />
              <Zap className="w-10 h-10 text-[#6C3DFF] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
              <p className="text-zinc-400 leading-relaxed">Sub-second page loads and optimized Core Web Vitals to boost your SEO and conversion rates dramatically.</p>
            </motion.div>

            {/* Bento Card 3: Normal */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#070B1A]/80 to-[#050508] p-8 overflow-hidden relative group hover:border-indigo-400/30 transition-all duration-500"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full group-hover:bg-indigo-500/20 transition-all duration-500" />
               <Cpu className="w-10 h-10 text-indigo-400 mb-6" />
               <h3 className="text-2xl font-bold text-white mb-3">Modern Tech</h3>
               <p className="text-zinc-400 leading-relaxed">Built on Next.js, React, and serverless architectures for limitless scalability.</p>
            </motion.div>

            {/* Bento Card 4: Wide */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#070B1A]/80 to-[#050508] p-8 md:p-10 overflow-hidden relative group hover:border-teal-400/30 transition-all duration-500"
            >
               <div className="absolute left-0 bottom-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full group-hover:bg-teal-500/20 transition-all duration-500" />
               <Terminal className="w-10 h-10 text-teal-400 mb-6" />
               <h3 className="text-2xl font-bold text-white mb-3">Clean & Maintainable Code</h3>
               <p className="text-zinc-400 max-w-md leading-relaxed">We don&apos;t just write code; we engineer architectures. You get fully documented, type-safe, and highly maintainable repositories.</p>
            </motion.div>
          </div>
        </div>

        {/* FAQs */}
        <div className="border-t border-white/[0.06] pt-24 mb-24">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Frequently Asked <span className="bg-gradient-to-r from-[#00E5FF] to-[#00E6B8] bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mt-2">FAQs</p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx
              return (
                <div key={idx} className="rounded-2xl border border-white/[0.06] bg-[#070B1A]/30 backdrop-blur-xl overflow-hidden hover:border-white/[0.12] transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left text-white"
                  >
                    <span className="font-semibold tracking-tight pr-4 text-sm md:text-base">{faq.question}</span>
                    <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.06] text-gray-400">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-1 text-gray-400 text-sm leading-relaxed border-t border-white/[0.03]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionCta
            title="Ready to Build Something Great?"
            description="Tell us about your project and let's create a solution that drives real results for your business."
            buttonLabel="Get Your Free Consultation"
          />
        </motion.div>

      </div>
    </div>
  )
}
