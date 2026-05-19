'use client'

import { motion } from 'framer-motion'
import { Code2, Zap, Search, Shield } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { containerVariants, itemVariants } from '@/styles/animations'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, CARD_GRID } from '@/lib/utils'

const iconMap = {
  Code2,
  Zap,
  Search,
  Shield,
}

export default function ServicesSection() {
  return (
    <section id="services" className={SECTION_CLASS}>
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          <h2 className={`text-5xl md:text-6xl font-bold ${SECTION_HEADING} text-white`}>
            Our Services
          </h2>
          <p className={`text-gray-300 text-lg max-w-2xl mx-auto ${SECTION_BODY}`}>
            Comprehensive, world-class web solutions crafted with attention to every detail
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={CARD_GRID}
          style={{ transform: 'translateZ(0)' }}
        >
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <motion.div key={service.id} variants={itemVariants} style={{ willChange: 'opacity' }}>
                <motion.div
                  whileHover={{
                    boxShadow: '0 10px 30px rgba(79, 70, 229, 0.15)',
                    borderColor: 'rgba(99, 102, 241, 0.4)',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="min-h-[280px] p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/30 border border-slate-700/30 h-full"
                  style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
                >
                  <div className="p-4 bg-gradient-to-br from-indigo-600/20 to-indigo-500/10 rounded-lg inline-flex mb-6">
                    <Icon className="w-7 h-7 text-indigo-300" />
                  </div>
                  <h3 className="font-semibold text-xl text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{service.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
