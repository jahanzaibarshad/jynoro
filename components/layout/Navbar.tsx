'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const showSolidNav = !isHome || isScrolled
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 56)
        ticking = false
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        !(target as Element).closest?.('[data-menu-toggle]')
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          showSolidNav
            ? 'border-b border-slate-800/40 bg-slate-900/90 shadow-sm shadow-slate-900/20 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent shadow-none backdrop-blur-none'
        }`}
      >
        <div className="mx-auto flex min-h-[5.25rem] max-w-7xl items-center justify-between px-4 py-5 md:px-8 md:py-6 lg:px-10">
          <Link href="/" className="z-[60] flex items-center" onClick={() => setIsOpen(false)}>
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-[2rem]">
              Jynoro
            </span>
          </Link>

          <div className="hidden items-center gap-10 md:flex lg:gap-12">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link key={link.name} href={link.href}>
                  <span
                    className={`text-base font-semibold tracking-wide transition-colors duration-200 lg:text-lg ${
                      isActive ? 'text-cyan-400' : 'text-gray-200 hover:text-cyan-400'
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="hidden md:block">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Let&apos;s Work Together
              </Button>
            </Link>
          </div>

          {/* Mobile menu toggle — in navbar flow (not covered by drawer) */}
          <button
            type="button"
            data-menu-toggle
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-slate-800/60 hover:text-white md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <motion.div
        id="mobile-drawer"
        ref={drawerRef}
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed top-0 right-0 z-[56] flex h-full w-[min(320px,85vw)] flex-col overflow-y-auto border-l border-slate-800/40 bg-slate-900/98 shadow-2xl backdrop-blur-xl md:hidden"
      >
        {/* Drawer header with close button */}
        <div className="flex min-h-[5.25rem] shrink-0 items-center justify-between border-b border-slate-800/60 px-5 py-4">
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-lg font-bold text-transparent">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition-colors hover:bg-slate-800 hover:text-white"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`border-b border-slate-800/60 px-6 py-4 text-lg transition-colors ${
                  isActive
                    ? 'border-l-4 border-l-cyan-400 bg-cyan-400/5 text-cyan-400'
                    : 'border-l-4 border-l-transparent text-gray-300 hover:bg-slate-800/40 hover:text-cyan-400'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-slate-800/40 p-6">
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <Button variant="primary" size="md" className="w-full justify-center">
              Let&apos;s Work Together
            </Button>
          </Link>
        </div>
      </motion.div>
    </>
  )
}
