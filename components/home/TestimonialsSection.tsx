'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { containerVariants, itemVariants } from '@/styles/animations'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, CARD_GRID } from '@/lib/utils'

export default function TestimonialsSection() {
  return (
    <section className={SECTION_CLASS}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <h2 className={`text-5xl md:text-6xl font-bold ${SECTION_HEADING} text-white`}>
            Client Success Stories
          </h2>
          <p className={`text-gray-300 text-lg max-w-2xl mx-auto ${SECTION_BODY}`}>
            Hear from the businesses we&apos;ve partnered with
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={CARD_GRID}
          style={{ transform: 'translateZ(0)' }}
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div key={idx} variants={itemVariants} style={{ willChange: 'opacity' }}>
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[number]
}) {
  return (
    <motion.div
      whileHover={{
        boxShadow: '0 10px 30px rgba(6, 182, 212, 0.12)',
        borderColor: 'rgba(6, 182, 212, 0.4)',
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-[280px] p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/30 border border-slate-700/30 flex flex-col h-full"
      style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-gray-300 mb-6 flex-grow leading-relaxed text-sm">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="border-t border-slate-700/30 mb-4" />
      <div className="flex items-center gap-3">
        <motion.div className="relative w-12 h-12 rounded-full flex-shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
        </motion.div>
        <div>
          <p className="font-semibold text-white text-sm">{testimonial.name}</p>
          <p className="text-xs text-gray-400">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}
