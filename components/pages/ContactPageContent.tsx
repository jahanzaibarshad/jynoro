'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Mail, Phone, MapPin, Clock, Send, Loader, AlertCircle, CheckCircle,
  ArrowRight, Sparkles, Plus, Minus, MessageSquare, ShieldCheck, Zap
} from 'lucide-react'
import { containerVariants, itemVariants } from '@/styles/animations'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@jynoro.com',
    href: 'mailto:info@jynoro.com',
    color: '#00E5FF',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+92 336 105 8649',
    href: 'https://wa.me/923361058649',
    color: '#6C3DFF',
  },
  {
    icon: Clock,
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    color: '#00E6B8',
  },
  {
    icon: MapPin,
    label: 'Based In',
    value: 'Pakistan · Serving Globally',
    href: null,
    color: '#4F8CFF',
  },
]

const faqs = [
  { question: 'What web frameworks do you use and why?', answer: 'We build with React/Next.js and TypeScript on the frontend, and Node.js/Python on the backend. This gives unmatched speed, modularity, and SEO indexability.' },
  { question: 'Do you integrate AI agents into existing applications?', answer: 'Yes. We can integrate autonomous AI agents, Retrieval-Augmented Generation (RAG) pipelines, and LLM orchestration tools directly into your existing business software.' },
  { question: 'What is the standard timeline for a web development project?', answer: 'It depends on complexity. A corporate landing page takes 2-4 weeks. A full custom SaaS web application typically requires 8-12 weeks from blueprinting to final launch.' },
  { question: 'How do code handoffs and IP ownership work?', answer: 'Once project balances are cleared, full source code and Intellectual Property (IP) is pushed to your organization accounts — clean, documented Git repositories included.' },
  { question: 'Can you speed up or refactor my existing website?', answer: 'Absolutely. We audit slow WordPress or React sites and convert them to blazing-fast Next.js architectures that consistently score 95+ on Google Lighthouse.' },
  { question: 'How do you handle maintenance after the website is launched?', answer: 'We offer dedicated maintenance retainers that include 24/7 server monitoring, dependency updates, security patches, and priority bug fixing to ensure your app scales flawlessly.' },
  { question: 'Will my website be mobile responsive and SEO optimized?', answer: '100%. All our interfaces are built mobile-first. We implement semantic HTML, structured data, and server-side rendering to ensure your site is deeply optimized for search engines right out of the box.' },
  { question: 'Do you help with domain setup and hosting?', answer: 'Yes — domain configuration, SSL, DNS routing, and deployment on Vercel, AWS, and Netlify are all part of our process.' },
]

// Reusable input styles
const inputClass = 'w-full bg-[#0A0F1E] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-[#00E5FF]/60 focus:ring-1 focus:ring-[#00E5FF]/30 focus:shadow-[0_0_20px_rgba(0,229,255,0.06)] transition-all duration-300'

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
  backgroundPosition: 'right 0.75rem center',
  backgroundSize: '1.25rem',
  backgroundRepeat: 'no-repeat',
}

