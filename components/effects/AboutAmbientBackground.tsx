'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { useReducedMotion } from '@/lib/hooks'

interface ColorSpot {
  left: number
  top: number
  fromX: number
  fromY: number
  driftX: number
  driftY: number
  delay: number
  duration: number
  tint: string
  size: number
}

const TINTS = [
  'rgba(99, 102, 241, 0.35)',
  'rgba(6, 182, 212, 0.28)',
  'rgba(139, 92, 246, 0.3)',
  'rgba(129, 140, 248, 0.32)',
  'rgba(34, 211, 238, 0.25)',
  'rgba(167, 139, 250, 0.28)',
]

function isInTextSafeZone(left: number, top: number) {
  return left > 28 && left < 72 && top > 20 && top < 75
}

function createSpot(index: number): ColorSpot {
  for (let attempt = 0; attempt < 20; attempt++) {
    const left = 5 + Math.random() * 88
    const top = 8 + Math.random() * 82
    if (isInTextSafeZone(left, top)) continue

    const angle = Math.random() * Math.PI * 2
    const distance = 80 + Math.random() * 160

    return {
      left,
      top,
      fromX: Math.cos(angle) * distance,
      fromY: Math.sin(angle) * distance,
      driftX: (Math.random() - 0.5) * 48,
      driftY: (Math.random() - 0.5) * 48,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8,
      tint: TINTS[index % TINTS.length],
      size: 140 + Math.random() * 120,
    }
  }

  return {
    left: index % 2 === 0 ? 8 : 82,
    top: 15 + index * 12,
    fromX: 100,
    fromY: -80,
    driftX: 20,
    driftY: -15,
    delay: index * 0.5,
    duration: 14,
    tint: TINTS[index % TINTS.length],
    size: 180,
  }
}

interface AboutAmbientBackgroundProps {
  paused?: boolean
}

export default function AboutAmbientBackground({ paused = false }: AboutAmbientBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const isPaused = paused || prefersReducedMotion
  const [spots, setSpots] = useState<ColorSpot[]>([])

  useEffect(() => {
    setSpots(Array.from({ length: 6 }, (_, i) => createSpot(i)))
  }, [])

  return (
    <div
      className={`about-ambient pointer-events-none absolute inset-0 z-0 overflow-hidden${isPaused ? ' about-ambient--static' : ''}`}
      aria-hidden
    >
      <div className="about-ambient__base" />
      {spots.map((spot, i) => (
        <div
          key={i}
          className="about-ambient__spot"
          style={
            {
              '--spot-left': `${spot.left}%`,
              '--spot-top': `${spot.top}%`,
              '--spot-size': `${spot.size}px`,
              '--spot-color': spot.tint,
              '--from-x': `${spot.fromX}px`,
              '--from-y': `${spot.fromY}px`,
              '--drift-x': `${spot.driftX}px`,
              '--drift-y': `${spot.driftY}px`,
              '--spot-delay': `${spot.delay}s`,
              '--spot-dur': `${spot.duration}s`,
            } as CSSProperties
          }
        />
      ))}
      <div className="about-ambient__scrim" />
    </div>
  )
}
