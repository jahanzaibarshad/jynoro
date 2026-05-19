'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, MessageCircle, Rocket } from 'lucide-react'
import Button from '@/components/ui/Button'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, SECTION_CTA } from '@/lib/utils'

export default function CTASection() {
  return (
    <section className={SECTION_CLASS}>
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{
            boxShadow: '0 10px 30px rgba(6, 182, 212, 0.12)',
            borderColor: 'rgba(6, 182, 212, 0.4)',
          }}
          className="relative rounded-2xl overflow-hidden p-6 md:p-8 lg:p-12 border border-slate-700/30"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 to-slate-900/40" />
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
              className={`inline-block ${SECTION_CTA} bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium`}
              style={{ willChange: 'opacity' }}
            >
              ✨ Ready to Transform Your Business?
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
              className={`text-4xl md:text-6xl font-bold ${SECTION_HEADING} leading-tight text-white`}
              style={{ willChange: 'opacity' }}
            >
              Let&apos;s Build Something
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Extraordinary
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
              className={`text-gray-300 text-lg ${SECTION_BODY} max-w-3xl mx-auto leading-relaxed`}
              style={{ willChange: 'opacity' }}
            >
              Partner with Jynoro to create digital solutions that deliver real business results. From vision to execution, we&apos;re committed to your success.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${SECTION_CTA}`}
              style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
            >
              <Link href="/contact" className="inline-flex">
                <Button variant="primary" size="lg" className="group">
                  <Rocket size={20} />
                  Let&apos;s Start Your Project
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/portfolio" className="inline-flex">
                <Button variant="secondary" size="lg">
                  View Our Work
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-700/30"
              style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
            >
              {[
                { icon: Zap, label: 'Fast Turnaround', desc: '2-4 weeks' },
                { icon: MessageCircle, label: 'Expert Support', desc: 'Always here for you' },
                { icon: Rocket, label: 'Premium Quality', desc: 'Production-ready' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 + idx * 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                  style={{ willChange: 'opacity' }}
                >
                  <div className="p-3 bg-indigo-500/20 rounded-lg mb-3">
                    <item.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <p className="font-semibold text-white">{item.label}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
