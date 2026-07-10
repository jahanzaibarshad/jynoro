'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-dark'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'min-h-12 max-w-full font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-center leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#070B1A] disabled:pointer-events-none disabled:opacity-60'

  const variantStyles = {
    primary:
      'relative overflow-hidden border border-white/15 bg-[linear-gradient(110deg,#00E5FF_0%,#4F8CFF_48%,#6C3DFF_100%)] text-white shadow-[0_18px_44px_rgba(79,140,255,0.28)] before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-white/70 hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(0,229,255,0.24)]',
    secondary:
      'border border-[#00E5FF]/40 bg-[#00E5FF]/12 text-white shadow-[0_16px_34px_rgba(0,229,255,0.14)] hover:-translate-y-0.5 hover:border-[#00E5FF]/70 hover:bg-[#00E5FF]/18',
    outline:
      'border border-white/14 bg-white/[0.04] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-0.5 hover:border-[#00E5FF]/60 hover:bg-[#00E5FF]/8 hover:text-[#BDF7FF]',
    'outline-dark':
      'border border-[#101832]/15 bg-[#101832]/5 text-[#101832] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] hover:-translate-y-0.5 hover:border-[#4F8CFF]/60 hover:bg-[#4F8CFF]/6 hover:text-[#4F8CFF]',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm sm:px-6 sm:text-base',
    lg: 'px-5 py-3.5 text-sm sm:px-7 sm:py-4 sm:text-base md:px-8 md:text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
