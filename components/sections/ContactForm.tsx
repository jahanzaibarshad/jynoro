'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader, AlertCircle, CheckCircle } from 'lucide-react'
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-6 md:p-8 space-y-6"
      style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
    >
      {/* Success Message */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="p-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-lg flex items-center gap-2"
          style={{ willChange: 'opacity' }}
        >
          <CheckCircle size={20} />
          <span>Thank you! We'll get back to you shortly.</span>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="p-4 bg-red-500/20 border border-red-500/30 text-red-300 rounded-lg flex items-center gap-2"
          style={{ willChange: 'opacity' }}
        >
          <AlertCircle size={20} />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
        <motion.input
          whileFocus={{ boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)' }}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          placeholder="Your name"
        />
      </div>

      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Business Name</label>
        <motion.input
          whileFocus={{ boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)' }}
          type="text"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
          required
          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          placeholder="Your company name"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
        <motion.input
          whileFocus={{ boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)' }}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
          placeholder="your@email.com"
        />
      </div>

      {/* Service Needed */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Service Needed</label>
        <motion.select
          whileFocus={{ boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)' }}
          name="serviceNeeded"
          value={formData.serviceNeeded}
          onChange={handleChange}
          required
          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
        >
          <option value="">Select a service...</option>
          <option value="Web Development">Web Development</option>
          <option value="Custom Web Apps">Custom Web Apps</option>
          <option value="SEO Optimization">SEO Optimization</option>
          <option value="Maintenance & Support">Maintenance & Support</option>
          <option value="Other">Other</option>
        </motion.select>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Budget Range</label>
        <motion.select
          whileFocus={{ boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)' }}
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          required
          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
        >
          <option value="">Select budget range...</option>
          <option value="$1,000 - $5,000">$1,000 - $5,000</option>
          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
          <option value="$25,000+">$25,000+</option>
        </motion.select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
        <motion.textarea
          whileFocus={{ boxShadow: '0 0 20px rgba(79, 70, 229, 0.2)' }}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none"
          placeholder="Tell us about your project..."
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium py-3 rounded-lg hover:from-indigo-500 hover:to-indigo-400 hover:shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader size={20} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Mail size={20} />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">We'll respond within 24 hours during business days.</p>
    </motion.form>
  )
}
