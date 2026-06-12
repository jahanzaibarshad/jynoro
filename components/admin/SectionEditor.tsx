'use client'

import type { PageSection } from '@/lib/page-sections'
import { SECTION_CATALOG } from '@/lib/page-sections'
import ImageUploadField from './ImageUploadField'

interface SectionEditorProps {
  section: PageSection
  onChange: (section: PageSection) => void
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="admin-label">{label}</label>
      {children}
    </div>
  )
}

const inputClass =
  'admin-input w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500'

export default function SectionEditor({ section, onChange }: SectionEditorProps) {
  const meta = SECTION_CATALOG.find((s) => s.type === section.type)
  const d = section.data

  function set(key: string, value: unknown) {
    onChange({ ...section, data: { ...d, [key]: value } })
  }

  function setItemArray(key: string, items: Record<string, unknown>[]) {
    set(key, items)
  }

  return (
    <div className="admin-card space-y-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">{meta?.label || section.type}</p>
        <p className="admin-muted text-xs">{meta?.description}</p>
      </div>

      {section.type === 'breadcrumb' && (
        <ArrayEditor
          label="Breadcrumb items"
          items={(d.items as Record<string, string>[]) || []}
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'href', label: 'Link' },
          ]}
          onChange={(items) => setItemArray('items', items)}
        />
      )}

      {(section.type === 'page-header' || section.type === 'hero') && (
        <>
          {section.type === 'hero' && (
            <Field label="Eyebrow badge">
              <input className={inputClass} value={String(d.eyebrow || '')} onChange={(e) => set('eyebrow', e.target.value)} />
            </Field>
          )}
          <Field label="Title">
            <input className={inputClass} value={String(d.title || d.headline || '')} onChange={(e) => set(section.type === 'hero' ? 'headline' : 'title', e.target.value)} />
          </Field>
          <Field label="Highlighted word">
            <input
              className={inputClass}
              value={String(d.titleHighlight || d.headlineHighlight || '')}
              onChange={(e) => set(section.type === 'hero' ? 'headlineHighlight' : 'titleHighlight', e.target.value)}
            />
          </Field>
          <Field label="Subtitle">
            <textarea className={inputClass} rows={2} value={String(d.subtitle || '')} onChange={(e) => set('subtitle', e.target.value)} />
          </Field>
        </>
      )}

      {section.type === 'cta' && (
        <>
          <Field label="Title"><input className={inputClass} value={String(d.title || '')} onChange={(e) => set('title', e.target.value)} /></Field>
          <Field label="Description"><textarea className={inputClass} rows={2} value={String(d.description || '')} onChange={(e) => set('description', e.target.value)} /></Field>
          <Field label="Button label"><input className={inputClass} value={String(d.buttonLabel || '')} onChange={(e) => set('buttonLabel', e.target.value)} /></Field>
          <Field label="Button link"><input className={inputClass} value={String(d.buttonHref || '')} onChange={(e) => set('buttonHref', e.target.value)} /></Field>
        </>
      )}

      {section.type === 'rich-text' && (
        <>
          <Field label="Section title"><input className={inputClass} value={String(d.title || '')} onChange={(e) => set('title', e.target.value)} /></Field>
          <Field label="Content (paragraphs separated by blank line)">
            <textarea className={inputClass} rows={8} value={String(d.content || '')} onChange={(e) => set('content', e.target.value)} />
          </Field>
        </>
      )}

      {section.type === 'image-text' && (
        <>
          <ImageUploadField
            label="Image"
            value={String(d.image || '')}
            onChange={(url) => set('image', url)}
          />
          <Field label="Alt text (important for SEO)"><input className={inputClass} value={String(d.alt || '')} onChange={(e) => set('alt', e.target.value)} /></Field>
          <Field label="Title"><input className={inputClass} value={String(d.title || '')} onChange={(e) => set('title', e.target.value)} /></Field>
          <Field label="Content"><textarea className={inputClass} rows={4} value={String(d.content || '')} onChange={(e) => set('content', e.target.value)} /></Field>
          <Field label="Image position">
            <select className={inputClass} value={String(d.imagePosition || 'left')} onChange={(e) => set('imagePosition', e.target.value)}>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </Field>
        </>
      )}

      {section.type === 'services-grid' && (
        <>
          <Field label="Section title"><input className={inputClass} value={String(d.title || '')} onChange={(e) => set('title', e.target.value)} /></Field>
          <Field label="Subtitle"><input className={inputClass} value={String(d.subtitle || '')} onChange={(e) => set('subtitle', e.target.value)} /></Field>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={Boolean(d.detailed)} onChange={(e) => set('detailed', e.target.checked)} />
            Detailed cards (features, price, CTA)
          </label>
          <ArrayEditor
            label="Services"
            items={(d.items as Record<string, unknown>[]) || []}
            fields={[
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description' },
              { key: 'icon', label: 'Icon (Code2, Zap, Search…)' },
              { key: 'price', label: 'Price' },
              { key: 'ctaLabel', label: 'Button label' },
              { key: 'ctaHref', label: 'Button link' },
            ]}
            onChange={(items) => setItemArray('items', items)}
          />
        </>
      )}

      {section.type === 'features-grid' && (
        <>
          <Field label="Section title"><input className={inputClass} value={String(d.title || '')} onChange={(e) => set('title', e.target.value)} /></Field>
          <ArrayEditor
            label="Features"
            items={(d.items as Record<string, unknown>[]) || []}
            fields={[
              { key: 'title', label: 'Title' },
              { key: 'description', label: 'Description' },
              { key: 'icon', label: 'Icon' },
            ]}
            onChange={(items) => setItemArray('items', items)}
          />
        </>
      )}

      {section.type === 'testimonials' && (
        <>
          <Field label="Section title"><input className={inputClass} value={String(d.title || '')} onChange={(e) => set('title', e.target.value)} /></Field>
          <ArrayEditor
            label="Reviews"
            items={(d.items as Record<string, unknown>[]) || []}
            fields={[
              { key: 'name', label: 'Name' },
              { key: 'role', label: 'Role' },
              { key: 'content', label: 'Quote' },
            ]}
            onChange={(items) => setItemArray('items', items)}
          />
        </>
      )}

      {section.type === 'faq' && (
        <>
          <Field label="Section title"><input className={inputClass} value={String(d.title || '')} onChange={(e) => set('title', e.target.value)} /></Field>
          <ArrayEditor
            label="Questions"
            items={(d.items as Record<string, unknown>[]) || []}
            fields={[
              { key: 'question', label: 'Question' },
              { key: 'answer', label: 'Answer' },
            ]}
            onChange={(items) => setItemArray('items', items)}
          />
        </>
      )}

      {section.type === 'contact-info' && (
        <ArrayEditor
          label="Contact cards"
          items={(d.items as Record<string, unknown>[]) || []}
          fields={[
            { key: 'icon', label: 'Icon (emoji)' },
            { key: 'title', label: 'Title' },
            { key: 'value', label: 'Value' },
          ]}
          onChange={(items) => setItemArray('items', items)}
        />
      )}

      {section.type === 'two-column' && (
        <ArrayEditor
          label="Columns"
          items={(d.columns as Record<string, unknown>[]) || []}
          fields={[
            { key: 'icon', label: 'Icon' },
            { key: 'title', label: 'Title' },
            { key: 'content', label: 'Content' },
          ]}
          onChange={(items) => setItemArray('columns', items)}
          maxItems={2}
        />
      )}

      {section.type === 'founder' && (
        <>
          <Field label="Section title"><input className={inputClass} value={String(d.sectionTitle || '')} onChange={(e) => set('sectionTitle', e.target.value)} /></Field>
          <Field label="Name"><input className={inputClass} value={String(d.name || '')} onChange={(e) => set('name', e.target.value)} /></Field>
          <Field label="Role"><input className={inputClass} value={String(d.role || '')} onChange={(e) => set('role', e.target.value)} /></Field>
          <Field label="Initials"><input className={inputClass} value={String(d.initials || '')} onChange={(e) => set('initials', e.target.value)} /></Field>
          <Field label="Bio (one paragraph per line)">
            <textarea className={inputClass} rows={4} value={((d.bio as string[]) || []).join('\n')} onChange={(e) => set('bio', e.target.value.split('\n').filter(Boolean))} />
          </Field>
          <Field label="Tags (comma separated)">
            <input className={inputClass} value={((d.tags as string[]) || []).join(', ')} onChange={(e) => set('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))} />
          </Field>
        </>
      )}

      {section.type === 'buttons' && (
        <ArrayEditor
          label="Buttons"
          items={(d.items as Record<string, unknown>[]) || []}
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'href', label: 'Link' },
            { key: 'variant', label: 'Variant (primary/secondary)' },
          ]}
          onChange={(items) => setItemArray('items', items)}
        />
      )}

      {(section.type === 'portfolio-featured' || section.type === 'blog-preview') && (
        <p className="admin-muted text-sm">
          This section loads content automatically from your Portfolio or Blog manager. You can customize the heading below.
        </p>
      )}

      {(section.type === 'portfolio-featured' || section.type === 'blog-preview' || section.type === 'stats') && (
        <>
          {(section.type === 'portfolio-featured' || section.type === 'blog-preview') && (
            <>
              <Field label="Title"><input className={inputClass} value={String(d.title || '')} onChange={(e) => set('title', e.target.value)} /></Field>
              <Field label="Subtitle"><input className={inputClass} value={String(d.subtitle || '')} onChange={(e) => set('subtitle', e.target.value)} /></Field>
            </>
          )}
          {section.type === 'stats' && (
            <ArrayEditor
              label="Stats"
              items={(d.items as Record<string, unknown>[]) || []}
              fields={[
                { key: 'value', label: 'Value' },
                { key: 'label', label: 'Label' },
                { key: 'icon', label: 'Icon' },
              ]}
              onChange={(items) => setItemArray('items', items)}
            />
          )}
        </>
      )}

      {section.type === 'contact-form' && (
        <>
          <Field label="Title"><input className={inputClass} value={String(d.title || '')} onChange={(e) => set('title', e.target.value)} /></Field>
          <Field label="Subtitle"><input className={inputClass} value={String(d.subtitle || '')} onChange={(e) => set('subtitle', e.target.value)} /></Field>
        </>
      )}
    </div>
  )
}

