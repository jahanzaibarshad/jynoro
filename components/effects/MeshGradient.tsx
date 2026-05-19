'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks'

/** Organic mesh blobs — ellipses grow & drift (hero background) */
export default function MeshGradient() {
  const prefersReducedMotion = useReducedMotion()
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute h-full w-full"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="meshNoise" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" />
          </filter>
        </defs>

        <motion.ellipse
          cx={200}
          cy={100}
          rx={300}
          ry={200}
          fill="rgba(79, 70, 229, 0.2)"
          filter="url(#meshNoise)"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  cx: [200, 270, 200],
                  cy: [100, 170, 100],
                  rx: [280, 380, 280],
                  ry: [180, 280, 180],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse
          cx={1000}
          cy={700}
          rx={350}
          ry={250}
          fill="rgba(6, 182, 212, 0.16)"
          filter="url(#meshNoise)"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  cx: [1000, 920, 1000],
                  cy: [700, 620, 700],
                  rx: [320, 420, 320],
                  ry: [220, 320, 220],
                }
          }
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
        <motion.ellipse
          cx={600}
          cy={400}
          rx={200}
          ry={150}
          fill="rgba(139, 92, 246, 0.12)"
          filter="url(#meshNoise)"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  cx: [600, 520, 600],
                  cy: [400, 480, 400],
                  rx: [180, 280, 180],
                  ry: [130, 220, 130],
                }
          }
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
        />
      </svg>

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,23,42,0.35)_100%)]"
        animate={prefersReducedMotion ? undefined : { opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
