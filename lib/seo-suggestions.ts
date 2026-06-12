import type { CmsPage } from './page-sections'
import { countPageImages, extractPageText } from './page-sections'

export interface SeoSuggestion {
  id: string
  type: 'title' | 'description' | 'content' | 'images' | 'structure' | 'keyword'
  priority: 'high' | 'medium' | 'low'
  title: string
  message: string
  action?: string
}

export function getPageSeoSuggestions(page: CmsPage): SeoSuggestion[] {
  const suggestions: SeoSuggestion[] = []
  const text = extractPageText(page)
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  const seoTitle = page.seoTitle || page.title
  const seoDescription = page.seoDescription || ''
  const keyword = page.focusKeyword?.trim() || ''
  const sectionTypes = page.sections.filter((s) => s.enabled).map((s) => s.type)
  const imageCount = countPageImages(page)

  if (!keyword) {
    suggestions.push({
      id: 'keyword-missing',
      type: 'keyword',
      priority: 'high',
      title: 'Set a Focus Keyword',
      message: 'Choose one primary keyword for this page. All SEO checks and suggestions work better with a focus keyword.',
      action: 'Add your target keyword in SEO Settings (e.g. "web development services").',
    })
  }

  if (seoTitle.length < 30) {
    suggestions.push({
      id: 'title-short',
      type: 'title',
      priority: 'high',
      title: 'Expand Your SEO Title',
      message: `Your title is ${seoTitle.length} characters. Aim for 50–60 characters for better search visibility.`,
      action: keyword
        ? `Try: "${keyword.charAt(0).toUpperCase() + keyword.slice(1)} | Jynoro"`
        : 'Include your main service and brand name.',
    })
  } else if (seoTitle.length > 60) {
    suggestions.push({
      id: 'title-long',
      type: 'title',
      priority: 'medium',
      title: 'Shorten Your SEO Title',
      message: `Your title is ${seoTitle.length} characters. Google may truncate titles over ~60 characters.`,
    })
  }

  if (keyword && !seoTitle.toLowerCase().includes(keyword.toLowerCase())) {
    suggestions.push({
      id: 'keyword-not-in-title',
      type: 'title',
      priority: 'high',
      title: 'Add Keyword to Title',
      message: `Include "${keyword}" in your SEO title for stronger relevance.`,
      action: `Example: "${keyword} — ${page.title}"`,
    })
  }

  if (seoDescription.length < 120) {
    suggestions.push({
      id: 'desc-short',
      type: 'description',
      priority: 'high',
      title: 'Write a Longer Meta Description',
      message: `Your description is ${seoDescription.length} characters. Aim for 140–160 characters with a clear benefit and call to action.`,
      action: keyword
        ? `Mention "${keyword}" and what visitors will get from this page.`
        : 'Summarize the page value and invite users to take action.',
    })
  } else if (seoDescription.length > 160) {
    suggestions.push({
      id: 'desc-long',
      type: 'description',
      priority: 'medium',
      title: 'Trim Meta Description',
      message: `Your description is ${seoDescription.length} characters. Keep it under 160 for full display in search results.`,
    })
  }

  if (keyword && seoDescription && !seoDescription.toLowerCase().includes(keyword.toLowerCase())) {
    suggestions.push({
      id: 'keyword-not-in-desc',
      type: 'description',
      priority: 'medium',
      title: 'Add Keyword to Meta Description',
      message: `Work "${keyword}" naturally into your meta description.`,
    })
  }

  if (wordCount < 300) {
    suggestions.push({
      id: 'content-thin',
      type: 'content',
      priority: 'high',
      title: 'Add More Content',
      message: `This page has ~${wordCount} words. Pages with 600+ words tend to rank better for competitive keywords.`,
      action: 'Add Rich Text, FAQ, or Image + Text sections to build depth.',
    })
  } else if (wordCount < 600) {
    suggestions.push({
      id: 'content-medium',
      type: 'content',
      priority: 'medium',
      title: 'Grow Content Further',
      message: `~${wordCount} words is a good start. Consider adding FAQs or client reviews to reach 600+ words.`,
    })
  }

  if (imageCount === 0) {
    suggestions.push({
      id: 'no-images',
      type: 'images',
      priority: 'high',
      title: 'Add Images',
      message: 'Pages with relevant images improve engagement and SEO. Search engines value visual content with proper alt text.',
      action: 'Add an "Image + Text" section with descriptive alt text containing your keyword.',
    })
  } else if (keyword) {
    suggestions.push({
      id: 'image-alt',
      type: 'images',
      priority: 'medium',
      title: 'Optimize Image Alt Text',
      message: 'Ensure image alt attributes describe the image and include your focus keyword where natural.',
      action: `Use alt text like "${keyword} project screenshot" or similar.`,
    })
  }

  if (!sectionTypes.includes('page-header') && !sectionTypes.includes('hero')) {
    suggestions.push({
      id: 'missing-h1',
      type: 'structure',
      priority: 'high',
      title: 'Add a Page Header or Hero',
      message: 'Every page needs a clear H1 heading. Add a Page Header or Hero section.',
    })
  }

  if (!sectionTypes.includes('faq') && page.slug !== 'home') {
    suggestions.push({
      id: 'add-faq',
      type: 'structure',
      priority: 'medium',
      title: 'Add an FAQ Section',
      message: 'FAQ sections help you rank for question-based searches and improve rich snippet chances.',
      action: 'Click "Add Section" → FAQ and add 3–5 common questions.',
    })
  }

  if (!sectionTypes.includes('testimonials')) {
    suggestions.push({
      id: 'add-reviews',
      type: 'structure',
      priority: 'low',
      title: 'Add Client Reviews',
      message: 'Social proof builds trust and keeps visitors on the page longer — a positive SEO signal.',
      action: 'Add a Reviews section with 2–4 testimonials.',
    })
  }

  if (!sectionTypes.includes('cta') && !sectionTypes.includes('buttons') && !sectionTypes.includes('contact-form')) {
    suggestions.push({
      id: 'add-cta',
      type: 'structure',
      priority: 'medium',
      title: 'Add a Call to Action',
      message: 'Guide visitors to the next step with a CTA banner or button row.',
    })
  }

  if (page.path !== '/' && !sectionTypes.includes('breadcrumb')) {
    suggestions.push({
      id: 'add-breadcrumb',
      type: 'structure',
      priority: 'low',
      title: 'Add Breadcrumb Navigation',
      message: 'Breadcrumbs improve UX and can appear as rich results in Google.',
      action: 'Add a Breadcrumb section (Home → Current Page).',
    })
  }

  const priorityOrder = { high: 0, medium: 1, low: 2 }
  return suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
}
