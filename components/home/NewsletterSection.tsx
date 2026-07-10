'use client'

import { motion } from 'framer-motion'
import { Send, Mail } from 'lucide-react'

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-[#050508] py-16 md:py-24">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#6C3DFF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#070B1A]/60 p-5 text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-colors duration-500 hover:border-white/[0.12] sm:p-8 md:p-14"
        >
          {/* Tech accents */}
          <div className="absolute left-4 top-4 w-4 h-4 border-l-2 border-t-2 border-[#00E5FF]/45 rounded-tl transition-colors group-hover:border-[#00E5FF]" />
          <div className="absolute right-4 top-4 w-4 h-4 border-r-2 border-t-2 border-[#00E5FF]/45 rounded-tr transition-colors group-hover:border-[#00E5FF]" />
          <div className="absolute left-4 bottom-4 w-4 h-4 border-l-2 border-b-2 border-[#00E5FF]/45 rounded-bl transition-colors group-hover:border-[#00E5FF]" />
          <div className="absolute right-4 bottom-4 w-4 h-4 border-r-2 border-b-2 border-[#00E5FF]/45 rounded-br transition-colors group-hover:border-[#00E5FF]" />

          <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-[#00E5FF]/20 bg-[#00E5FF]/10 p-3 shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-transform duration-500 group-hover:scale-110 sm:mb-8 sm:p-4">
            <Mail className="h-7 w-7 text-[#00E5FF] sm:h-8 sm:w-8" />
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Subscribe to our <span className="bg-gradient-to-r from-[#00E5FF] to-[#6C3DFF] bg-clip-text text-transparent">Newsletter</span>
          </h2>
          
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Stay ahead of the curve. Get the latest insights on web architecture, design trends, and engineering best practices delivered straight to your inbox.
          </p>

          <form className="mx-auto flex max-w-md flex-col gap-3 sm:relative sm:block" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address..."
              className="h-13 w-full rounded-full border border-white/10 bg-[#050508]/80 px-5 text-sm text-white shadow-inner transition-all placeholder-zinc-500 focus:border-[#00E5FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00E5FF]/50 sm:h-14 sm:pl-6 sm:pr-36"
              required
            />
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#00E5FF,#4F8CFF)] px-6 font-semibold text-white shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] active:scale-[0.98] sm:absolute sm:bottom-1.5 sm:right-1.5 sm:top-1.5 sm:h-auto"
            >
              Subscribe <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </form>

          <p className="text-[11px] font-mono text-zinc-500 mt-6 uppercase tracking-widest">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
