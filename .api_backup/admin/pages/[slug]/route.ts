import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { readPages, writePages } from '@/lib/data-store'
import type { CmsPage } from '@/lib/page-sections'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const body = (await request.json()) as CmsPage
  const pages = await readPages()
  const index = pages.findIndex((p) => p.slug === slug)

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  pages[index] = { ...body, slug }
  await writePages(pages)
  return NextResponse.json({ page: pages[index] })
}
