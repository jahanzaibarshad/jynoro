'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after 300px of scrolling
      const scrolled = window.scrollY
      if (scrolled > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }

      // Calculate scroll progress percentage
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      if (windowHeight > 0) {
        const progress = (scrolled / windowHeight) * 100
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Calculate SVG stroke offset based on percentage
  const radius = 20
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-6 z-40"
        >
          <button
            onClick={scrollToTop}
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#070B19]/80 border border-white/[0.08] text-[#00E5FF] shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#00E5FF]/40 hover:text-white group"
            aria-label="Scroll to top"
          >
            {/* SVG Circular Progress Track */}
            <svg className="absolute inset-0 h-full w-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-white/5"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="28"
                cy="28"
                r={radius}
                className="stroke-[#00E5FF] transition-all duration-100"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Icon */}
            <ArrowUp size={18} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
