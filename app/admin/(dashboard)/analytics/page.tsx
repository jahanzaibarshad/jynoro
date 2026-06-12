import AdminAnalyticsPanel from '@/components/admin/AdminAnalyticsPanel'

export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="admin-heading mb-1 text-2xl">Analytics</h1>
      <p className="admin-muted mb-6 text-sm">Connect Google Analytics and monitor your website performance.</p>
      <AdminAnalyticsPanel />
    </div>
  )
}
