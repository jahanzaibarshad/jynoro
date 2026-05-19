'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center"
        style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
      >
        <div className="mb-6">
          <motion.div className="w-12 h-12 border-4 border-gray-600 border-t-indigo-500 rounded-full mx-auto animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-gray-300">Loading...</h2>
      </motion.div>
    </div>
  )
}
