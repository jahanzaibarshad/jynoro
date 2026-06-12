import { readBlogPosts } from '@/lib/data-store'
import BlogPreviewSectionClient from './BlogPreviewSectionClient'

export default async function BlogPreviewSection() {
  const posts = await readBlogPosts()
  return <BlogPreviewSectionClient posts={posts} />
}
