import Link from 'next/link'
import { redirect } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'
import '../admin.css'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!(await isAdminAuthenticated())) {
    redirect('/admin/login')
  }

  return (
    <div className="admin-dashboard min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-bold text-cyan-400">
              Jynoro Admin
            </Link>
            <nav className="flex flex-wrap gap-4 text-sm font-medium">
              <Link href="/admin/pages" className="text-gray-300 hover:text-white">
                Pages
              </Link>
              <Link href="/admin/portfolio" className="text-gray-300 hover:text-white">
                Portfolio
              </Link>
              <Link href="/admin/blog" className="text-gray-300 hover:text-white">
                Blog
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-400 hover:text-white">
              View site
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] px-4 py-8">{children}</main>
    </div>
  )
}
