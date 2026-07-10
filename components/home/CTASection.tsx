'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, MessageCircle, Rocket } from 'lucide-react'
import Button from '@/components/ui/Button'
import GlowOrb from '@/components/ui/GlowOrb'
import { useMagneticButton } from '@/lib/hooks'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, SECTION_CTA } from '@/lib/utils'

export default function CTASection() {
  const startBtnRef = useRef<HTMLDivElement>(null)
  const viewWorkBtnRef = useRef<HTMLDivElement>(null)
  
  useMagneticButton(startBtnRef, 25)
  useMagneticButton(viewWorkBtnRef, 25)

  return (
    <section className={`${SECTION_CLASS} bg-gradient-to-b from-[#070b19] via-[#050508] to-[#050508] overflow-hidden`}>
      {/* Background glow orbs for premium tech feel */}
      <GlowOrb size="md" color="indigo" className="absolute -left-20 top-[10%] opacity-20" />
      <GlowOrb size="md" color="cyan" className="absolute -right-20 bottom-[10%] opacity-15" />
      
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.05),transparent_60%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{
            boxShadow: '0 30px 60px -15px rgba(0, 229, 255, 0.12)',
            borderColor: 'rgba(0, 229, 255, 0.35)',
          }}
          className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070B1A]/40 p-5 transition-all duration-300 sm:p-6 md:p-8 lg:p-10"
          style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
        >
          {/* Inner glass overlay & custom glowing meshes */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 to-[#070B1A]/40 backdrop-blur-xl z-0" />
          <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/15 transition-colors duration-500 pointer-events-none z-0" />
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#6C3DFF]/10 blur-3xl group-hover:bg-[#6C3DFF]/15 transition-colors duration-500 pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.12),transparent_60%)] pointer-events-none z-0" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] opacity-10 pointer-events-none z-0" />

          {/* Futuristic corner ornaments */}
          <div className="absolute left-4 top-4 w-4 h-4 border-l-2 border-t-2 border-white/10 rounded-tl pointer-events-none z-10" />
          <div className="absolute right-4 top-4 w-4 h-4 border-r-2 border-t-2 border-white/10 rounded-tr pointer-events-none z-10" />
          <div className="absolute left-4 bottom-4 w-4 h-4 border-l-2 border-b-2 border-white/10 rounded-bl pointer-events-none z-10" />
          <div className="absolute right-4 bottom-4 w-4 h-4 border-r-2 border-b-2 border-white/10 rounded-br pointer-events-none z-10" />

          <div className="relative z-10 flex w-full flex-col gap-8 lg:gap-14">
            
            {/* Top Section: CTA Title and Action buttons */}
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center sm:gap-6">
              <div>
                <div className="inline-block rounded-full border border-[#00E5FF]/20 bg-[#050508]/80 px-3 py-1.5 text-xs font-semibold text-[#00E5FF] shadow-none backdrop-blur-md sm:px-4">
                  ✨ Ready to Transform Your Business?
                </div>
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  Let&apos;s Build Something
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-indigo-400 to-[#6C3DFF]">
                    Extraordinary
                  </span>
                </h2>
              </div>

              <p className="text-zinc-300 text-base lg:text-lg leading-relaxed max-w-2xl">
                Partner with Jynoro to create digital solutions that deliver real business results. From vision to execution, we&apos;re committed to your success.
              </p>

              <div className="mt-2 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                <div ref={startBtnRef} className="inline-flex w-full sm:w-auto">
                  <Link href="/contact" className="inline-flex w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="group w-full justify-center sm:w-auto">
                      <Rocket size={20} />
                      Let&apos;s Start Your Project
                      <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                <div ref={viewWorkBtnRef} className="inline-flex w-full sm:w-auto">
                  <Link href="/portfolio" className="inline-flex w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full justify-center sm:w-auto">
                      View Our Work
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Section: 50/50 Cards */}
            <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              {/* Process Flow Card */}
              <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-white/[0.06] bg-[#050508]/70 p-5 backdrop-blur-md sm:p-6 md:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.03),transparent_50%)]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-white/[0.06] pb-3 font-mono text-center md:text-left">
                  Our Launch Process
                </h3>
                
                <div className="relative space-y-8 pl-8 text-left">
                  {/* Vertical Connector Path */}
                  <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gradient-to-b from-[#00E5FF] via-indigo-500 to-[#6C3DFF] opacity-40" />

                  {/* Step 1 */}
                  <div className="relative group/step">
                    <span className="absolute -left-[27px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-[#00E5FF]/30 bg-[#050508] text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.2)]">
                      <MessageCircle className="w-3.5 h-3.5 animate-pulse" />
                    </span>
                    <div>
                      <p className="text-xs font-mono font-bold text-[#00E5FF]">Step 01 / Alignment</p>
                      <h4 className="text-sm font-bold text-white mt-0.5">Discovery Call</h4>
                      <p className="text-xs text-zinc-400 mt-1">Scope out project objectives, tech stack, and roadmap (30 mins).</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative group/step">
                    <span className="absolute -left-[27px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-indigo-500/30 bg-[#050508] text-indigo-400">
                      <Zap className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-mono font-bold text-indigo-400">Step 02 / Design</p>
                      <h4 className="text-sm font-bold text-white mt-0.5">Rapid Prototyping</h4>
                      <p className="text-xs text-zinc-400 mt-1">Interactive Figma layouts and visual wireframes finalized (1-2 weeks).</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative group/step">
                    <span className="absolute -left-[27px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-[#6C3DFF]/30 bg-[#050508] text-[#6C3DFF]">
                      <Rocket className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-mono font-bold text-[#6C3DFF]">Step 03 / Launch</p>
                      <h4 className="text-sm font-bold text-white mt-0.5">Engineering & Handover</h4>
                      <p className="text-xs text-zinc-400 mt-1">Production-ready Next.js layout, SEO optimization, and launch (2-4 weeks).</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Premium Image Card */}
              <div className="relative flex min-h-[240px] items-stretch overflow-hidden rounded-3xl border border-white/[0.06] bg-[#050508]/40 lg:h-full">
                <Image
                  src="/images/homepage last.webp"
                  alt="Launch your project with Jynoro"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
