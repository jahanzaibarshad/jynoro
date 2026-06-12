'use client'

import { useMemo } from 'react'
import { Lightbulb, AlertTriangle, Info } from 'lucide-react'
import type { CmsPage } from '@/lib/page-sections'
import { getPageSeoSuggestions } from '@/lib/seo-suggestions'

interface SeoSuggestionsProps {
  page: CmsPage
}

export default function SeoSuggestions({ page }: SeoSuggestionsProps) {
  const suggestions = useMemo(() => getPageSeoSuggestions(page), [page])

  const iconFor = (priority: string) => {
    if (priority === 'high') return <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
    if (priority === 'medium') return <Lightbulb className="h-4 w-4 shrink-0 text-amber-400" />
    return <Info className="h-4 w-4 shrink-0 text-cyan-400" />
  }

  return (
    <div className="admin-card">
      <h3 className="admin-card-title">SEO Suggestions</h3>
      {suggestions.length === 0 ? (
        <p className="text-xs text-emerald-400">No major SEO issues found.</p>
      ) : (
        <ul className="max-h-[200px] space-y-2 overflow-y-auto">
          {suggestions.map((s) => (
            <li
              key={s.id}
              className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-2.5"
            >
              <div className="flex gap-2">
                {iconFor(s.priority)}
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white">{s.title}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-gray-400">{s.message}</p>
                  {s.action ? (
                    <p className="mt-1 text-[11px] text-cyan-400/90">{s.action}</p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
