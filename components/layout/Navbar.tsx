'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Search, X, Home, Cpu, Briefcase, User, BookOpen } from 'lucide-react'
import Button from '@/components/ui/Button'
import { NAV_LINKS } from '@/lib/constants'

/* ─── Premium Asymmetric Animated Hamburger Icon ─── */
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative flex h-5 w-5 flex-col items-end justify-center gap-[5px]">
      <span
        className={`block h-[1.5px] rounded-full bg-white transition-all duration-300 ease-out origin-right ${
          isOpen ? 'w-full -rotate-45 translate-x-[-1px] translate-y-[-1px]' : 'w-full'
        }`}
      />
      <span
        className={`block h-[1.5px] rounded-full bg-white transition-all duration-300 ease-out ${
          isOpen ? 'w-0 opacity-0' : 'w-2/3'
        }`}
      />
      <span
        className={`block h-[1.5px] rounded-full bg-white transition-all duration-300 ease-out origin-right ${
          isOpen ? 'w-full rotate-45 translate-x-[-1px] translate-y-[1px]' : 'w-full'
        }`}
      />
    </div>
  )
}

/* ─── Mobile Menu Item Animation Variants ─── */
const mobileMenuVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
  exit: { opacity: 0 },
}

const mobileItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.15 } },
}

