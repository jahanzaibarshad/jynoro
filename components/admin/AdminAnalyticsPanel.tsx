'use client'

import { useEffect, useState } from 'react'
import { Save, ExternalLink, BarChart3 } from 'lucide-react'

export default function AdminAnalyticsPanel() {
  const [gaId, setGaId] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.googleAnalyticsId) {
          setGaId(data.settings.googleAnalyticsId)
        }
      })
      .catch(() => {})
  }, [])

  async function save() {
    setSaving(true)
    setMessage('')
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ googleAnalyticsId: gaId.trim() }),
    })
    setSaving(false)
    if (res.ok) {
      setMessage('Analytics settings saved. Tracking is active on your public site.')
    } else {
      const err = await res.json().catch(() => ({}))
      setMessage(err.error || 'Failed to save')
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="admin-card space-y-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-cyan-400" />
          <div>
            <h2 className="admin-heading text-lg">Google Analytics</h2>
            <p className="admin-muted text-sm">Track visitors, traffic sources, and page performance.</p>
          </div>
        </div>

        <div>
          <label className="admin-label">GA4 Measurement ID</label>
          <input
            value={gaId}
            onChange={(e) => setGaId(e.target.value)}
            placeholder="G-XXXXXXXXXX"
            className="admin-input w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
          />
          <p className="admin-muted mt-1.5 text-xs">
            Find this in Google Analytics → Admin → Data Streams → your web stream.
          </p>
        </div>

        <button type="button" onClick={save} disabled={saving} className="admin-btn-primary">
          <Save size={14} />
          {saving ? 'Saving…' : 'Save & Enable Tracking'}
        </button>

        {message && <p className="text-sm text-cyan-400">{message}</p>}
      </div>

      <div className="admin-card space-y-4">
        <h3 className="admin-card-title">View Performance Reports</h3>
        <p className="admin-muted text-sm">
          Open your Google Analytics dashboard for real-time data, audience insights, acquisition
          channels, and page-level reports.
        </p>
        <a
          href="https://analytics.google.com/analytics/web/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-secondary inline-flex gap-2 text-sm"
        >
          <ExternalLink size={16} />
          Open Google Analytics
        </a>

        <div className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-4">
          <p className="admin-label mb-2">Quick setup</p>
          <ol className="admin-muted list-decimal space-y-1.5 pl-4 text-xs">
            <li>Create a GA4 property at analytics.google.com</li>
            <li>Add a Web data stream for jynoro.com</li>
            <li>Copy the Measurement ID (starts with G-)</li>
            <li>Paste it above and save</li>
            <li>Visit your site — data appears within 24–48 hours</li>
          </ol>
        </div>

        {gaId && (
          <p className="text-xs text-emerald-400">
            Active ID: <span className="font-mono">{gaId}</span>
          </p>
        )}
      </div>
    </div>
  )
}
