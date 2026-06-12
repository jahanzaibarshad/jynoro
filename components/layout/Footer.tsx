'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, Globe } from 'lucide-react'
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants'

const iconMap = {
  Mail,
  Linkedin: Phone,
  Twitter: Globe,
  Email: Mail,
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ willChange: 'opacity' }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent mb-4">
              Jynoro
            </h3>
            <p className="text-gray-400 mb-4">Tech Solutions for Real Business Growth</p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap]
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.5, ease: 'easeOut' }}
            style={{ willChange: 'opacity' }}
          >
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.5, ease: 'easeOut' }}
            style={{ willChange: 'opacity' }}
          >
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.5, ease: 'easeOut' }}
            style={{ willChange: 'opacity' }}
          >
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-slate-700/50 pt-8">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="mb-0 text-sm text-gray-500 md:mb-0">
              © {currentYear} Jynoro. All rights reserved.{' '}
              <Link
                href="/admin/login"
                className="text-slate-800/80 hover:text-slate-600 transition-colors"
                aria-label="Admin"
              >
                ·
              </Link>
            </p>
            <p className="text-sm text-gray-500">Crafted with ❤️ for businesses that want to grow</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
