export const hoverGlow = {
  boxShadow: '0 0 15px rgba(79, 70, 229, 0.15)',
  borderColor: 'rgba(99, 102, 241, 0.5)',
  transition: { duration: 0.3, ease: 'easeOut' as const },
}

export const fadeInView = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: 'easeOut' as const },
})

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}
