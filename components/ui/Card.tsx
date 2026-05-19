'use client'

import { CARD_BASE, CARD_GLASS } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glass?: boolean
}

export default function Card({ children, className = '', hover = true, glass = false }: CardProps) {
  return (
    <div
      className={`${CARD_BASE} ${glass ? CARD_GLASS : 'hover:bg-slate-800/70'} flex h-full flex-col ${
        hover ? 'hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/15' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
