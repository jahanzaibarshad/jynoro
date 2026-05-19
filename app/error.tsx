'use client'

import { motion } from 'framer-motion'
import { RotateCcw, AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-md"
        style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
      >
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-8 text-lg">
          We encountered an unexpected error. Please try again or return to home.
        </p>
        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium py-3 px-6 rounded-lg hover:from-indigo-500 hover:to-indigo-400 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
          <a
            href="/"
            className="bg-slate-800 text-gray-300 font-medium py-3 px-6 rounded-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
          >
            Go Home
          </a>
        </div>
      </motion.div>
    </div>
  )
}
