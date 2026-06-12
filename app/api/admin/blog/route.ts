import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { readBlogPosts, writeBlogPosts, type BlogPost } from '@/lib/data-store'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const posts = await readBlogPosts()
  return NextResponse.json({ posts })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as BlogPost
  const posts = await readBlogPosts()
  const slug =
    body.slug ||
    body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  if (posts.some((p) => p.slug === slug)) {
    return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
  }

  const post: BlogPost = {
    ...body,
    slug,
    readTime: body.readTime || Math.max(1, Math.ceil((body.content || '').split(/\s+/).length / 200)),
    featured: body.featured ?? false,
  }

  posts.unshift(post)
  await writeBlogPosts(posts)
  return NextResponse.json({ post })
}
