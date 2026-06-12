'use client'

import SectionRenderer from '@/components/cms/SectionRenderer'
import type { PageSection } from '@/lib/page-sections'

interface SectionPreviewProps {
  section: PageSection
}

export default function SectionPreview({ section }: SectionPreviewProps) {
  if (!section.enabled) {
    return (
      <div className="admin-card">
        <p className="admin-label mb-2">Section Preview</p>
        <p className="admin-muted text-sm">This section is hidden on the website.</p>
      </div>
    )
  }

  return (
    <div className="admin-card w-full overflow-hidden p-0">
      <div className="border-b border-slate-700/50 px-4 py-3">
        <p className="admin-label mb-0">Section Preview</p>
        <p className="admin-muted mt-1 text-xs">Live preview at full section width.</p>
      </div>
      <div className="admin-preview-scroll max-h-[min(560px,65vh)] overflow-auto bg-[#0f172a] p-4">
        <div className="pointer-events-none mx-auto w-full min-w-[min(100%,720px)] max-w-7xl">
          <SectionRenderer sections={[section]} featuredProjects={[]} blogPosts={[]} />
        </div>
      </div>
    </div>
  )
}
