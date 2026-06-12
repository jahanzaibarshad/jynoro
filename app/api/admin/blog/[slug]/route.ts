import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { readBlogPosts, writeBlogPosts, type BlogPost } from '@/lib/data-store'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const body = (await request.json()) as BlogPost
  const posts = await readBlogPosts()
  const index = posts.findIndex((p) => p.slug === slug)

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  posts[index] = { ...body, slug: body.slug || slug }
  await writeBlogPosts(posts)
  return NextResponse.json({ post: posts[index] })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await params
  const posts = await readBlogPosts()
  const filtered = posts.filter((p) => p.slug !== slug)

  if (filtered.length === posts.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await writeBlogPosts(filtered)
  return NextResponse.json({ success: true })
}
