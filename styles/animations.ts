import type { Variants } from 'framer-motion'

const entryTransition = { duration: 0.5, ease: 'easeOut' as const }

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: entryTransition },
}

export const fadeInUp = fadeIn
export const fadeInDown = fadeIn
export const fadeInLeft = fadeIn
export const fadeInRight = fadeIn
export const slideInUp = fadeIn
export const scaleIn = fadeIn

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: entryTransition,
  },
}

export const staggerContainer = containerVariants
export const staggerItem = itemVariants

export const hoverGlow = {
  boxShadow: '0 0 15px rgba(79, 70, 229, 0.15)',
  borderColor: 'rgba(99, 102, 241, 0.5)',
  transition: { duration: 0.3, ease: 'easeOut' as const },
}

export const counterAnimation = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: entryTransition,
}
