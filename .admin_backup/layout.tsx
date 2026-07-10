export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="fixed inset-0 z-[100] min-h-screen overflow-y-auto bg-slate-950">{children}</div>
}
