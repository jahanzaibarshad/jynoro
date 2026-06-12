import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { isAdminAuthenticated } from '@/lib/auth'

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const maxBytes = 5 * 1024 * 1024
  if (file.size > maxBytes) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
  const filename = `${Date.now()}-${safeName}`
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')

  await fs.mkdir(uploadDir, { recursive: true })
  await fs.writeFile(path.join(uploadDir, filename), buffer)

  return NextResponse.json({ url: `/uploads/${filename}` })
}
