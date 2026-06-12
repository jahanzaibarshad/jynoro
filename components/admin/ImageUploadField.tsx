'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'

interface ImageUploadFieldProps {
  label: string
  value: string
  onChange: (url: string) => void
}

export default function ImageUploadField({ label, value, onChange }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFile(file: File) {
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    setUploading(false)

    if (res.ok) {
      const data = await res.json()
      onChange(data.url)
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm text-gray-300">{label}</label>
      <div className="flex flex-wrap items-start gap-3">
        {value && (
          <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-slate-600">
            <Image src={value} alt="" fill className="object-cover" sizes="128px" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-1 top-1 rounded bg-black/60 p-0.5 text-white"
            >
              <X size={14} />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-lg border border-dashed border-slate-600 px-4 py-3 text-sm text-gray-400 hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-50"
        >
          <Upload size={16} />
          {uploading ? 'Uploading…' : 'Choose image'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste image URL"
        className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
      />
    </div>
  )
}
