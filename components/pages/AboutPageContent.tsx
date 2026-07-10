'use client'

import { motion } from 'framer-motion'
import { Award, Briefcase, Target, Compass, User, Code2, TrendingUp, Sparkles, Globe, ShieldCheck, Users, CheckCircle, Cpu, Zap, LayoutDashboard } from 'lucide-react'
import SectionCta from '@/components/ui/SectionCta'
import { containerVariants, itemVariants } from '@/styles/animations'

const STATS = [
  {
    icon: Briefcase,
    value: '5+',
    label: 'Years of Experience',
    percentage: 85,
    color: '#00E5FF',
  },
  {
    icon: Award,
    value: '50+',
    label: 'Projects Delivered',
    percentage: 95,
    color: '#6C3DFF',
  },
  {
    icon: TrendingUp,
    value: '100%',
    label: 'Client Satisfaction',
    percentage: 100,
    color: '#00E6B8',
  },
] as const

export default function AboutPageContent() {
  return (
    <div className="relative min-h-screen bg-[#050508] py-24 md:py-32 overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(7,11,25,0.7),rgba(5,5,8,1))]" />
      <div className="absolute top-[20%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#6C3DFF]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-24 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            About <span className="bg-gradient-to-r from-[#00E5FF] via-[#4F8CFF] to-[#6C3DFF] bg-clip-text text-transparent">Jynoro</span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            A tech-driven development team building state-of-the-art web architectures that help businesses grow and scale with confidence.
          </motion.p>
        </div>

        {/* Radial Stats Gauges */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-28"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="relative rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-6 backdrop-blur-md overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.03),transparent_50%)]" />
                <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        className="stroke-white/5"
                        strokeWidth="7"
                        fill="transparent"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={stat.color}
                        strokeWidth="7"
                        fill="transparent"
                        strokeDasharray="251.2"
                        initial={{ strokeDashoffset: 251.2 }}
                        whileInView={{ strokeDashoffset: 251.2 - (251.2 * stat.percentage) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Icon className="h-5 w-5 text-gray-400 mb-0.5 group-hover:text-white transition-colors" />
                      <span className="text-xl font-bold text-white tracking-tight">{stat.value}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-tight">{stat.label}</h4>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Meet the Founders */}
        <div className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Meet The <span className="bg-gradient-to-r from-[#00E5FF] to-[#6C3DFF] bg-clip-text text-transparent">Founders</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest mt-2">
              THE VISIONARIES BEHIND JYNORO
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Founder 1: Jahanzaib */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="rounded-3xl border border-white/[0.08] bg-[#070B1A]/40 backdrop-blur-xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.4)] group hover:border-[#00E5FF]/40 transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00E5FF]/10 blur-[60px] pointer-events-none rounded-full transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
              <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00E5FF] via-[#4F8CFF] to-[#6C3DFF] animate-spin-slow opacity-60 blur-[2px]" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#050508] text-2xl font-bold text-white shadow-xl">
                      JA
                      <span className="absolute bottom-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E5FF] border border-[#050508]"></span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-[#00E5FF] transition-colors">Jahanzaib Arshad</h3>
                    <p className="text-sm font-mono text-cyan-400 mt-1">Founder and CEO</p>
                  </div>
                </div>
                <p className="leading-relaxed text-zinc-300 flex-grow mb-6">
                  Jahanzaib leads Jynoro's overall business strategy and client relations. With extensive experience in full-stack engineering and product scaling, he ensures every project aligns with the client's long-term business goals, delivering solutions that are both technically robust and commercially viable.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/[0.06]">
                  {[{ icon: Code2, label: 'Full-Stack' }, { icon: Target, label: 'Strategy' }, { icon: TrendingUp, label: 'Growth' }].map(({ icon: TagIcon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      <TagIcon className="h-3 w-3 text-[#00E5FF]" /> {label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Founder 2: Rehan */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              className="rounded-3xl border border-white/[0.08] bg-[#070B1A]/40 backdrop-blur-xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.4)] group hover:border-[#6C3DFF]/40 transition-colors duration-500"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#6C3DFF]/10 blur-[60px] pointer-events-none rounded-full transition-opacity duration-500 group-hover:opacity-100 opacity-50" />
              <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6C3DFF] via-[#4F8CFF] to-[#00E5FF] animate-spin-slow opacity-60 blur-[2px]" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#050508] text-2xl font-bold text-white shadow-xl">
                      RM
                      <span className="absolute bottom-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6C3DFF] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#6C3DFF] border border-[#050508]"></span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-[#6C3DFF] transition-colors">Rehan Munir</h3>
                    <p className="text-sm font-mono text-[#6C3DFF] mt-1">Chief Technology Officer</p>
                  </div>
                </div>
                <p className="leading-relaxed text-zinc-300 flex-grow mb-6">
                  Rehan drives the technological vision and architectural standards at Jynoro. As a technical leader, he oversees the engineering team, ensures the adoption of cutting-edge frameworks, and guarantees that all digital products meet the highest benchmarks for performance, security, and scalability.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/[0.06]">
                  {[{ icon: Cpu, label: 'Architecture' }, { icon: Zap, label: 'Performance' }, { icon: LayoutDashboard, label: 'Systems' }].map(({ icon: TagIcon, label }) => (
                    <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                      <TagIcon className="h-3 w-3 text-[#6C3DFF]" /> {label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Vision 2028 Section */}
        <div className="mb-28 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="rounded-3xl border border-white/[0.1] bg-[#070B1A]/60 p-8 md:p-14 backdrop-blur-xl relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.15),transparent_50%)] pointer-events-none" />
            
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6">
                <Globe className="h-4 w-4 text-[#00E5FF]" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#00E5FF] uppercase">Our Trajectory</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
                Vision <span className="bg-gradient-to-r from-[#00E5FF] via-[#4F8CFF] to-[#6C3DFF] bg-clip-text text-transparent">2028</span>
              </h2>
              
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-10 max-w-3xl mx-auto">
                By 2028, Jynoro will be recognized as a premier global digital transformation agency. We are rapidly scaling our engineering capabilities, expanding into advanced AI integrations, and setting new industry standards for performance-driven web architectures. Our ultimate goal is to empower 500+ global brands with technology that creates undeniable market advantages.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/[0.08] pt-10">
                {[
                  { value: 'Global', label: 'Client Reach' },
                  { value: 'AI-First', label: 'Architecture' },
                  { value: 'Premium', label: 'Delivery Standard' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                    <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why Clients Trust Us Section */}
        <div className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Why Clients <span className="bg-gradient-to-r from-[#00E5FF] to-[#6C3DFF] bg-clip-text text-transparent">Trust Us</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest mt-2">
              OUR CORE GUARANTEES
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Absolute Transparency',
                desc: 'No hidden fees, no tech jargon designed to confuse you. We communicate clearly, set realistic timelines, and keep you updated at every sprint.',
                color: '#00E5FF'
              },
              {
                icon: Sparkles,
                title: 'Engineering Excellence',
                desc: 'We do not cut corners. From pixel-perfect designs to robust backend architectures, we build scalable platforms that perform flawlessly.',
                color: '#4F8CFF'
              },
              {
                icon: Users,
                title: 'Long-Term Partnership',
                desc: 'We view ourselves as an extension of your team. Our success is directly tied to yours, which is why we offer ongoing support and scaling strategies.',
                color: '#6C3DFF'
              }
            ].map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                className="relative rounded-3xl border border-white/[0.06] bg-[#070B1A]/40 p-8 backdrop-blur-xl group hover:border-white/[0.12] transition-colors"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_60%)] pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div 
                  className="mb-6 inline-flex p-3 rounded-2xl border transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}10`, borderColor: `${feature.color}20` }}
                >
                  <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#00E5FF] transition-colors duration-300">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Proven Process */}
        <div className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Our Proven <span className="bg-gradient-to-r from-[#00E5FF] to-[#6C3DFF] bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-gray-400 text-sm font-mono uppercase tracking-widest mt-2">
              HOW WE TURN IDEAS INTO REALITY
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-[48px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent z-0" />
            
            {[
              { step: '01', title: 'Discovery', desc: 'We dive deep into your business goals, target audience, and technical requirements.' },
              { step: '02', title: 'Architecture', desc: 'Designing the blueprint—from user experience (UX) to database schemas and infrastructure.' },
              { step: '03', title: 'Engineering', desc: 'Writing clean, high-performance code using modern frameworks to build your product.' },
              { step: '04', title: 'Launch & Scale', desc: 'Rigorous testing, deployment, and ongoing support to ensure your product scales smoothly.' }
            ].map((process, idx) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full border border-white/10 bg-[#050508] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.05)] transition-all duration-500 group-hover:border-[#00E5FF]/40 group-hover:shadow-[0_0_40px_rgba(0,229,255,0.15)] group-hover:-translate-y-2">
                  <span className="text-2xl font-bold bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent font-mono group-hover:from-[#00E5FF] group-hover:to-[#4F8CFF] transition-colors duration-500">
                    {process.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00E5FF] transition-colors duration-300">{process.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-[250px]">{process.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionCta
            title={
              <>
                Ready to build something <span className="bg-gradient-to-r from-[#00E5FF] to-[#6C3DFF] bg-clip-text text-transparent">great</span>?
              </>
            }
            description="Tell us about your project and we'll help you bring your vision to life."
            buttonLabel="Get Your Free Consultation"
          />
        </motion.div>

      </div>
    </div>
  )
}
