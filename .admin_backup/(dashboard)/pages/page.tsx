import AdminPagesManager from '@/components/admin/AdminPagesManager'

export default function AdminPagesPage() {
  return (
    <div>
      <h1 className="admin-heading mb-1 text-2xl">Page Builder</h1>
      <p className="admin-muted mb-6 text-sm">
        Edit website pages, add sections with one click, and optimize for SEO.
      </p>
      <AdminPagesManager />
    </div>
  )
}
