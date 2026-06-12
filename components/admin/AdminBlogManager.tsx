'use client'

import { useEffect, useMemo, useState } from 'react'
import { Plus, Save, Trash2, Star } from 'lucide-react'
import type { BlogPost } from '@/lib/content-types'
import SeoChecklist from './SeoChecklist'
import SeoFieldsEditor from './SeoFieldsEditor'

const emptyPost = (): BlogPost => ({
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: 'Web Development',
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  readTime: 5,
  featured: false,
})

export default function AdminBlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [draft, setDraft] = useState<BlogPost | null>(null)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [isNew, setIsNew] = useState(false)

  async function loadPosts() {
    const res = await fetch('/api/admin/blog')
    if (res.ok) {
      const data = await res.json()
      setPosts(data.posts)
      return data.posts as BlogPost[]
    }
    return []
  }

  useEffect(() => {
    loadPosts().finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (isNew) return
    if (posts.length === 0) {
      setDraft(null)
      setSelectedSlug(null)
      return
    }
    const post = selectedSlug ? posts.find((p) => p.slug === selectedSlug) : undefined
    if (post) {
      setDraft({ ...post })
    } else {
      setSelectedSlug(posts[0].slug)
    }
  }, [selectedSlug, posts, isNew])

  async function savePost() {
    if (!draft) return
    setSaving(true)
    setMessage('')

    const res = isNew
      ? await fetch('/api/admin/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        })
      : await fetch(`/api/admin/blog/${selectedSlug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draft),
        })

    setSaving(false)

    if (res.ok) {
      const data = await res.json()
      setMessage('Saved successfully')
      setIsNew(false)
      setSelectedSlug(data.post.slug)
      await loadPosts()
    } else {
      const err = await res.json().catch(() => ({}))
      setMessage(err.error || 'Failed to save')
    }
  }

  async function deletePost() {
    if (!draft || isNew) return
    if (!confirm(`Delete "${draft.title}"?`)) return

    const res = await fetch(`/api/admin/blog/${selectedSlug}`, { method: 'DELETE' })
    if (res.ok) {
      setIsNew(false)
      const remaining = await loadPosts()
      if (remaining.length > 0) {
        setSelectedSlug(remaining[0].slug)
      } else {
        setSelectedSlug(null)
        setDraft(null)
      }
      setMessage('Post deleted')
    }
  }

  function startNew() {
    setIsNew(true)
    setSelectedSlug(null)
    setDraft(emptyPost())
  }

  const seoInput = useMemo(
    () => ({
      focusKeyword: draft?.focusKeyword || '',
      seoTitle: draft?.seoTitle || draft?.title || '',
      seoDescription: draft?.seoDescription || draft?.excerpt || '',
      slug: draft?.slug || '',
      urlPath: draft?.slug ? `blog/${draft.slug}` : '',
      content: draft?.content || '',
      contentType: 'blog' as const,
    }),
    [draft],
  )

  if (loading) {
    return <p className="admin-muted">Loading blog posts…</p>
  }

  if (!draft && !isNew) {
    return (
      <div className="admin-card py-12 text-center">
        <p className="admin-muted mb-4">No blog posts yet.</p>
        <button type="button" onClick={startNew} className="admin-btn-primary">
          <Plus size={16} />
          Create first post
        </button>
      </div>
    )
  }

  if (!draft) {
    return <p className="admin-muted">Loading blog posts…</p>
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
          New post
        </button>
        {posts.map((p) => (
          <button
            key={p.slug}
            type="button"
            onClick={() => {
              setIsNew(false)
              setSelectedSlug(p.slug)
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              selectedSlug === p.slug && !isNew
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
          <h2 className="text-xl font-semibold">{isNew ? 'New Post' : 'Edit Post'}</h2>
          <div className="flex gap-2">
            {!isNew && (
              <button
                type="button"
                onClick={deletePost}
                className="flex items-center gap-1 rounded-lg border border-red-500/40 px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10"
              >
                <Trash2 size={14} />
                Delete
              </button>
            )}
            <button
              type="button"
              onClick={savePost}
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
            Featured post (shows badge on homepage)
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
              <label className="mb-1.5 block text-sm text-gray-300">Date</label>
              <input
                value={draft.date}
                onChange={(e) => setDraft({ ...draft, date: e.target.value })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">Read time (min)</label>
              <input
                type="number"
                min={1}
                value={draft.readTime}
                onChange={(e) => setDraft({ ...draft, readTime: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">Excerpt</label>
            <textarea
              value={draft.excerpt}
              onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
              rows={2}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">Content</label>
            <textarea
              value={draft.content}
              onChange={(e) => setDraft({ ...draft, content: e.target.value })}
              rows={10}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 font-mono text-sm text-white outline-none focus:border-cyan-500"
            />
            <p className="mt-1 text-xs text-gray-600">
              Tip: use ## Subheading for sections. Add ![alt text](url) for images.
            </p>
          </div>
        </div>
      </div>

      <aside className="space-y-4 xl:sticky xl:top-4 xl:self-start">
        <SeoFieldsEditor
          focusKeyword={draft.focusKeyword || ''}
          seoTitle={draft.seoTitle || ''}
          seoDescription={draft.seoDescription || ''}
          titleFallback={draft.title}
          descriptionFallback={draft.excerpt}
          onFocusKeywordChange={(focusKeyword) => setDraft({ ...draft, focusKeyword })}
          onSeoTitleChange={(seoTitle) => setDraft({ ...draft, seoTitle })}
          onSeoDescriptionChange={(seoDescription) => setDraft({ ...draft, seoDescription })}
        />
        <SeoChecklist input={seoInput} />
      </aside>
    </div>
  )
}
