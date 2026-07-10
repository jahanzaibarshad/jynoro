'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants'

const FacebookIcon = ({ size = 18, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = ({ size = 18, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const WhatsAppIcon = ({ size = 18, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const LinkedInIcon = ({ size = 18, ...props }: React.SVGProps<SVGSVGElement> & { size?: number | string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const iconMap = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedInIcon,
  Linkedin: LinkedInIcon,
  Email: Mail,
  WhatsApp: WhatsAppIcon,
  Mail,
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-[#050508] border-t border-white/[0.05] overflow-hidden">
      {/* Top subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[50px] bg-[#00E5FF]/5 blur-[40px] pointer-events-none rounded-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-24">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mb-16 md:grid-cols-12 md:gap-12">
          <motion.div
            className="flex flex-col items-center text-center sm:col-span-2 md:col-span-4 md:items-start md:text-left lg:col-span-5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ willChange: 'opacity, transform' }}
          >
            <div className="relative mb-6 h-12 w-44">
              <Image 
                src="/logo.webp" 
                alt="Jynoro Logo" 
                fill 
                className="object-contain object-center md:object-left" 
              />
            </div>
            <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-gray-400 md:mx-0">
              Empowering startups and enterprises with elite web apps, custom developer-grade software, and high-performance SEO operations.
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              {SOCIAL_LINKS.map((link) => {
                const Icon = iconMap[link.name as keyof typeof iconMap] || Mail
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-[#070B19]/80 border border-white/[0.06] text-gray-400 hover:text-[#00E5FF] transition-all duration-300 hover:border-[#00E5FF]/30 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                    aria-label={link.name}
                  >
                    <Icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
                  </a>
                )
              })}
            </div>

            {/* Newsletter Section */}
            <div className="mx-auto mt-8 w-full max-w-sm md:mx-0">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-3">Subscribe to our Newsletter</h4>
              <form className="flex flex-col items-stretch gap-2 min-[460px]:flex-row min-[460px]:items-center min-[460px]:justify-center md:justify-start" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  className="w-full rounded-lg border border-white/[0.08] bg-[#070B1A]/40 px-4 py-2.5 text-sm text-white outline-none transition-all focus:border-[#00E5FF]/50 focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] min-[460px]:max-w-[240px]"
                />
                <button 
                  type="submit" 
                  className="bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 border border-[#00E5FF]/30 hover:border-[#00E5FF]/50 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            className="text-center md:col-span-2 md:text-left lg:col-span-2"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group relative text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-block pb-1"
                  >
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00E5FF] to-[#4F8CFF] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="text-center md:col-span-3 md:text-left lg:col-span-2"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Resources</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group relative text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-block pb-1"
                  >
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00E5FF] to-[#4F8CFF] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="text-center md:col-span-3 md:text-left lg:col-span-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            style={{ willChange: 'opacity, transform' }}
          >
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Legal</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group relative text-gray-400 hover:text-white transition-colors duration-200 text-sm inline-block pb-1"
                  >
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#00E5FF] to-[#4F8CFF] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/[0.05] pt-8 text-center md:flex-row md:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 md:justify-start">
            <span>© {currentYear} Jynoro. All rights reserved.</span>

            <Link
              href="/admin/login"
              className="text-slate-800/20 hover:text-cyan-500/40 transition-colors ml-1"
              aria-label="Admin"
            >
              ·
            </Link>
          </div>
          <p className="flex flex-wrap items-center justify-center gap-1.5 text-sm font-medium text-gray-400 md:justify-end">
            <span>Crafted for high-growth businesses</span>
            <span className="text-red-500/80 animate-pulse">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
