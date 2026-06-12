'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Plus, Save, Trash2, Star, ImagePlus } from 'lucide-react'
import type { PortfolioProject } from '@/lib/content-types'
import ImageUploadField from './ImageUploadField'
import SeoChecklist from './SeoChecklist'
import SeoFieldsEditor from './SeoFieldsEditor'

function buildPortfolioPageContent(project: PortfolioProject) {
  const highlights = project.highlights.map((h) => `## ${h}`).join('\n')
  return [project.longDescription, highlights].filter(Boolean).join('\n\n')
}

const emptyProject = (): PortfolioProject => ({
  id: 0,
  slug: '',
  title: '',
  category: 'Web Development',
  description: '',
  longDescription: '',
  highlights: [],
  image: '/images/projects/project-1.svg',
  gallery: [],
  technologies: [],
  year: new Date().getFullYear().toString(),
  client: '',
  featured: false,
})

function linesToArray(text: string) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

function arrayToLines(arr: string[]) {
  return arr.join('\n')
}

export default function AdminPortfolioManager() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [draft, setDraft] = useState<PortfolioProject | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [isNew, setIsNew] = useState(false)

  async function loadProjects() {
    const res = await fetch('/api/admin/portfolio')
    if (res.ok) {
      const data = await res.json()
      setProjects(data.projects)
      return data.projects as PortfolioProject[]
    }
    return []
  }

  useEffect(() => {
    loadProjects().finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (isNew) return
    if (projects.length === 0) {
      setDraft(null)
      setSelectedId(null)
      return
    }
    const project =
      selectedId !== null ? projects.find((p) => p.id === selectedId) : undefined
    if (project) {
      setDraft({ ...project })
    } else {
      setSelectedId(projects[0].id)
    }
  }, [selectedId, projects, isNew])

  async function saveProject() {
    if (!draft) return
    setSaving(true)
    setMessage('')

    const res = isNew
      ? await fetch('/api/admin/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        })
      : await fetch(`/api/admin/portfolio/${draft.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        })

    setSaving(false)

    if (res.ok) {
      const data = await res.json()
      setMessage('Saved successfully')
      setIsNew(false)
      await loadProjects()
      if (data.project) setSelectedId(data.project.id)
    } else {
      setMessage('Failed to save')
    }
  }

  async function deleteProject() {
    if (!draft || isNew) return
    if (!confirm(`Delete "${draft.title}"?`)) return

    const res = await fetch(`/api/admin/portfolio/${draft.id}`, { method: 'DELETE' })
    if (res.ok) {
      setIsNew(false)
      const remaining = await loadProjects()
      if (remaining.length > 0) {
        setSelectedId(remaining[0].id)
      } else {
        setSelectedId(null)
        setDraft(null)
      }
      setMessage('Project deleted')
    }
  }

  async function uploadGalleryImage(file: File) {
    if (!draft) return
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    if (res.ok) {
      const data = await res.json()
      setDraft({ ...draft, gallery: [...draft.gallery, data.url] })
    }
  }

  function startNew() {
    setIsNew(true)
    setSelectedId(null)
    setDraft(emptyProject())
  }

  const seoInput = useMemo(
    () => ({
      focusKeyword: draft?.focusKeyword || '',
      seoTitle: draft?.seoTitle || draft?.title || '',
      seoDescription: draft?.seoDescription || draft?.description || '',
      slug: draft?.slug || '',
      urlPath: draft?.slug ? `portfolio/${draft.slug}` : '',
      content: draft ? buildPortfolioPageContent(draft) : '',
      contentType: 'page' as const,
      imageCount: draft?.gallery.length || 0,
    }),
    [draft],
  )

  if (loading) {
    return <p className="admin-muted">Loading portfolio…</p>
  }

  if (!draft && !isNew) {
    return (
      <div className="admin-card py-12 text-center">
        <p className="admin-muted mb-4">No portfolio projects yet.</p>
        <button type="button" onClick={startNew} className="admin-btn-primary">
          <Plus size={16} />
          Create first project
        </button>
      </div>
    )
  }

  if (!draft) {
    return <p className="admin-muted">Loading portfolio…</p>
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[220px_1fr_300px]">
      <aside className="space-y-2">
        <button
          type="button"
          onClick={startNew}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-slate-600 py-2 text-sm text-gray-300 hover:border-cyan-500 hover:text-cyan-400"
        >
          <Plus size={16} />
          New project
        </button>
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setIsNew(false)
              setSelectedId(p.id)
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selectedId === p.id && !isNew
                ? 'bg-cyan-500/15 text-cyan-300'
                : 'text-gray-300 hover:bg-slate-800'
            }`}
          >
            {p.featured && <Star size={14} className="shrink-0 text-amber-400" />}
            <span className="truncate">{p.title}</span>
          </button>
        ))}
      </aside>

      <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">{isNew ? 'New Project' : 'Edit Project'}</h2>
          <div className="flex gap-2">
            {!isNew && (
              <button
                type="button"
                onClick={deleteProject}
                className="flex items-center gap-1 rounded-lg border border-red-500/40 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10"
              >
                <Trash2 size={14} />
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={saveProject}
              disabled={saving}
              className="flex items-center gap-1 rounded-lg bg-cyan-600 px-4 py-1.5 text-sm font-medium hover:bg-cyan-500 disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        {message && <p className="mb-4 text-sm text-cyan-400">{message}</p>}

        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={draft.featured}
              onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
              className="rounded"
            />
            <Star size={14} className="text-amber-400" />
            Show in Featured Work (homepage)
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Title</label>
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Slug</label>
              <input
                value={draft.slug}
                onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Category</label>
              <input
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Year</label>
              <input
                value={draft.year}
                onChange={(e) => setDraft({ ...draft, year: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Client</label>
              <input
                value={draft.client}
                onChange={(e) => setDraft({ ...draft, client: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">Short description</label>
            <input
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">Long description</label>
            <textarea
              value={draft.longDescription}
              onChange={(e) => setDraft({ ...draft, longDescription: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Highlights (one per line)</label>
              <textarea
                value={arrayToLines(draft.highlights)}
                onChange={(e) => setDraft({ ...draft, highlights: linesToArray(e.target.value) })}
                rows={4}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Technologies (one per line)</label>
              <textarea
                value={arrayToLines(draft.technologies)}
                onChange={(e) => setDraft({ ...draft, technologies: linesToArray(e.target.value) })}
                rows={4}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <ImageUploadField
            label="Cover image"
            value={draft.image}
            onChange={(url) => setDraft({ ...draft, image: url })}
          />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm text-gray-300">Project gallery</label>
              <label className="flex cursor-pointer items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300">
                <ImagePlus size={14} />
                Add image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) uploadGalleryImage(file)
                    e.target.value = ''
                  }}
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {draft.gallery.map((src, i) => (
                <div key={`${src}-${i}`} className="relative aspect-video overflow-hidden rounded-lg border border-slate-600">
                  <Image src={src} alt="" fill className="object-cover" sizes="200px" />
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        gallery: draft.gallery.filter((_, idx) => idx !== i),
                      })
                    }
                    className="absolute right-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-xs text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {draft.gallery.length === 0 && (
              <p className="text-sm text-gray-500">No gallery images yet. Upload images for the project detail page.</p>
            )}
          </div>
        </div>
      </div>

      <aside className="space-y-4 xl:sticky xl:top-4 xl:self-start">
        <SeoFieldsEditor
          focusKeyword={draft.focusKeyword || ''}
          seoTitle={draft.seoTitle || ''}
          seoDescription={draft.seoDescription || ''}
          titleFallback={draft.title}
          descriptionFallback={draft.description}
          onFocusKeywordChange={(focusKeyword) => setDraft({ ...draft, focusKeyword })}
          onSeoTitleChange={(seoTitle) => setDraft({ ...draft, seoTitle })}
          onSeoDescriptionChange={(seoDescription) => setDraft({ ...draft, seoDescription })}
        />
        <SeoChecklist input={seoInput} />
      </aside>
    </div>
  )
}
