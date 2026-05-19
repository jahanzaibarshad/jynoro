'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, Zap, Search, Shield, Smartphone, Gauge } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SectionCta from '@/components/ui/SectionCta'
import { containerVariants, itemVariants } from '@/styles/animations'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING, SECTION_CTA, CARD_GRID } from '@/lib/utils'

const iconMap = { Code2, Zap, Search, Shield, Smartphone, Gauge }

const services = [
  {
    id: 1,
    title: 'Web Development',
    icon: 'Code2' as const,
    description: 'Modern, responsive websites built with the latest technologies and best practices.',
    features: ['Responsive Design', 'Fast Loading Times', 'SEO Optimized', 'Mobile First Approach', 'Clean Code', 'Regular Updates'],
    price: 'Starting from $2,000',
  },
  {
    id: 2,
    title: 'Custom Web Apps',
    icon: 'Zap' as const,
    description: 'Tailored web applications for specific business needs and complex requirements.',
    features: ['Full Stack Development', 'Database Design', 'API Integration', 'User Authentication', 'Scalable Architecture', 'Real-time Features'],
    price: 'Starting from $5,000',
  },
  {
    id: 3,
    title: 'SEO Optimization',
    icon: 'Search' as const,
    description: 'Boost your online visibility with our comprehensive SEO strategies.',
    features: ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Content Strategy', 'Backlink Building', 'Monthly Analytics'],
    price: 'Starting from $1,000/month',
  },
  {
    id: 4,
    title: 'Maintenance & Support',
    icon: 'Gauge' as const,
    description: 'Ongoing support and maintenance to keep your digital presence running smoothly.',
    features: ['Security Updates', 'Performance Monitoring', 'Bug Fixes', '24/7 Support', 'Backup Management', 'Growth Optimization'],
    price: 'Starting from $500/month',
  },
  {
    id: 5,
    title: 'Mobile Optimization',
    icon: 'Smartphone' as const,
    description: 'Perfect mobile experience across all devices and screen sizes.',
    features: ['Responsive Design', 'Touch Optimization', 'Fast Mobile Loading', 'App-like Experience', 'Mobile Analytics', 'Progressive Enhancement'],
    price: 'Starting from $1,500',
  },
  {
    id: 6,
    title: 'E-Commerce Solutions',
    icon: 'Shield' as const,
    description: 'Full e-commerce platform setup with payment integration and inventory management.',
    features: ['Payment Gateway', 'Inventory System', 'Order Management', 'Security Compliance', 'Product Catalog', 'Analytics Dashboard'],
    price: 'Starting from $8,000',
  },
]

export default function ServicesPageContent() {
  return (
    <motion.div
      className={SECTION_CLASS}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h1 className={`text-5xl font-bold md:text-6xl ${SECTION_HEADING}`}>
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className={`mx-auto max-w-2xl text-xl text-gray-400 ${SECTION_BODY}`}>
            Comprehensive web solutions tailored to drive your business growth
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${CARD_GRID} ${SECTION_BODY}`}
          style={{ transform: 'translateZ(0)' }}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div key={service.id} variants={itemVariants} style={{ willChange: 'opacity' }}>
                <Card className="flex h-full flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-500/20 p-3">
                      <Icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white md:text-2xl">{service.title}</h3>
                  </div>
                  <p className="mb-6 flex-grow text-gray-400">{service.description}</p>
                  <div className="mb-6">
                    <h4 className="mb-3 text-sm font-semibold text-indigo-400">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto border-t border-slate-700/50 pt-6">
                    <p className="mb-4 text-center font-semibold text-indigo-400">{service.price}</p>
                    <Link href="/contact" className="flex justify-center">
                      <Button variant="primary" className="w-full min-w-[200px] sm:w-auto sm:min-w-[220px]">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={SECTION_CTA}
          style={{ willChange: 'opacity' }}
        >
          <SectionCta
            title="Need a Custom Solution?"
            description="We can combine services or build custom solutions for your unique business needs."
            buttonLabel="Get Your Free Consultation"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
