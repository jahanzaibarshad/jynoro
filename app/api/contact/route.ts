import { NextRequest, NextResponse } from 'next/server'
import type { ContactFormData } from '@/lib/types'

// Simple in-memory rate limiting: IP -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; message?: string } {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const resetIn = Math.ceil((record.resetTime - now) / 1000 / 60)
    return { allowed: false, message: `Too many submissions. Try again in ${resetIn} minutes.` }
  }

  record.count++
  return { allowed: true }
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json()
    const clientIP = getClientIP(request)

    // Honeypot check: if website field is filled, it's a bot
    if (data.website && data.website.trim() !== '') {
      return NextResponse.json({ error: 'Submission rejected' }, { status: 400 })
    }

    // Required fields validation
    if (!data.name?.trim() || !data.email?.trim() || !data.businessName?.trim() || !data.serviceNeeded?.trim() || !data.budget?.trim() || !data.message?.trim()) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    // Email validation
    if (!validateEmail(data.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Name validation (min 2 chars)
    if (data.name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters' }, { status: 400 })
    }

    // Message validation (min 10 chars)
    if (data.message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 })
    }

    // Rate limit check
    const rateLimitCheck = checkRateLimit(clientIP)
    if (!rateLimitCheck.allowed) {
      return NextResponse.json({ error: rateLimitCheck.message }, { status: 429 })
    }

    // Here you would typically send an email or store in a database
    console.log('Contact form submission:', {
      ...data,
      website: undefined, // don't log honeypot
      submittedAt: new Date().toISOString(),
      ip: clientIP,
    })

    // You can integrate with email services like:
    // - SendGrid
    // - Resend
    // - Mailgun
    // - AWS SES
    // etc.

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
