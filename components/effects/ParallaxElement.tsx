'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ParallaxElementProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export default function ParallaxElement({
  children,
  offset = 50,
  className = '',
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [parallaxY, setParallaxY] = React.useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const elementCenter = rect.top + rect.height / 2
      const windowCenter = window.innerHeight / 2
      const distance = elementCenter - windowCenter
      setParallaxY(distance * 0.1)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      ref={ref}
      style={{ y: parallaxY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
