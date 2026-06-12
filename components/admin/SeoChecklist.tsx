'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, XCircle, AlertCircle, ChevronRight } from 'lucide-react'
import { analyzeSeo, getSeoScore, type SeoContentInput, type SeoCheckGroup } from '@/lib/seo-analyzer'

interface SeoChecklistProps {
  input: SeoContentInput
}

function GroupBadge({ group }: { group: SeoCheckGroup }) {
  const errors = group.checks.filter((c) => c.status === 'fail').length
  const warnings = group.checks.filter((c) => c.status === 'warn').length

  if (errors > 0) {
    return (
      <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] font-medium text-red-400">
        {errors} Error{errors !== 1 ? 's' : ''}
      </span>
    )
  }
  if (warnings > 0) {
    return (
      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-medium text-amber-400">
        {warnings} Warning{warnings !== 1 ? 's' : ''}
      </span>
    )
  }
  return (
    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
      All Good
    </span>
  )
}

function StatusIcon({ status }: { status: 'pass' | 'fail' | 'warn' }) {
  if (status === 'pass') return <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
  if (status === 'warn') return <AlertCircle className="h-3.5 w-3.5 shrink-0 text-amber-400" />
  return <XCircle className="h-3.5 w-3.5 shrink-0 text-red-400" />
}

function SeoGroup({ group, defaultOpen = false }: { group: SeoCheckGroup; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-slate-700/50 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-slate-800/40"
      >
        <ChevronRight
          size={14}
          className={`shrink-0 text-gray-500 transition-transform ${open ? 'rotate-90' : ''}`}
        />
        <span className="min-w-0 flex-1 truncate text-xs font-medium text-white">{group.title}</span>
        <GroupBadge group={group} />
      </button>
      {open && (
        <ul className="space-y-0 px-3 pb-2 pl-7">
          {group.checks.map((check) => (
            <li key={check.id} className="flex gap-2 border-t border-slate-800/80 py-1.5 first:border-t-0">
              <StatusIcon status={check.status} />
              <div className="min-w-0">
                <p className="text-[11px] font-medium leading-snug text-gray-300">{check.label}</p>
                <p className="text-[11px] leading-snug text-gray-500">{check.message}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function SeoChecklist({ input }: SeoChecklistProps) {
  const groups = useMemo(() => analyzeSeo(input), [input])
  const score = useMemo(() => getSeoScore(groups), [groups])

  const scoreColor =
    score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'

  return (
    <div className="admin-card overflow-hidden p-0">
      <div className="border-b border-slate-700/50 px-3 py-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="admin-card-title mb-0">SEO Analysis</h3>
          <div className={`text-xl font-bold ${scoreColor}`}>{score}</div>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-800">
          <div
            className={`h-full rounded-full transition-all ${
              score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
      <div className="max-h-[240px] overflow-y-auto">
        {groups.map((group, i) => (
          <SeoGroup key={group.id} group={group} defaultOpen={i === 0} />
        ))}
      </div>
    </div>
  )
}
