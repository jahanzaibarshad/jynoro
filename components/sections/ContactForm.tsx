'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader, AlertCircle, CheckCircle, Rocket, Send } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    serviceNeeded: '',
    budget: '',
    message: '',
    website: '', // honeypot field
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        setFormData({
          name: '',
          businessName: '',
          email: '',
          serviceNeeded: '',
          budget: '',
          message: '',
          website: '',
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(result.error || 'Failed to submit form. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setError('An error occurred. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-2xl mx-auto bg-[#070B19]/30 border border-white/[0.06] backdrop-blur-xl rounded-2xl p-8 space-y-6 relative overflow-hidden"
      style={{
        willChange: 'opacity, transform',
        boxShadow: `inset 0 0 30px rgba(255,255,255,0.01)`,
      }}
    >
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-white/20" />
      <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-white/20" />
      <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-white/20" />
      <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-white/20" />

      {/* Success Message */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-3 text-sm font-medium"
        >
          <CheckCircle size={18} />
          <span>TRANSMISSION_SUCCESS: We will contact you shortly.</span>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3 text-sm font-medium"
        >
          <AlertCircle size={18} />
          <span>TRANSMISSION_ERROR: {error}</span>
        </motion.div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">// Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-[#050508]/80 border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.06)] transition-all duration-300 text-sm"
            placeholder="Identity matrix"
          />
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">// Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="w-full bg-[#050508]/80 border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.06)] transition-all duration-300 text-sm"
            placeholder="Enterprise name"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">// Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-[#050508]/80 border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.06)] transition-all duration-300 text-sm"
          placeholder="your@email.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Service Needed */}
        <div>
          <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">// Service Needed</label>
          <select
            name="serviceNeeded"
            value={formData.serviceNeeded}
            onChange={handleChange}
            required
            className="w-full bg-[#050508]/80 border border-white/[0.06] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.06)] transition-all duration-300 text-sm appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.25rem',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <option value="" className="bg-[#050508] text-gray-500">Select module...</option>
            <option value="Web Development" className="bg-[#050508]">Web Development</option>
            <option value="Custom Web Apps" className="bg-[#050508]">Custom Web Apps</option>
            <option value="SEO Optimization" className="bg-[#050508]">SEO Optimization</option>
            <option value="Maintenance & Support" className="bg-[#050508]">Maintenance & Support</option>
            <option value="Other" className="bg-[#050508]">Other</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">// Budget Range</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="w-full bg-[#050508]/80 border border-white/[0.06] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.06)] transition-all duration-300 text-sm appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.25rem',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <option value="" className="bg-[#050508] text-gray-500">Select range...</option>
            <option value="$1,000 - $5,000" className="bg-[#050508]">$1,000 - $5,000</option>
            <option value="$5,000 - $10,000" className="bg-[#050508]">$5,000 - $10,000</option>
            <option value="$10,000 - $25,000" className="bg-[#050508]">$10,000 - $25,000</option>
            <option value="$25,000+" className="bg-[#050508]">$25,000+</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">// Message Brief</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-[#050508]/80 border border-white/[0.06] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.06)] transition-all duration-300 text-sm resize-none"
          placeholder="Outline the specifications..."
        />
      </div>

      {/* Honeypot Field (hidden from users) */}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Rocket Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full relative group overflow-hidden bg-gradient-to-r from-[#00E5FF] via-[#4F8CFF] to-[#6C3DFF] text-white font-semibold py-3.5 rounded-lg transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,229,255,0.25)] text-sm uppercase tracking-wider font-mono"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            ENGINE_TRANSMITTING...
          </>
        ) : (
          <>
            <Rocket size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Launch Inquiry
          </>
        )}
      </button>

      <p className="text-[10px] font-mono text-gray-600 text-center uppercase tracking-widest">
        Response payload ready in &lt; 24h
      </p>
    </motion.form>
  )
}
