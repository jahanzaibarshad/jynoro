'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING } from '@/lib/utils'

const SLIDE_INTERVAL_MS = 7000

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
    }, SLIDE_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [])

  const testimonial = TESTIMONIALS[activeIndex]

  return (
    <section className={SECTION_CLASS}>
      <div className="mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className={`text-5xl font-bold md:text-6xl ${SECTION_HEADING} text-white`}>
            Client Success Stories
          </h2>
          <p className={`mx-auto max-w-2xl text-lg text-gray-300 ${SECTION_BODY}`}>
            Real 5-star reviews from clients on Fiverr
          </p>
        </motion.div>

        <div className="relative mt-10 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="rounded-2xl border border-slate-700/30 bg-gradient-to-br from-slate-800/40 to-slate-900/30 p-8 md:p-10"
            >
              <div className="mb-4 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-center text-base leading-relaxed text-gray-300 md:text-lg">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="mt-8 border-t border-slate-700/30 pt-6 text-center">
                <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                <p className="mt-1 text-xs text-gray-400">{testimonial.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Show review ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                idx === activeIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
