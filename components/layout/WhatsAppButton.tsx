'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const WHATSAPP_NUMBER = '1234567890'
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Jynoro%2C%20I%20would%20like%20to%20discuss%20a%20web%20development%20project`

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/40 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg transition-[box-shadow,border-color] duration-300 hover:border-emerald-300 hover:shadow-emerald-500/40"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  )
}
