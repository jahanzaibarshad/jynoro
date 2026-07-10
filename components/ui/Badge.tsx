'use client'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'primary-light' | 'secondary-light' | 'success-light' | 'warning-light'
  className?: string
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    secondary: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    'primary-light': 'bg-indigo-50 text-indigo-600 border border-indigo-200/60',
    'secondary-light': 'bg-cyan-50 text-cyan-700 border border-cyan-200/60',
    'success-light': 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    'warning-light': 'bg-amber-50 text-amber-700 border border-amber-200/60',
  }

  return <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>{children}</span>
}
