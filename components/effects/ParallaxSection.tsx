'use client'

import Image from 'next/image'
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
  tall = false,
}: ParallaxSectionProps) {
  const heightClass = tall ? 'min-h-[72vh] md:min-h-[78vh]' : 'min-h-0 py-20 md:py-28'

  return (
    <div id={id} className={`relative isolate overflow-hidden ${heightClass} ${className}`}>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={PARALLAX_BG_IMAGE}
          alt=""
          fill
          className="object-cover object-center opacity-85"
          sizes="100vw"
          quality={75}
          priority={false}
        />

        <div className="absolute inset-0 bg-[#080e26]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,rgba(7,11,26,0.5)_70%,rgba(5,5,8,0.9)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/10 via-transparent to-indigo-500/12" />

        <div className="absolute -left-24 top-[20%] h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute -right-16 bottom-[20%] h-72 w-72 rounded-full bg-[#00E5FF]/12 blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050508] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050508] to-transparent" />
      </div>

      <div className="relative z-10 flex w-full items-center px-4 py-12 md:px-6 md:py-16 lg:px-12 lg:px-24">
        <div className="w-full">{children}</div>
      </div>
    </div>
  )
}
