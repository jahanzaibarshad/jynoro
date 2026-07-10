'use client'

import { useEffect, useMemo, useState } from 'react'
import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'

interface InteractiveParticlesProps {
  className?: string
}

// Stable initialization callback defined outside the component lifecycle to prevent duplicate runs
const initParticles = async (engine: Engine) => {
  await loadSlim(engine)
}

export default function InteractiveParticles({ className = '' }: InteractiveParticlesProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const options = useMemo(
    () => ({
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          push: {
            quantity: 5, // Increased quantity so each click feels impactful
          },
          grab: {
            distance: 140,
            links: {
              opacity: 0.35,
            },
          },
        },
      },
      particles: {
        color: {
          value: ['#00E5FF', '#4F8CFF', '#6C3DFF'],
        },
        links: {
          color: '#4F8CFF',
          distance: 140, // Slightly reduced to prevent O(N^2) connection lag
          enable: true,
          opacity: 0.22,
          width: 1.2,
        },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'out' as const,
          },
          random: false,
          speed: 0.7,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 1000, // Increased area so fewer particles spawn on huge screens
          },
          value: 40, // Reduced base count since they are bigger now
          limit: { value: 350 }, // Greatly increased cap: lets you click up to ~40 times before stopping, no lag because shadows are off
        },
        opacity: {
          value: { min: 0.25, max: 0.7 },
          animation: {
            enable: true,
            speed: 0.4,       // Slow, gentle breathing effect
            sync: false,
            startValue: 'random' as const,
          },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 3, max: 7 },
        },
        shadow: {
          enable: false, // Disabled canvas shadow — this is the #1 cause of lag on mobile/laptops
        },
        // NO `life` property — so default particles stay permanently.
        // The `limit` above prevents click-generated particles from accumulating endlessly.
      },
      detectRetina: true,
    }),
    []
  )

  if (isMobile) {
    return null
  }

  return (
    <div className={`absolute inset-0 pointer-events-auto ${className}`}>
      <ParticlesProvider init={initParticles}>
        <Particles
          id="tsparticles-hero"
          options={options}
          className="w-full h-full"
        />
      </ParticlesProvider>
    </div>
  )
}
