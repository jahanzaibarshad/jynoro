import Link from 'next/link'
import { FolderKanban, Newspaper, LayoutTemplate, BarChart3 } from 'lucide-react'

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="admin-heading text-3xl">Dashboard</h1>
      <p className="admin-muted mb-8 mt-1 text-sm">
        Manage pages, portfolio, blog, and analytics from one place.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/admin/pages"
          className="admin-card group transition-colors hover:border-cyan-500/40"
        >
          <LayoutTemplate className="mb-4 h-8 w-8 text-violet-400" />
          <h2 className="admin-card-title text-lg group-hover:text-cyan-300">Pages</h2>
          <p className="admin-muted text-sm">
            Build site pages with premade sections — hero, FAQ, reviews, CTAs.
          </p>
        </Link>

        <Link
          href="/admin/portfolio"
          className="admin-card group transition-colors hover:border-cyan-500/40"
        >
          <FolderKanban className="mb-4 h-8 w-8 text-cyan-400" />
          <h2 className="admin-card-title text-lg group-hover:text-cyan-300">Portfolio</h2>
          <p className="admin-muted text-sm">
            Edit projects, upload gallery images, and choose featured work.
          </p>
        </Link>

        <Link
          href="/admin/blog"
          className="admin-card group transition-colors hover:border-cyan-500/40"
        >
          <Newspaper className="mb-4 h-8 w-8 text-indigo-400" />
          <h2 className="admin-card-title text-lg group-hover:text-cyan-300">Blog</h2>
          <p className="admin-muted text-sm">
            Create, edit, and delete blog posts with live SEO analysis.
          </p>
        </Link>

        <Link
          href="/admin/analytics"
          className="admin-card group transition-colors hover:border-cyan-500/40"
        >
          <BarChart3 className="mb-4 h-8 w-8 text-emerald-400" />
          <h2 className="admin-card-title text-lg group-hover:text-cyan-300">Analytics</h2>
          <p className="admin-muted text-sm">
            Connect Google Analytics and track website performance.
          </p>
        </Link>
      </div>
    </div>
  )
}