const mobileIcons = [Home, Cpu, Briefcase, User, BookOpen]
const linkDetails = [
  "Main Landing Page",
  "Our Core Capabilities",
  "Selected Client Work",
  "Who We Are & Our Mission",
  "Insights, Guides & Tech News"
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const showSolidNav = !isHome || isScrolled || isOpen || isSearchOpen
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
    document.body.style.overflow = isOpen || isSearchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, isSearchOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false)
    }
    if (isSearchOpen) window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen])

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
        className="fixed top-0 right-0 left-0 z-50 px-2 pt-3 transition-[padding,transform] duration-500 sm:px-4 md:px-6 md:pt-6 lg:px-10"
      >
        <div
          className={`mx-auto flex min-h-[3.5rem] max-w-7xl items-center justify-between rounded-full border px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 sm:min-h-[3.75rem] sm:px-5 md:min-h-[4.5rem] md:px-6 md:py-2.5 lg:px-8 ${
            showSolidNav
              ? 'border-white/10 bg-[#070B1A]/80 shadow-[0_20px_70px_rgba(0,0,0,0.5)]'
              : 'border-white/10 bg-[#050508]/60 shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
          }`}
        >
          <Link
            href="/"
            className="group z-[60] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
            onClick={() => setIsOpen(false)}
            aria-label="Jynoro home"
          >
            <div className="relative h-9 w-32 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-36 md:h-12 md:w-44">
              <Image 
                src="/logo.webp" 
                alt="Jynoro Logo" 
                fill 
                className="object-contain object-left" 
                priority
              />
            </div>
          </Link>

          <div className="hidden items-center gap-5 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200 lg:text-base ${
                    isActive ? 'bg-[linear-gradient(90deg,#00E5FF,#4F8CFF)] bg-clip-text text-transparent' : 'text-zinc-400 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  <span
                    className={`absolute right-0 -bottom-0.5 left-0 h-px origin-left rounded-full bg-[linear-gradient(90deg,#00E5FF,#4F8CFF)] transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            })}
          </div>

          <div className="hidden items-center gap-3 lg:gap-4 md:flex">
            <button
              type="button"
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className="group flex h-10 w-10 lg:h-11 lg:w-11 items-center justify-center rounded-full border border-white/10 bg-[#050508]/60 text-zinc-400 transition-all duration-300 hover:border-[#00E5FF]/40 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
            >
              <Search size={18} className="transition-transform duration-300 group-hover:scale-110" />
            </button>



            <Link
              href="/contact"
              className="group ml-2 inline-flex min-h-10 lg:min-h-11 items-center justify-center gap-2 rounded-full border border-white/20 bg-[linear-gradient(110deg,#00E5FF_0%,#4F8CFF_48%,#6C3DFF_100%)] px-4 lg:px-6 text-sm lg:text-base font-semibold text-white shadow-[0_14px_34px_rgba(79,140,255,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(0,229,255,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF]"
            >
              Let&apos;s Work Together
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* ─── Futuristic Glowing Hamburger Button ─── */}
          <button
            type="button"
            data-menu-toggle
            onClick={() => setIsOpen(!isOpen)}
            className={`relative z-[70] flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 md:hidden cursor-pointer ${
              isOpen
                ? 'border-[#00E5FF]/50 bg-[#00E5FF]/10 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                : 'border-white/10 bg-[#070B1A]/80 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-[#00E5FF]/30'
            }`}
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <HamburgerIcon isOpen={isOpen} />
          </button>
        </div>
      </nav>

      {/* ─── Backdrop Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] bg-black/60 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* ─── Premium Mobile Drawer Menu ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-[56] flex h-[100dvh] w-[min(360px,88vw)] flex-col justify-between bg-[#070b1a] border-l border-white/[0.08] shadow-[0_0_80px_rgba(0,0,0,0.85)] md:hidden px-6 py-6 overflow-y-auto"
          >
            {/* Background Subtle Radial Glow */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_100%_0%,rgba(0,229,255,0.04),transparent_50%)] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/[0.06] pb-5 select-none">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <div className="relative h-8 w-28">
                  <Image 
                    src="/logo.webp" 
                    alt="Jynoro Logo" 
                    fill 
                    className="object-contain object-left" 
                    priority
                  />
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-400 hover:text-white transition-all cursor-pointer bg-white/[0.02]"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            {/* Navigation Links inside clean dashboard-style card items */}
            <motion.nav
              className="relative z-10 flex flex-col gap-3 my-6 flex-grow justify-center"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {NAV_LINKS.map((link, index) => {
                const isActive = pathname === link.href
                const Icon = mobileIcons[index % mobileIcons.length]
                return (
                  <motion.div key={link.name} variants={mobileItemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`group relative flex items-center justify-between rounded-xl border p-3.5 transition-all duration-300 ${
                        isActive
                          ? 'border-[#00E5FF]/20 bg-[#00E5FF]/[0.03]'
                          : 'border-transparent bg-transparent hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Icon container */}
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                          isActive 
                            ? 'bg-[#00E5FF]/10 border-[#00E5FF]/20 text-[#00E5FF]' 
                            : 'bg-[#070B1A]/80 border-white/5 text-zinc-400 group-hover:text-white'
                        }`}>
                          <Icon size={18} strokeWidth={1.8} />
                        </div>

                        {/* Text content */}
                        <div className="flex flex-col min-w-0">
                          <span className={`text-sm font-bold tracking-wide transition-colors duration-300 ${isActive ? 'text-[#00E5FF]' : 'text-zinc-200 group-hover:text-white'}`}>
                            {link.name}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors truncate">
                            {linkDetails[index]}
                          </span>
                        </div>
                      </div>

                      {/* Right action indicator */}
                      <ArrowUpRight 
                        size={16} 
                        className={`transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                          isActive ? 'text-[#00E5FF]' : 'text-zinc-500'
                        }`} 
                      />
                    </Link>
                  </motion.div>
                )
              })}
            </motion.nav>

            {/* Bottom area */}
            <div className="relative z-10 border-t border-white/[0.06] pt-5 flex flex-col gap-5 shrink-0">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Client Service Nodes</span>
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <a href="mailto:info@jynoro.com" className="hover:text-[#00E5FF] transition-colors font-semibold">info@jynoro.com</a>
                  <a href="https://wa.me/923361058649" className="hover:text-[#00E5FF] transition-colors font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center rounded-full text-sm font-bold shadow-[0_12px_30px_rgba(0,229,255,0.15)]">
                  Let&apos;s Work Together
                  <ArrowUpRight size={16} />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-24 md:pt-32 px-4 bg-[#050508]/60"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsSearchOpen(false)
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full max-w-2xl relative"
            >
              <div className="relative rounded-2xl border border-white/[0.08] bg-[#070B1A]/80 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex items-center">
                <Search className="absolute left-6 text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Search projects, services, or blog..."
                  className="w-full bg-transparent border-none py-3 md:py-4 pl-14 pr-12 text-white placeholder-zinc-500 focus:outline-none focus:ring-0 text-base md:text-lg font-medium"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 p-2 text-zinc-400 hover:text-white transition-colors rounded-xl hover:bg-white/[0.05]"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mt-4 text-center text-xs text-zinc-500 font-mono">
                Press Esc to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
