import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { readSettings, writeSettings, type SiteSettings } from '@/lib/data-store'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const settings = await readSettings()
  return NextResponse.json({ settings })
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as SiteSettings
  const googleAnalyticsId = String(body.googleAnalyticsId || '').trim()

  if (googleAnalyticsId && !/^G-[A-Z0-9]+$/i.test(googleAnalyticsId)) {
    return NextResponse.json({ error: 'Invalid GA4 Measurement ID (format: G-XXXXXXXXXX)' }, { status: 400 })
  }

  const settings: SiteSettings = { googleAnalyticsId }
  await writeSettings(settings)
  return NextResponse.json({ settings })
}
