import { readBlogPosts, readPortfolio } from '@/lib/data-store'
import type { CmsPage } from '@/lib/page-sections'
import SectionRenderer from '@/components/cms/SectionRenderer'

interface CmsPageRendererProps {
  page: CmsPage
}

export default async function CmsPageRenderer({ page }: CmsPageRendererProps) {
  const needsPortfolio = page.sections.some((s) => s.enabled && s.type === 'portfolio-featured')
  const needsBlog = page.sections.some((s) => s.enabled && s.type === 'blog-preview')

  const [projects, posts] = await Promise.all([
    needsPortfolio ? readPortfolio() : Promise.resolve([]),
    needsBlog ? readBlogPosts() : Promise.resolve([]),
  ])

  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <SectionRenderer
      sections={page.sections}
      featuredProjects={featuredProjects}
      blogPosts={posts}
    />
  )
}
