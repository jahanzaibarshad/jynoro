import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import path from 'path'

export const runtime = 'nodejs'

type ContactPayload = {
  name?: string
  businessName?: string
  email?: string
  serviceNeeded?: string
  budget?: string
  message?: string
  website?: string
}

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'] as const

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getMissingEnv() {
  return requiredEnv.filter((key) => !process.env[key])
}

function buildPlainTextEmail(fields: Required<Omit<ContactPayload, 'website'>>) {
  return [
    'New website enquiry from Jynoro',
    '',
    `Name: ${fields.name}`,
    `Business: ${fields.businessName}`,
    `Email: ${fields.email}`,
    `Service Needed: ${fields.serviceNeeded}`,
    `Budget: ${fields.budget}`,
    '',
    'Project Details:',
    fields.message,
  ].join('\n')
}

function buildAcknowledgementText(fields: Required<Omit<ContactPayload, 'website'>>) {
  return [
    `Hi ${fields.name},`,
    '',
    'Thank you for reaching out to Jynoro. We have received your consultation request and our team will review it carefully.',
    '',
    'Here is what you submitted:',
    `Service Needed: ${fields.serviceNeeded}`,
    `Budget Range: ${fields.budget}`,
    `Business: ${fields.businessName}`,
    '',
    'What happens next:',
    '1. We review your project details.',
    '2. We prepare the best next steps for your goals.',
    '3. We reply within 24 hours with a clear way forward.',
    '',
    'If you need to add anything, simply reply to this email.',
    '',
    'Best regards,',
    'The Jynoro Team',
  ].join('\n')
}

