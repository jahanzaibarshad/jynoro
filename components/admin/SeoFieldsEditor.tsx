'use client'

interface SeoFieldsEditorProps {
  focusKeyword: string
  seoTitle: string
  seoDescription: string
  onFocusKeywordChange: (value: string) => void
  onSeoTitleChange: (value: string) => void
  onSeoDescriptionChange: (value: string) => void
  titleFallback?: string
  descriptionFallback?: string
}

export default function SeoFieldsEditor({
  focusKeyword,
  seoTitle,
  seoDescription,
  onFocusKeywordChange,
  onSeoTitleChange,
  onSeoDescriptionChange,
  titleFallback = '',
  descriptionFallback = '',
}: SeoFieldsEditorProps) {
  const effectiveTitle = seoTitle || titleFallback
  const effectiveDescription = seoDescription || descriptionFallback

  return (
    <div className="admin-card space-y-3">
      <h3 className="admin-card-title">SEO Settings</h3>

      <div>
        <label className="admin-label">Focus Keyword</label>
        <input
          value={focusKeyword}
          onChange={(e) => onFocusKeywordChange(e.target.value)}
          placeholder="e.g. web development"
          className="admin-input w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-400">SEO Title</label>
        <input
          value={seoTitle}
          onChange={(e) => onSeoTitleChange(e.target.value)}
          placeholder={titleFallback || 'Page title for search engines'}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
        />
        <p className="mt-1 text-xs text-gray-600">{effectiveTitle.length}/60 characters</p>
      </div>

      <div>
        <label className="mb-1 block text-xs text-gray-400">Meta Description</label>
        <textarea
          value={seoDescription}
          onChange={(e) => onSeoDescriptionChange(e.target.value)}
          placeholder={descriptionFallback || 'Short description for search results'}
          rows={3}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
        />
        <p className="mt-1 text-xs text-gray-600">{effectiveDescription.length}/160 characters</p>
      </div>
    </div>
  )
}
