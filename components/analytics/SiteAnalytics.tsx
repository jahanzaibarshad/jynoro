import { readSettings } from '@/lib/data-store'
import GoogleAnalytics from './GoogleAnalytics'

export default async function SiteAnalytics() {
  const settings = await readSettings()
  const measurementId = settings.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_ID || ''
  return <GoogleAnalytics measurementId={measurementId} />
}
