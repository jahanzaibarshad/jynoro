'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING } from '@/lib/utils'

const SLIDE_INTERVAL_MS = 6000

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(3)
      } else if (window.innerWidth >= 768) {
        setVisibleItems(2)
      } else {
        setVisibleItems(1)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleItems)

  useEffect(() => {
    if (maxIndex === 0) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, SLIDE_INTERVAL_MS)

    return () => clearInterval(timer)
  }, [maxIndex, currentIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50
    const offset = info.offset.x
    if (offset < -swipeThreshold) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    } else if (offset > swipeThreshold) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  return (
    <section className={`${SECTION_CLASS} bg-gradient-to-b from-[#050508] via-slate-950 to-[#070b19]`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.06),transparent_60%)]" />
      
      <div className="mx-auto w-full max-w-7xl relative z-10">
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
          <p className={`mx-auto max-w-2xl text-lg text-zinc-300 ${SECTION_BODY}`}>
            Real 5-star reviews from clients on Fiverr
          </p>
        </motion.div>

        {/* Review Carousel Viewport */}
        <div className="relative mt-12 px-2 sm:px-12">
          
          {/* Manual Arrow Buttons */}
          <button 
            type="button"
            onClick={handlePrev}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 bg-[#050508]/80 text-zinc-400 hover:text-white hover:border-[#00E5FF]/40 hover:bg-[#070B1A] flex items-center justify-center transition-all cursor-pointer z-20 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button 
            type="button"
            onClick={handleNext}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/10 bg-[#050508]/80 text-zinc-400 hover:text-white hover:border-[#00E5FF]/40 hover:bg-[#070B1A] flex items-center justify-center transition-all cursor-pointer z-20 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Draggable Carousel Track */}
          <div className="overflow-hidden w-full py-4 relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="flex cursor-grab active:cursor-grabbing"
              animate={{ x: `-${currentIndex * (100 / TESTIMONIALS.length)}%` }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              style={{ width: `${(TESTIMONIALS.length / visibleItems) * 100}%` }}
            >
              {TESTIMONIALS.map((testi, idx) => (
                <div 
                  key={idx} 
                  style={{ width: `${(1 / TESTIMONIALS.length) * 100}%` }}
                  className="px-3 shrink-0"
                >
                  <div className="relative h-full rounded-2xl border border-white/[0.08] bg-[#070B1A]/50 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,229,255,0.02)] backdrop-blur-xl hover:border-[#00E5FF]/30 transition-all duration-300 flex flex-col justify-between select-none">
                    
                    {/* Tech Corner Ornaments */}
                    <div className="absolute left-3 top-3 w-3.5 h-3.5 border-l border-t border-[#00E5FF]/40 rounded-tl pointer-events-none" />
                    <div className="absolute right-3 top-3 w-3.5 h-3.5 border-r border-t border-[#00E5FF]/40 rounded-tr pointer-events-none" />
                    <div className="absolute left-3 bottom-3 w-3.5 h-3.5 border-l border-b border-[#00E5FF]/40 rounded-bl pointer-events-none" />
                    <div className="absolute right-3 bottom-3 w-3.5 h-3.5 border-r border-b border-[#00E5FF]/40 rounded-br pointer-events-none" />

                    <div>
                      {/* Verified customer badge */}
                      <div className="mb-4 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Verified Fiverr Review</span>
                      </div>

                      <div className="mb-4 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <p className="text-left text-sm leading-relaxed text-zinc-200 italic">
                        &ldquo;{testi.content}&rdquo;
                      </p>
                    </div>

                    <div className="mt-6 border-t border-white/[0.06] pt-4 text-left">
                      <p className="text-xs font-bold text-[#00E5FF]">{testi.name}</p>
                      <p className="mt-0.5 text-[10px] text-zinc-500">{testi.role}</p>
                    </div>

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Auto-play Timer Progress Bar (Centred below Carousel) */}
          <div className="max-w-xs mx-auto h-[2px] bg-white/5 rounded-full overflow-hidden mt-2 relative">
            <motion.div 
              key={currentIndex}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: 'linear' }}
              className="h-full bg-gradient-to-r from-[#00E5FF] via-indigo-500 to-[#6C3DFF]"
            />
          </div>
        </div>

        {/* Quick-Jump Reviewer badges index */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto px-4">
          {TESTIMONIALS.map((testi, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(Math.min(idx, maxIndex))}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                idx === currentIndex 
                  ? 'border-[#00E5FF]/45 bg-[#00E5FF]/10 text-[#00E5FF]' 
                  : 'border-white/5 bg-[#070B1A]/40 text-zinc-400 hover:text-white hover:border-white/10'
              }`}
            >
              {testi.name}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}


