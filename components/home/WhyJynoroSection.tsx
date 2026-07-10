'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Lightbulb, Clock, Sparkles } from 'lucide-react'
import { WHY_JYNORO } from '@/lib/constants'
import GlowOrb from '@/components/ui/GlowOrb'

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
    <div className="relative mx-auto w-full max-w-7xl overflow-hidden py-4">
      {/* Background glow orbs for premium tech feel */}
      <GlowOrb size="md" color="indigo" className="absolute -left-20 top-[10%] opacity-20" />
      <GlowOrb size="md" color="cyan" className="absolute -right-20 bottom-[10%] opacity-15" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
        
        {/* Left Column: Bold Statement & Engineering Dial Widget */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div>
              <div className={`mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#050508]/60 px-5 py-2.5 text-sm font-semibold text-[#00E5FF] shadow-none`}>
                <Sparkles className="h-4 w-4 text-[#00E5FF]" />
                Built for growth
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-[#00E5FF] via-indigo-400 to-[#6C3DFF] bg-clip-text text-transparent">
                  Jynoro
                </span>
                ?
              </h2>
              <p className="mt-5 text-zinc-300 text-base lg:text-lg leading-relaxed max-w-lg">
                We&apos;re committed to delivering exceptional results and driving real business growth with state-of-the-art web architectures.
              </p>
            </div>

            {/* Interactive Performance Dial Widget */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-6 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.04),transparent_50%)]" />
              
              <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                {/* SVG Dial */}
                <div className="relative w-28 h-28 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="stroke-white/5" strokeWidth="8" fill="transparent" />
                    <motion.circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      className="stroke-[#00E5FF]" 
                      strokeWidth="8" 
                      fill="transparent" 
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      whileInView={{ strokeDashoffset: 251.2 - (251.2 * 99) / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white leading-none">99</span>
                    <span className="text-[7.5px] font-mono text-zinc-400 uppercase tracking-widest mt-1">Speed Score</span>
                  </div>
                </div>

                {/* Micro Stats List */}
                <div className="flex-1 w-full space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-1.5">
                    <span className="text-zinc-500 uppercase tracking-wider">LCP Speed</span>
                    <span className="text-[#00E5FF] font-bold">0.4s</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/[0.04] pb-1.5">
                    <span className="text-zinc-500 uppercase tracking-wider">SEO Score</span>
                    <span className="text-white font-bold">100/100</span>
                  </div>
                  <div className="flex justify-between items-center pb-0.5">
                    <span className="text-zinc-500 uppercase tracking-wider">Uptime Rate</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      99.9%
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Right Column: Interactive Staggered rows */}
        <div className="lg:col-span-7">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col"
          >
            {WHY_JYNORO.map((benefit, idx) => (
              <motion.div key={idx} variants={itemVariants} style={{ willChange: 'opacity' }}>
                <BenefitRow 
                  benefit={benefit} 
                  index={idx}
                  icon={iconMap[benefit.icon as keyof typeof iconMap]} 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}

function BenefitRow({
  benefit,
  index,
  icon: Icon,
}: {
  benefit: (typeof WHY_JYNORO)[number]
  index: number
  icon: React.ComponentType<{ className?: string }>
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex gap-6 p-6 md:p-8 rounded-2xl border border-transparent transition-all duration-300 hover:bg-[#070B1A]/40 hover:border-white/[0.04]"
    >
      {/* Pulse Icon Badge */}
      <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00E5FF]/20 bg-[#00E5FF]/10 text-[#00E5FF] shadow-[0_8px_24px_rgba(0,229,255,0.08)] transition-all duration-300 group-hover:scale-110 group-hover:border-[#00E5FF]/40 group-hover:bg-[#00E5FF]/15">
        <Icon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-6" />
      </div>

      {/* Content */}
      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-xs font-mono font-bold opacity-30 text-[#00E5FF]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
            {benefit.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-zinc-400">
          {benefit.description}
        </p>
      </div>

      {/* Interactive Divider Line */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-white/[0.04]" />
      <div 
        className="absolute bottom-0 left-6 right-6 h-[1.5px] origin-left scale-x-0 transition-transform duration-500"
        style={{ 
          background: 'linear-gradient(90deg, #00E5FF, transparent)',
          transform: isHovered ? 'scale-x(1)' : 'scale-x(0)'
        }}
      />
    </div>
  )
}
