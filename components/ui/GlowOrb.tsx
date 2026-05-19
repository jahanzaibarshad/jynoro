'use client'

import { motion } from 'framer-motion'

interface GlowOrbProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'indigo' | 'cyan' | 'purple'
  animate?: boolean
}

export default function GlowOrb({
  className = '',
  size = 'md',
  color = 'indigo',
  animate = true,
}: GlowOrbProps) {
  const sizes = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-96 h-96',
  }

  const colors = {
    indigo: 'from-indigo-600/40 to-indigo-500/20',
    cyan: 'from-cyan-600/40 to-cyan-500/20',
    purple: 'from-purple-600/40 to-purple-500/20',
  }

  return (
    <motion.div
      className={`${sizes[size]} ${colors[color]} rounded-full bg-gradient-to-br blur-3xl ${className}`}
      aria-hidden
      animate={
        animate
          ? {
              y: [0, -28, 0],
              opacity: [0.35, 0.7, 0.35],
              scale: [1, 1.2, 1],
            }
          : undefined
      }
      transition={
        animate ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : undefined
      }
    />
  )
}
