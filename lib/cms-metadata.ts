import type { Metadata } from 'next'
import type { CmsPage } from './page-sections'

export function buildCmsMetadata(page: CmsPage, fallback: Metadata): Metadata {
  const title = page.seoTitle || (typeof fallback.title === 'string' ? fallback.title : page.title)
  const description =
    page.seoDescription || (typeof fallback.description === 'string' ? fallback.description : '')

  return {
    ...fallback,
    title,
    description,
    keywords: page.focusKeyword || fallback.keywords,
    openGraph: {
      ...fallback.openGraph,
      title,
      description,
      url: `https://jynoro.com${page.path}`,
    },
  }
}
