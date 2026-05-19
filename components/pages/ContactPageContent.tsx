'use client'

import { motion } from 'framer-motion'
import ContactForm from '@/components/sections/ContactForm'
import { containerVariants, itemVariants } from '@/styles/animations'
import { SECTION_CLASS, SECTION_BODY, SECTION_HEADING } from '@/lib/utils'

export default function ContactPageContent() {
  return (
    <motion.div
      className={SECTION_CLASS}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
    >
      <motion.div className="max-w-7xl mx-auto w-full">
        <div className="text-center">
          <h1 className={`text-5xl md:text-6xl font-bold ${SECTION_HEADING}`}>
            Get Your Free <span className="text-gradient">Consultation</span>
          </h1>
          <p className={`text-xl text-gray-400 max-w-2xl mx-auto ${SECTION_BODY}`}>
            Tell us about your project and we&apos;ll help you find the perfect solution
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${SECTION_BODY}`}
          style={{ transform: 'translateZ(0)' }}
        >
          {[
            { icon: '📧', title: 'Email', value: 'hello@jynoro.com' },
            { icon: '💬', title: 'WhatsApp', value: 'Quick consultation' },
            { icon: '🚀', title: 'Response Time', value: 'Within 24 hours' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="min-h-[140px] rounded-2xl p-6 md:p-8 bg-slate-800/50 backdrop-blur border border-slate-700/50 text-center"
              style={{ willChange: 'opacity' }}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-white mb-1">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <ContactForm />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-4xl mx-auto mt-16"
          style={{ willChange: 'opacity' }}
        >
          <h2 className={`text-3xl font-bold ${SECTION_HEADING} text-center`}>Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                question: 'How long does it take to get a response?',
                answer:
                  'We typically respond within 24 hours during business days. For urgent matters, feel free to WhatsApp us!',
              },
              {
                question: 'Do you offer support after project completion?',
                answer:
                  'Yes! We offer ongoing maintenance and support packages to ensure your website runs smoothly.',
              },
              {
                question: 'What is your development process?',
                answer:
                  'We follow agile methodology with regular check-ins, transparent communication, and iterative development.',
              },
              {
                question: 'Can you work with my existing team?',
                answer:
                  'Absolutely! We can integrate with your team and follow your development standards and practices.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
                className="rounded-2xl p-6 md:p-8 bg-slate-800/50 backdrop-blur border border-slate-700/50"
                style={{ willChange: 'opacity' }}
              >
                <h3 className="font-semibold text-white mb-2">{item.question}</h3>
                <p className="text-gray-400">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