export default function ContactPageContent() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    serviceNeeded: '',
    budget: '',
    message: '',
    website: '', // honeypot
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const result = await response.json()
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', businessName: '', email: '', serviceNeeded: '', budget: '', message: '', website: '' })
        setTimeout(() => setSubmitted(false), 6000)
      } else {
        setError(result.error || 'Failed to submit. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050508] py-20 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(7,11,25,0.7),rgba(5,5,8,1))]" />
      <div className="absolute top-[15%] left-[-10%] w-[35%] h-[35%] rounded-full bg-[#00E5FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#6C3DFF]/5 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_30%,black,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-16">

        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <motion.div
            className="mb-6 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-[#050508]/60 px-3 py-2 text-xs font-semibold text-[#00E5FF] sm:px-5 sm:py-2.5 sm:text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-4 w-4" />
            Let&apos;s Talk
          </motion.div>
          <motion.h1
            className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            Get Your Free{' '}
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#4F8CFF] to-[#6C3DFF] bg-clip-text text-transparent">
              Consultation
            </span>
          </motion.h1>
          <motion.p
            className="text-base leading-relaxed text-zinc-400 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
          >
            Tell us about your project and we&apos;ll craft the perfect digital solution for your business.
          </motion.p>
        </div>

        {/* Two Column Layout: Info + Form */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:mb-28 lg:grid-cols-12 lg:gap-14">

          {/* Left Column — Contact Info & Quick Links */}
          <motion.div
            className="space-y-6 lg:col-span-5 lg:space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          >
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, idx) => {
                const Icon = item.icon
                const cardContent = (
                  <>
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#050508] transition-transform duration-300 group-hover:scale-105"
                      style={{ color: item.color }}
                    >
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="break-words text-sm font-medium text-white">{item.value}</p>
                    </div>
                    {item.href && (
                      <ArrowRight size={16} className="text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                    )}
                  </>
                )

                const cardClass = "group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/[0.12] hover:bg-[#070B1A]/60 cursor-pointer sm:gap-5 sm:p-5"

                return item.href ? (
                  <Link key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {cardContent}
                  </Link>
                ) : (
                  <div key={idx} className={cardClass}>
                    {cardContent}
                  </div>
                )
              })}
            </div>

            {/* Our Guarantees Panel */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070B1A]/40 p-5 backdrop-blur-md transition-colors duration-500 hover:border-[#00E5FF]/30 md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(0,229,255,0.05),transparent_60%)] pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20">
                    <ShieldCheck className="h-5 w-5 text-[#00E5FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Our Guarantees</h3>
                </div>

                <div className="space-y-5">
                  {[
                    { icon: Clock, title: 'Rapid Response', desc: 'We review your inquiry and reply within 24 hours guaranteed.', color: '#00E5FF' },
                    { icon: AlertCircle, title: 'Strict Confidentiality', desc: 'Your ideas are safe. We sign NDAs before discussing technical specifics.', color: '#4F8CFF' },
                    { icon: Zap, title: 'Premium Engineering', desc: 'We never cut corners. You get scalable, secure, high-performance code.', color: '#6C3DFF' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors border border-transparent hover:border-white/[0.04]">
                      <item.icon className="h-5 w-5 shrink-0 mt-0.5" style={{ color: item.color }} />
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Premium Contact Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070B1A]/40 p-5 backdrop-blur-xl sm:p-7 md:p-9"
            >
              {/* Decorative glowing top edge */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-[linear-gradient(90deg,transparent,#00E5FF,#6C3DFF,transparent)]" />

              {/* Corner ornaments */}
              <div className="absolute left-3 top-3 w-3 h-3 border-l border-t border-white/15 rounded-tl pointer-events-none" />
              <div className="absolute right-3 top-3 w-3 h-3 border-r border-t border-white/15 rounded-tr pointer-events-none" />
              <div className="absolute left-3 bottom-3 w-3 h-3 border-l border-b border-white/15 rounded-bl pointer-events-none" />
              <div className="absolute right-3 bottom-3 w-3 h-3 border-r border-b border-white/15 rounded-br pointer-events-none" />

              {/* Background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.04),transparent_50%)] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Form Header */}
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Start Your Project</h2>
                    <p className="text-xs text-zinc-500 mt-1">Fill out the form and we&apos;ll get back to you.</p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00E5FF]/20 bg-[#00E5FF]/10 text-[#00E5FF]">
                    <MessageSquare size={18} />
                  </div>
                </div>

                {/* Success */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-3 text-sm font-medium"
                  >
                    <CheckCircle size={18} />
                    <span>Message sent successfully! We&apos;ll be in touch shortly.</span>
                  </motion.div>
                )}

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3 text-sm font-medium"
                  >
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Name + Business Row */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Business Name</label>
                    <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} required className={inputClass} placeholder="Your Company" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="you@company.com" />
                </div>

                {/* Service + Budget Row */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Service Needed</label>
                    <select name="serviceNeeded" value={formData.serviceNeeded} onChange={handleChange} required className={`${inputClass} appearance-none`} style={selectStyle}>
                      <option value="" className="bg-[#0A0F1E] text-zinc-500">Select a service...</option>
                      <option value="Web Development" className="bg-[#0A0F1E]">Web Development</option>
                      <option value="Custom Web Apps" className="bg-[#0A0F1E]">Custom Web Apps</option>
                      <option value="SEO Optimization" className="bg-[#0A0F1E]">SEO Optimization</option>
                      <option value="Maintenance & Support" className="bg-[#0A0F1E]">Maintenance & Support</option>
                      <option value="Graphic Design" className="bg-[#0A0F1E]">Graphic Design</option>
                      <option value="Other" className="bg-[#0A0F1E]">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Budget Range</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} required className={`${inputClass} appearance-none`} style={selectStyle}>
                      <option value="" className="bg-[#0A0F1E] text-zinc-500">Select range...</option>
                      <option value="$1,000 - $5,000" className="bg-[#0A0F1E]">$1,000 – $5,000</option>
                      <option value="$5,000 - $10,000" className="bg-[#0A0F1E]">$5,000 – $10,000</option>
                      <option value="$10,000 - $25,000" className="bg-[#0A0F1E]">$10,000 – $25,000</option>
                      <option value="$25,000+" className="bg-[#0A0F1E]">$25,000+</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                  />
                </div>

                {/* Honeypot */}
                <input type="text" name="website" value={formData.website} onChange={handleChange} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[linear-gradient(110deg,#00E5FF_0%,#4F8CFF_48%,#6C3DFF_100%)] px-4 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-[0_12px_30px_rgba(79,140,255,0.2)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,229,255,0.25)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-[11px] text-zinc-500 text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </div>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Frequently Asked <span className="bg-gradient-to-r from-[#00E5FF] to-[#6C3DFF] bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-zinc-500 text-sm mt-2">Everything you need to know before getting started.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = openIdx === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/[0.06] bg-[#070B1A]/30 backdrop-blur-xl overflow-hidden hover:border-white/[0.12] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-white"
                  >
                    <span className="font-semibold tracking-tight pr-4 text-sm">{item.question}</span>
                    <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-400">
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 text-zinc-400 text-sm leading-relaxed border-t border-white/[0.03]">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
