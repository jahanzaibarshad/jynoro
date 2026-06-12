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

  if (googleAnalyticsId && !/^G-[A-Z0-9]{6,12}$/i.test(googleAnalyticsId)) {
    return NextResponse.json(
      { error: 'Invalid GA4 Measurement ID. Use the ID from Google Analytics (not Search Console).' },
      { status: 400 },
    )
  }

  if (googleAnalyticsId.toLowerCase().includes('2e6961db842c65ab')) {
    return NextResponse.json(
      {
        error:
          'That value is from Google Search Console verification, not Analytics. Create a GA4 property and copy its Measurement ID.',
      },
      { status: 400 },
    )
  }

  const settings: SiteSettings = { googleAnalyticsId }

  try {
    await writeSettings(settings)
  } catch (error) {
    console.error('Failed to write settings:', error)
    return NextResponse.json(
      {
        error:
          'Could not save on live hosting (read-only disk). Add NEXT_PUBLIC_GA_ID in Vercel → Settings → Environment Variables, then redeploy.',
        settings,
        requiresEnvVar: true,
      },
      { status: 503 },
    )
  }

  return NextResponse.json({ settings })
}