function buildHtmlEmail(fields: Required<Omit<ContactPayload, 'website'>>) {
  const safe = {
    name: escapeHtml(fields.name),
    businessName: escapeHtml(fields.businessName),
    email: escapeHtml(fields.email),
    serviceNeeded: escapeHtml(fields.serviceNeeded),
    budget: escapeHtml(fields.budget),
    message: escapeHtml(fields.message).replace(/\n/g, '<br />'),
  }

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Jynoro Project Inquiry</title>
    <style>
      @media (prefers-color-scheme: light) {
        .body-wrapper { background-color: #070b1a !important; }
        .content-card { background-color: #0f172a !important; border-color: rgba(255,255,255,0.15) !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:40px 16px;background-color:#050508;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#ffffff;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;" class="body-wrapper">
      <!-- Logo Header -->
      <tr>
        <td style="padding:0 0 24px;text-align:center;">
          <img src="cid:jynoro-logo" alt="Jynoro Logo" width="180" style="display:inline-block;width:180px;height:auto;" />
        </td>
      </tr>
      
      <!-- Main Content Card -->
      <tr>
        <td style="background-color:#070b1a;border:1px solid rgba(255,255,255,0.08);border-radius:24px;padding:32px;box-shadow:0 20px 40px rgba(0,0,0,0.5);" class="content-card">
          <!-- Lead Alert Tag -->
          <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
            <tr>
              <td style="background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);border-radius:99px;padding:6px 14px;font-size:10px;font-family:monospace;font-weight:bold;color:#00e5ff;text-transform:uppercase;letter-spacing:0.15em;">
                Incoming Lead Alert
              </td>
            </tr>
          </table>

          <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;letter-spacing:-0.02em;line-height:1.25;color:#ffffff;">
            ${safe.name} wants to start a project
          </h2>
          <p style="margin:0 0 28px;font-size:14px;color:#94a3b8;line-height:1.5;">
            A new project inquiry has been submitted via the Jynoro website contact form.
          </p>

          <!-- Details Table -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin-bottom:28px;">
            ${[
              ['Full Name', safe.name],
              ['Business Name', safe.businessName || 'Not Specified'],
              ['Email Address', `<a href="mailto:${safe.email}" style="color:#00e5ff;text-decoration:none;font-weight:bold;">${safe.email}</a>`],
              ['Service Needed', safe.serviceNeeded],
              ['Budget Range', safe.budget],
            ]
              .map(
                ([label, value], idx) => `
            <tr style="${idx > 0 ? 'border-top:1px solid rgba(255,255,255,0.06);' : ''}">
              <td style="padding:14px 0;width:150px;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;font-family:monospace;">${label}</td>
              <td style="padding:14px 0;font-size:14px;color:#f1f5f9;font-weight:600;line-height:1.4;">${value}</td>
            </tr>`
              )
              .join('')}
          </table>

          <!-- Message Card -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:16px;">
            <tr>
              <td style="padding:20px;">
                <p style="margin:0 0 8px;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.1em;font-family:monospace;">Project Details / Message</p>
                <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.6;white-space:pre-wrap;">${safe.message}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:28px 24px 0;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;color:#475569;line-height:1.6;">
            Sent automatically from the Jynoro contact API endpoint.
          </p>
          <p style="margin:0;font-size:11px;color:#475569;line-height:1.6;">
            Reply directly to this email to contact the lead.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function buildAcknowledgementHtml(fields: Required<Omit<ContactPayload, 'website'>>) {
  const safe = {
    name: escapeHtml(fields.name),
    businessName: escapeHtml(fields.businessName),
    serviceNeeded: escapeHtml(fields.serviceNeeded),
    budget: escapeHtml(fields.budget),
    message: escapeHtml(fields.message).replace(/\n/g, '<br />'),
  }

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>We received your request</title>
    <style>
      @media (prefers-color-scheme: dark) {
        body { background-color: #050508 !important; color: #e2e8f0 !important; }
        .outer-wrapper { background-color: #050508 !important; }
        .main-card { background-color: #070b1a !important; border-color: rgba(255,255,255,0.08) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important; }
        .text-dark { color: #ffffff !important; }
        .text-dark-header { color: #ffffff !important; }
        .details-table { background-color: rgba(255,255,255,0.02) !important; border-color: rgba(255,255,255,0.08) !important; }
        .text-muted { color: #94a3b8 !important; }
        .border-line { border-top-color: rgba(255,255,255,0.06) !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:40px 16px;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#334155;-webkit-font-smoothing:antialiased;" class="outer-wrapper">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:580px;margin:0 auto;">
      <!-- Logo Header -->
      <tr>
        <td style="padding:0 0 32px;text-align:center;">
          <img src="cid:jynoro-logo" alt="Jynoro Logo" width="140" style="display:inline-block;width:140px;height:auto;" />
        </td>
      </tr>
      
      <!-- Main Content Card -->
      <tr>
        <td style="background-color:#ffffff;border:1px solid #e2e8f0;border-radius:16px;padding:40px 32px;box-shadow:0 4px 20px rgba(0,0,0,0.02);" class="main-card">
          <h1 style="margin:0 0 16px;font-size:20px;font-weight:600;color:#0f172a;line-height:1.3;" class="text-dark-header">Request Confirmation</h1>
          
          <p style="margin:0 0 16px;font-size:14px;line-height:1.6;">Hello ${safe.name},</p>
          
          <p style="margin:0 0 24px;font-size:14px;line-height:1.6;">
            Thank you for reaching out to Jynoro. This email confirms that we have received your consultation request. A member of our team is currently reviewing your project details and will follow up with you within 24 hours to discuss the next steps.
          </p>

          <!-- Submission details table -->
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:24px 0;border:1px solid #e2e8f0;border-radius:8px;background-color:#f8fafc;padding:16px 20px;" class="details-table">
            <tr>
              <td style="padding:8px 0;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;font-family:monospace;width:130px;" class="text-muted">Business</td>
              <td style="padding:8px 0;font-size:14px;color:#0f172a;font-weight:600;" class="text-dark">${safe.businessName || 'Not Specified'}</td>
            </tr>
            <tr style="border-top:1px solid #e2e8f0;" class="border-line">
              <td style="padding:8px 0;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;font-family:monospace;" class="text-muted">Service Needed</td>
              <td style="padding:8px 0;font-size:14px;color:#0f172a;font-weight:600;" class="text-dark">${safe.serviceNeeded}</td>
            </tr>
            <tr style="border-top:1px solid #e2e8f0;" class="border-line">
              <td style="padding:8px 0;font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;font-family:monospace;" class="text-muted">Budget Range</td>
              <td style="padding:8px 0;font-size:14px;color:#0f172a;font-weight:600;" class="text-dark">${safe.budget}</td>
            </tr>
          </table>

          <p style="margin:0 0 24px;font-size:14px;line-height:1.6;">
            If you have any project briefs, design references, or technical specifications you would like to add, you can send them by replying directly to this email.
          </p>

          <p style="margin:0;font-size:14px;line-height:1.6;text-align:center;">
            Best regards,<br />
            <strong>The Jynoro Team</strong>
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="padding:32px 24px 0;text-align:center;">
          <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;" class="text-muted">
            © 2026 Jynoro. All rights reserved. • <a href="mailto:info@jynoro.com" style="color:#94a3b8;text-decoration:underline;">info@jynoro.com</a>
          </p>
          <p style="margin:4px 0 0;font-size:10px;color:#94a3b8;" class="text-muted">
            This is an automated receipt confirming submission of our consultation form.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload

    if (clean(body.website)) {
      return NextResponse.json({ ok: true })
    }

    const fields = {
      name: clean(body.name),
      businessName: clean(body.businessName),
      email: clean(body.email).toLowerCase(),
      serviceNeeded: clean(body.serviceNeeded),
      budget: clean(body.budget),
      message: clean(body.message),
    }

    const missingFields = Object.entries(fields)
      .filter(([, value]) => !value)
      .map(([key]) => key)

    if (missingFields.length > 0) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    if (!isEmail(fields.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const missingEnv = getMissingEnv()
    if (missingEnv.length > 0) {
      console.error(`Contact form SMTP configuration missing: ${missingEnv.join(', ')}`)
      return NextResponse.json({ error: 'Email service is not configured yet.' }, { status: 500 })
    }

    const port = Number(process.env.SMTP_PORT)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const recipient = process.env.SMTP_TO || process.env.SMTP_USER
    const fromName = process.env.SMTP_FROM_NAME || 'Jynoro'
    const subject = `New enquiry: ${fields.serviceNeeded} from ${fields.name}`

    const logoPath = path.join(process.cwd(), 'public', 'email-logo.webp')

    await transporter.sendMail({
      from: `"${fromName}" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: `"${fields.name}" <${fields.email}>`,
      subject,
      text: buildPlainTextEmail(fields),
      html: buildHtmlEmail(fields),
      attachments: [
        {
          filename: 'jynoro-logo.webp',
          path: logoPath,
          cid: 'jynoro-logo',
        },
      ],
    })

    await transporter.sendMail({
      from: `"${fromName}" <${process.env.SMTP_USER}>`,
      to: fields.email,
      replyTo: recipient,
      subject: 'We received your Jynoro consultation request',
      text: buildAcknowledgementText(fields),
      html: buildAcknowledgementHtml(fields),
      attachments: [
        {
          filename: 'jynoro-logo.webp',
          path: logoPath,
          cid: 'jynoro-logo',
        },
      ],
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact form email failed:', error)
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 })
  }
}