function ArrayEditor({
  label,
  items,
  fields,
  onChange,
  maxItems,
}: {
  label: string
  items: Record<string, unknown>[]
  fields: { key: string; label: string }[]
  onChange: (items: Record<string, unknown>[]) => void
  maxItems?: number
}) {
  const inputClass =
    'admin-input w-full rounded border border-slate-600 bg-slate-800 px-2 py-1.5 text-xs text-white outline-none focus:border-cyan-500'

  function updateItem(index: number, key: string, value: string) {
    const next = [...items]
    next[index] = { ...next[index], [key]: value }
    onChange(next)
  }

  function addItem() {
    if (maxItems && items.length >= maxItems) return
    const blank = Object.fromEntries(fields.map((f) => [f.key, '']))
    onChange([...items, blank])
  }

  function removeItem(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="admin-label mb-0">{label}</span>
        <button type="button" onClick={addItem} className="text-xs text-cyan-400 hover:text-cyan-300">
          + Add
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">Item {i + 1}</span>
              <button type="button" onClick={() => removeItem(i)} className="text-xs text-red-400 hover:text-red-300">
                Remove
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="mb-0.5 block text-[10px] text-gray-500">{f.label}</label>
                  <input
                    className={inputClass}
                    value={String(item[f.key] || '')}
                    onChange={(e) => updateItem(i, f.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
