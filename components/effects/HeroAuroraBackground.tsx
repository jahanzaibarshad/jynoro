'use client'

import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Braces, Code2, Cpu, Globe, Layers, Rocket, Sparkles, Workflow, Zap } from 'lucide-react'

interface HeroAuroraBackgroundProps {
  paused?: boolean
}

type HeroIcon = {
  Icon: LucideIcon
  size: number
  left: number
  top: number
  driftX: number
  driftY: number
  delay: number
  duration: number
  tint: string
  motion: 'float' | 'fade'
}

const HERO_ICONS: HeroIcon[] = [
  { Icon: Sparkles, size: 22, left: 10, top: 14, driftX: 4, driftY: -3, delay: 0, duration: 7, tint: 'rgba(34, 211, 238, 0.5)', motion: 'float' },
  { Icon: Globe, size: 22, left: 90, top: 13, driftX: -4, driftY: 4, delay: 1.2, duration: 8, tint: 'rgba(103, 232, 249, 0.48)', motion: 'fade' },
  { Icon: Code2, size: 24, left: 7, top: 30, driftX: 3, driftY: 4, delay: 0.6, duration: 7.5, tint: 'rgba(165, 180, 252, 0.45)', motion: 'float' },
  { Icon: Cpu, size: 22, left: 93, top: 29, driftX: -3, driftY: -3, delay: 2, duration: 8.5, tint: 'rgba(196, 181, 253, 0.42)', motion: 'fade' },
  { Icon: Zap, size: 20, left: 13, top: 20, driftX: -4, driftY: 3, delay: 1.8, duration: 6.5, tint: 'rgba(129, 140, 248, 0.4)', motion: 'float' },
  { Icon: Rocket, size: 24, left: 87, top: 19, driftX: 4, driftY: -4, delay: 2.5, duration: 7, tint: 'rgba(34, 211, 238, 0.48)', motion: 'float' },
  { Icon: Layers, size: 20, left: 24, top: 9, driftX: 3, driftY: 3, delay: 0.3, duration: 9, tint: 'rgba(167, 139, 250, 0.38)', motion: 'fade' },
  { Icon: Sparkles, size: 20, left: 76, top: 9, driftX: -3, driftY: 3, delay: 1.5, duration: 8, tint: 'rgba(6, 182, 212, 0.38)', motion: 'fade' },
  { Icon: Braces, size: 22, left: 9, top: 52, driftX: 4, driftY: -3, delay: 1.1, duration: 7.5, tint: 'rgba(165, 180, 252, 0.42)', motion: 'float' },
  { Icon: Workflow, size: 20, left: 12, top: 58, driftX: 3, driftY: 4, delay: 2.2, duration: 8, tint: 'rgba(139, 92, 246, 0.38)', motion: 'fade' },
  { Icon: Cpu, size: 22, left: 91, top: 53, driftX: -4, driftY: 3, delay: 0.8, duration: 7, tint: 'rgba(103, 232, 249, 0.42)', motion: 'float' },
  { Icon: Zap, size: 20, left: 88, top: 59, driftX: -3, driftY: -4, delay: 2.8, duration: 8.5, tint: 'rgba(129, 140, 248, 0.38)', motion: 'fade' },
]

export default function HeroAuroraBackground({ paused = false }: HeroAuroraBackgroundProps) {
  return (
    <div
      className={`hero-aurora pointer-events-none absolute inset-0 z-0 overflow-hidden${paused ? ' hero-aurora--static' : ''}`}
      aria-hidden
    >
      <div className="hero-aurora__base" />
      <div className="hero-aurora__blob hero-aurora__blob--1" />
      <div className="hero-aurora__blob hero-aurora__blob--2" />
      <div className="hero-aurora__blob hero-aurora__blob--3" />
      <div className="hero-aurora__blob hero-aurora__blob--4" />
      <div className="hero-aurora__blob hero-aurora__blob--5" />
      <div className="hero-aurora__ribbon" />
      <div className="hero-aurora__prism" />
      <div className="hero-aurora__pulse" />
      <div className="hero-aurora__pulse hero-aurora__pulse--2" />

      <div className="hero-aurora__icons">
        {HERO_ICONS.map((icon, i) => {
          const { Icon } = icon
          return (
            <div
              key={i}
              className={`hero-float-icon hero-float-icon--${icon.motion}`}
              style={
                {
                  '--icon-left': `${icon.left}%`,
                  '--icon-top': `${icon.top}%`,
                  '--drift-x': `${icon.driftX}px`,
                  '--drift-y': `${icon.driftY}px`,
                  '--icon-delay': `${icon.delay}s`,
                  '--icon-dur': `${icon.duration}s`,
                  color: icon.tint,
                } as CSSProperties
              }
            >
              <Icon size={icon.size} strokeWidth={1.35} />
            </div>
          )
        })}
      </div>

      <div className="hero-aurora__scrim" />
      <div className="hero-aurora__grain" />
      <div className="hero-aurora__vignette" />
    </div>
  )
}
