'use client'

import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
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
    'font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer'

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 hover:shadow-lg hover:shadow-indigo-500/50',
    secondary:
      'bg-cyan-500 hover:bg-cyan-400 text-white hover:shadow-lg hover:shadow-cyan-500/50',
    outline:
      'border-2 border-indigo-600 text-indigo-400 hover:bg-indigo-600/20 hover:border-indigo-400 hover:text-indigo-300 hover:shadow-lg hover:shadow-indigo-500/40',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
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
