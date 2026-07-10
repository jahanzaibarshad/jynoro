import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
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

    // Honeypot check
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

    // Rate limit check
    const rateLimitCheck = checkRateLimit(clientIP)
    if (!rateLimitCheck.allowed) {
      return NextResponse.json({ error: rateLimitCheck.message }, { status: 429 })
    }

    // --- Configure Nodemailer Transporter ---
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // --- 1. Admin Notification Email ---
    const adminMailOptions = {
      from: `"Jynoro Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to info@jynoro.com
      replyTo: data.email,
      subject: `New Lead: ${data.name} from ${data.businessName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Business Name:</strong> ${data.businessName}</p>
        <p><strong>Service Needed:</strong> ${data.serviceNeeded}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Message:</strong><br/> ${data.message}</p>
      `,
    }

    // --- 2. Client Auto-Responder Email (Premium Template) ---
    const clientMailOptions = {
      from: `"Jynoro" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Thank you for contacting Jynoro — Consultation Request Received`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050508; color: #ffffff; padding: 0; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #070B1A; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #00E5FF, #6C3DFF); padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; color: #ffffff; font-weight: 800; tracking: -0.5px; }
            .content { padding: 40px 30px; }
            .content h2 { color: #00E5FF; font-size: 22px; margin-top: 0; }
            .content p { color: #d1d5db; line-height: 1.6; font-size: 16px; margin-bottom: 20px; }
            .highlight { background-color: rgba(0, 229, 255, 0.1); border-left: 4px solid #00E5FF; padding: 15px 20px; margin-bottom: 24px; border-radius: 0 8px 8px 0; }
            .highlight p { margin: 0; color: #ffffff; font-size: 15px; }
            .footer { padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); }
            .footer p { color: #6b7280; font-size: 13px; margin: 0; }
            .footer a { color: #00E5FF; text-decoration: none; }
          </style>
        </head>
        <body>
          <div style="padding: 40px 20px;">
            <div class="container">
              <div class="header">
                <h1>JYNORO</h1>
              </div>
              <div class="content">
                <h2>Hi ${data.name.split(' ')[0]},</h2>
                <p>Thank you for reaching out to us regarding your project for <strong>${data.businessName}</strong>. We have received your consultation request.</p>
                
                <div class="highlight">
                  <p><strong>Your request is in progress.</strong> Our engineering and strategy team is currently reviewing your details regarding <strong>${data.serviceNeeded}</strong>.</p>
                </div>
                
                <p>We pride ourselves on rapid, transparent communication. One of our lead architects will be in touch with you shortly (usually within 24 hours) to discuss the next steps and schedule your free consultation.</p>
                
                <p>In the meantime, feel free to explore our <a href="https://jynoro.com/portfolio" style="color: #00E5FF;">portfolio</a> to see how we've helped other businesses scale.</p>
                
                <p>Best regards,<br/><strong style="color: #ffffff;">The Jynoro Team</strong></p>
              </div>
              <div class="footer">
                <p>This is an automated message. Please do not reply directly to this email.</p>
                <p style="margin-top: 10px;">&copy; ${new Date().getFullYear()} Jynoro. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    }

    // Send both emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(clientMailOptions)

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
