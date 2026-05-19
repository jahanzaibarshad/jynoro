'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks'
import { PARALLAX_BG_IMAGE } from '@/lib/constants'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  tall?: boolean
}

export default function ParallaxSection({
  children,
  className = '',
  id,
  tall = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-22%', '22%'])
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.14])
  const staticBg = prefersReducedMotion

  const heightClass = tall ? 'min-h-[88vh] md:min-h-[92vh]' : 'min-h-[60vh]'

  return (
    <div
      id={id}
      ref={ref}
      className={`relative isolate overflow-hidden ${heightClass} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <motion.div
          className="absolute left-0 w-full"
          style={
            staticBg
              ? { top: 0, height: '100%' }
              : {
                  top: '-18%',
                  height: '136%',
                  y: backgroundY,
                  scale: backgroundScale,
                  transformOrigin: 'center center',
                }
          }
        >
          <Image
            src={PARALLAX_BG_IMAGE}
            alt=""
            fill
            className="object-cover object-center saturate-[1.15] contrast-[1.05]"
            sizes="100vw"
            quality={82}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_75%_at_50%_40%,transparent_0%,rgba(15,23,42,0.3)_55%,rgba(2,6,23,0.7)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/25 via-transparent to-cyan-500/20" />

        <div className="parallax-orb absolute -left-24 top-[18%] h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl" />
        <div className="parallax-orb parallax-orb-delay absolute -right-16 bottom-[22%] h-80 w-80 rounded-full bg-cyan-500/25 blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950 via-slate-950/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      <div className="relative z-10 flex w-full items-center px-4 py-16 md:px-6 md:py-24 lg:px-12 lg:px-24">
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
