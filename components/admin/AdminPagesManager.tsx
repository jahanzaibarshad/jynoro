'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Plus,
  Save,
  ChevronUp,
  ChevronDown,
  Trash2,
  Eye,
  EyeOff,
  GripVertical,
  X,
} from 'lucide-react'
import type { CmsPage } from '@/lib/page-sections'
import { SECTION_CATALOG, createSection, extractPageText, countPageImages, type PageSection, type SectionType } from '@/lib/page-sections'
import SectionEditor from './SectionEditor'
import SectionPreview from './SectionPreview'
import SeoFieldsEditor from './SeoFieldsEditor'
import SeoChecklist from './SeoChecklist'
import SeoSuggestions from './SeoSuggestions'

export default function AdminPagesManager() {
  const [pages, setPages] = useState<CmsPage[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [draft, setDraft] = useState<CmsPage | null>(null)
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null)
  const [showPicker, setShowPicker] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  async function loadPages() {
    const res = await fetch('/api/admin/pages')
    if (res.ok) {
      const data = await res.json()
      setPages(data.pages)
      if (data.pages.length && !selectedSlug) {
        setSelectedSlug(data.pages[0].slug)
        setDraft(data.pages[0])
      }
    }
  }

  useEffect(() => {
    loadPages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const page = pages.find((p) => p.slug === selectedSlug)
    if (page) {
      setDraft({ ...page })
      setSelectedSectionId(page.sections[0]?.id || null)
    }
  }, [selectedSlug, pages])

  const selectedSection = draft?.sections.find((s) => s.id === selectedSectionId) || null

  const seoInput = useMemo(() => {
    if (!draft) return null
    return {
      focusKeyword: draft.focusKeyword || '',
      seoTitle: draft.seoTitle || draft.title,
      seoDescription: draft.seoDescription || '',
      slug: draft.slug,
      urlPath: draft.path.replace(/^\//, ''),
      content: extractPageText(draft),
      contentType: 'page' as const,
      imageCount: countPageImages(draft),
    }
  }, [draft])

  async function savePage() {
    if (!draft) return
    setSaving(true)
    setMessage('')
    const res = await fetch(`/api/admin/pages/${draft.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    })
    setSaving(false)
    if (res.ok) {
      setMessage('Page saved successfully')
      await loadPages()
    } else {
      setMessage('Failed to save page')
    }
  }

  function addSection(type: SectionType) {
    if (!draft) return
    const section = createSection(type)
    setDraft({ ...draft, sections: [...draft.sections, section] })
    setSelectedSectionId(section.id)
    setShowPicker(false)
  }

  function updateSection(section: PageSection) {
    if (!draft) return
    setDraft({
      ...draft,
      sections: draft.sections.map((s) => (s.id === section.id ? section : s)),
    })
  }

  function removeSection(id: string) {
    if (!draft || !confirm('Remove this section?')) return
    const sections = draft.sections.filter((s) => s.id !== id)
    setDraft({ ...draft, sections })
    if (selectedSectionId === id) setSelectedSectionId(sections[0]?.id || null)
  }

  function moveSection(id: string, dir: -1 | 1) {
    if (!draft) return
    const idx = draft.sections.findIndex((s) => s.id === id)
    const next = idx + dir
    if (next < 0 || next >= draft.sections.length) return
    const sections = [...draft.sections]
    ;[sections[idx], sections[next]] = [sections[next], sections[idx]]
    setDraft({ ...draft, sections })
  }

  function toggleSection(id: string) {
    if (!draft) return
    setDraft({
      ...draft,
      sections: draft.sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    })
  }

  if (!draft) {
    return <p className="admin-muted">Loading pages…</p>
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[200px_1fr]">
      <aside className="space-y-1">
        <p className="admin-label mb-3">Website Pages</p>
        {pages.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => setSelectedSlug(p.slug)}
            className={`flex w-full flex-col rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
              selectedSlug === p.slug
                ? 'bg-cyan-500/15 text-cyan-300'
                : 'text-gray-300 hover:bg-slate-800'
            }`}
          >
            <span className="font-medium">{p.title}</span>
            <span className="text-xs text-gray-500">{p.path}</span>
          </button>
        ))}
      </aside>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="admin-heading">{draft.title}</h2>
            <p className="admin-muted text-sm">{draft.path} · {draft.sections.length} sections</p>
          </div>
          <div className="flex gap-2">
            <a
              href={draft.path}
              target="_blank"
              rel="noreferrer"
              className="admin-btn-secondary text-sm"
            >
              Preview
            </a>
            <button type="button" onClick={savePage} disabled={saving} className="admin-btn-primary">
              <Save size={14} />
              {saving ? 'Saving…' : 'Save Page'}
            </button>
          </div>
        </div>

        {message && <p className="text-sm text-cyan-400">{message}</p>}

        <div className="grid min-w-0 gap-4 xl:grid-cols-[1fr_260px]">
          <div className="grid min-w-0 gap-4 lg:grid-cols-[240px_1fr]">
          <div className="admin-card">
            <div className="mb-3 flex items-center justify-between">
              <p className="admin-card-title mb-0">Sections</p>
              <button type="button" onClick={() => setShowPicker(true)} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300">
                <Plus size={14} />
                Add
              </button>
            </div>
            <div className="space-y-1">
              {draft.sections.map((section, i) => {
                const meta = SECTION_CATALOG.find((c) => c.type === section.type)
                return (
                  <div
                    key={section.id}
                    className={`flex items-center gap-1 rounded-lg border px-2 py-1.5 text-sm transition-colors ${
                      selectedSectionId === section.id
                        ? 'border-cyan-500/40 bg-cyan-500/10'
                        : 'border-transparent hover:bg-slate-800/60'
                    }`}
                  >
                    <GripVertical size={14} className="shrink-0 text-gray-600" />
                    <button
                      type="button"
                      onClick={() => setSelectedSectionId(section.id)}
                      className={`min-w-0 flex-1 truncate text-left ${section.enabled ? 'text-gray-200' : 'text-gray-500 line-through'}`}
                    >
                      {meta?.label || section.type}
                    </button>
                    <button type="button" onClick={() => toggleSection(section.id)} className="p-1 text-gray-500 hover:text-white" title={section.enabled ? 'Hide' : 'Show'}>
                      {section.enabled ? <Eye size={13} /> : <EyeOff size={13} />}
                    </button>
                    <button type="button" disabled={i === 0} onClick={() => moveSection(section.id, -1)} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">
                      <ChevronUp size={13} />
                    </button>
                    <button type="button" disabled={i === draft.sections.length - 1} onClick={() => moveSection(section.id, 1)} className="p-1 text-gray-500 hover:text-white disabled:opacity-30">
                      <ChevronDown size={13} />
                    </button>
                    <button type="button" onClick={() => removeSection(section.id)} className="p-1 text-red-400/70 hover:text-red-400">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )
              })}
              {draft.sections.length === 0 && (
                <p className="admin-muted py-4 text-center text-xs">No sections yet. Click Add to build your page.</p>
              )}
            </div>
          </div>

          {selectedSection ? (
            <SectionEditor section={selectedSection} onChange={updateSection} />
          ) : (
            <div className="admin-card flex items-center justify-center py-16">
              <p className="admin-muted text-sm">Select a section to edit, or add a new one.</p>
            </div>
          )}
          </div>

          <aside className="space-y-4 xl:sticky xl:top-4 xl:self-start">
            <SeoFieldsEditor
              focusKeyword={draft.focusKeyword || ''}
              seoTitle={draft.seoTitle || ''}
              seoDescription={draft.seoDescription || ''}
              titleFallback={draft.title}
              descriptionFallback=""
              onFocusKeywordChange={(focusKeyword) => setDraft({ ...draft, focusKeyword })}
              onSeoTitleChange={(seoTitle) => setDraft({ ...draft, seoTitle })}
              onSeoDescriptionChange={(seoDescription) => setDraft({ ...draft, seoDescription })}
            />
            <SeoSuggestions page={draft} />
            {seoInput && <SeoChecklist input={seoInput} />}
          </aside>
        </div>

        {selectedSection && <SectionPreview section={selectedSection} />}
      </div>

      {showPicker && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4">
          <div className="admin-card max-h-[85vh] w-full max-w-2xl overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="admin-heading text-lg">Add Section</h3>
              <button type="button" onClick={() => setShowPicker(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            {(['layout', 'content', 'conversion', 'dynamic'] as const).map((cat) => (
              <div key={cat} className="mb-6">
                <p className="admin-label mb-2 capitalize">{cat}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {SECTION_CATALOG.filter((s) => s.category === cat).map((item) => (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => addSection(item.type)}
                      className="rounded-lg border border-slate-700/50 bg-slate-800/40 p-3 text-left transition-colors hover:border-cyan-500/40 hover:bg-slate-800"
                    >
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{item.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
