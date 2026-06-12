export type SeoCheckStatus = 'pass' | 'fail' | 'warn'

export interface SeoCheck {
  id: string
  label: string
  message: string
  status: SeoCheckStatus
}

export interface SeoCheckGroup {
  id: string
  title: string
  checks: SeoCheck[]
}

export type SeoContentType = 'blog' | 'page'

export interface SeoContentInput {
  focusKeyword: string
  seoTitle: string
  seoDescription: string
  slug: string
  content: string
  contentType: SeoContentType
  urlPath?: string
  imageCount?: number
}

const POWER_WORDS = [
  'ultimate', 'complete', 'proven', 'essential', 'best', 'amazing', 'powerful',
  'exclusive', 'guaranteed', 'breakthrough', 'effortless', 'stunning', 'secret',
  'instant', 'free', 'new', 'guide', 'tips', 'hack', 'boost', 'grow',
]

const POSITIVE_WORDS = [
  'great', 'amazing', 'best', 'love', 'excellent', 'happy', 'success', 'proven',
  'easy', 'powerful', 'effective', 'win', 'boost', 'growth', 'perfect',
]

const NEGATIVE_WORDS = [
  'avoid', 'stop', 'never', 'worst', 'mistake', 'fail', "don't", 'warning',
  'danger', 'bad', 'wrong', 'hate', 'problem', 'risk',
]

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function normalize(text: string) {
  return text.toLowerCase().trim()
}

function containsKeyword(text: string, keyword: string) {
  if (!keyword.trim()) return false
  return normalize(text).includes(normalize(keyword))
}

function countKeywordOccurrences(text: string, keyword: string) {
  if (!keyword.trim()) return 0
  const escaped = keyword.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(escaped, 'gi')
  return (text.match(regex) || []).length
}

function slugifyKeyword(keyword: string) {
  return normalize(keyword).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function extractHeadings(content: string) {
  const headings: string[] = []
  for (const line of content.split('\n')) {
    const md = line.match(/^#{1,6}\s+(.+)/)
    if (md) headings.push(md[1])
    const html = line.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i)
    if (html) headings.push(html[1].replace(/<[^>]+>/g, ''))
  }
  return headings
}

function extractImageAlts(content: string) {
  const alts: string[] = []
  const md = content.matchAll(/!\[([^\]]*)\]/g)
  for (const match of md) alts.push(match[1])
  const html = content.matchAll(/<img[^>]+alt=["']([^"']*)["']/gi)
  for (const match of html) alts.push(match[1])
  return alts
}

function getIntroduction(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean)
  const introLength = Math.max(1, Math.ceil(words.length * 0.1))
  return words.slice(0, introLength).join(' ')
}

function hasExternalLinks(content: string) {
  return /https?:\/\/(?!.*jynoro\.com)/i.test(content)
}

function hasInternalLinks(content: string) {
  return (
    /\[([^\]]+)\]\(\/(?!\/)/.test(content) ||
    /href=["']\/(?!\/)/i.test(content) ||
    /jynoro\.com/i.test(content)
  )
}

function check(id: string, label: string, pass: boolean, passMsg: string, failMsg: string, warn = false): SeoCheck {
  return {
    id,
    label,
    message: pass ? passMsg : failMsg,
    status: pass ? 'pass' : warn ? 'warn' : 'fail',
  }
}

export function analyzeSeo(input: SeoContentInput): SeoCheckGroup[] {
  const keyword = input.focusKeyword.trim()
  const title = input.seoTitle.trim() || input.slug
  const description = input.seoDescription.trim()
  const content = input.content.trim()
  const slug = input.slug.trim()
  const urlPath = input.urlPath || slug
  const wordCount = countWords(content)
  const minWords = input.contentType === 'blog' ? 600 : 150
  const keywordCount = countKeywordOccurrences(content, keyword)
  const density = wordCount > 0 && keyword ? (keywordCount / wordCount) * 100 : 0
  const headings = extractHeadings(content)
  const imageAlts = extractImageAlts(content)
  const totalImages = imageAlts.length + (input.imageCount || 0)
  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim().length > 0)
  const avgParagraphWords =
    paragraphs.length > 0
      ? paragraphs.reduce((sum, p) => sum + countWords(p), 0) / paragraphs.length
      : countWords(content)

  const basicSeo: SeoCheck[] = keyword
    ? [
        check(
          'keyword-title',
          'Keyword in SEO Title',
          containsKeyword(title, keyword),
          `Focus Keyword "${keyword}" is used in the SEO title.`,
          'Add the Focus Keyword to your SEO title.',
        ),
        check(
          'keyword-description',
          'Keyword in Meta Description',
          containsKeyword(description, keyword),
          'Focus Keyword used inside SEO meta description.',
          'Add the Focus Keyword to your meta description.',
        ),
        check(
          'keyword-url',
          'Keyword in URL',
          containsKeyword(urlPath, keyword) || containsKeyword(slug, slugifyKeyword(keyword)),
          'Focus Keyword used in the URL.',
          'Include the Focus Keyword (or a close variant) in the URL slug.',
        ),
        check(
          'keyword-intro',
          'Keyword in Introduction',
          containsKeyword(getIntroduction(content), keyword),
          'Focus Keyword appears in the first 10% of the content.',
          'Use the Focus Keyword early in your opening paragraph.',
        ),
        check(
          'keyword-content',
          'Keyword in Content',
          keywordCount > 0,
          'Focus Keyword found in the content.',
          'Use the Focus Keyword naturally throughout the content.',
        ),
        check(
          'content-length',
          'Content Length',
          wordCount >= minWords,
          `Content is ${wordCount} words long. Good job!`,
          `Content is ${wordCount} words. Aim for at least ${minWords} words.`,
          wordCount >= minWords * 0.5 && wordCount < minWords,
        ),
      ]
    : [
        {
          id: 'keyword-missing',
          label: 'Focus Keyword',
          message: 'Set a Focus Keyword to run SEO checks.',
          status: 'warn',
        },
        check(
          'content-length',
          'Content Length',
          wordCount >= minWords,
          `Content is ${wordCount} words long.`,
          `Content is ${wordCount} words. Aim for at least ${minWords} words.`,
          wordCount >= minWords * 0.5 && wordCount < minWords,
        ),
      ]

  const additional: SeoCheck[] = keyword
    ? [
        check(
          'keyword-subheadings',
          'Keyword in Subheadings',
          headings.some((h) => containsKeyword(h, keyword)),
          'Focus Keyword found in subheading(s).',
          'Add the Focus Keyword to at least one subheading (use ## Heading).',
        ),
        check(
          'keyword-alt',
          'Keyword in Image Alt Tags',
          imageAlts.some((alt) => containsKeyword(alt, keyword)),
          totalImages === 0
            ? 'No images in content yet — add images with descriptive alt text.'
            : 'Focus Keyword found in image alt attribute(s).',
          totalImages === 0
            ? 'Add images with alt text containing your Focus Keyword.'
            : 'Include the Focus Keyword in at least one image alt attribute.',
          totalImages > 0 && !imageAlts.some((alt) => containsKeyword(alt, keyword)),
        ),
        check(
          'keyword-density',
          'Keyword Density',
          density >= 0.5 && density <= 2.5,
          `Keyword density is ${density.toFixed(2)}%. The Focus Keyword appears ${keywordCount} time(s).`,
          density < 0.5
            ? `Keyword density is ${density.toFixed(2)}%. Use the Focus Keyword a few more times.`
            : `Keyword density is ${density.toFixed(2)}%. Avoid overusing the Focus Keyword.`,
          density > 2.5,
        ),
        check(
          'url-length',
          'URL Length',
          urlPath.length <= 75,
          `URL is ${urlPath.length} characters long. Good!`,
          `URL is ${urlPath.length} characters. Keep it under 75 characters.`,
        ),
        check(
          'external-links',
          'External Linking',
          hasExternalLinks(content),
          'You are linking to external resources.',
          'Add at least one relevant external link to authoritative sources.',
        ),
        check(
          'internal-links',
          'Internal Linking',
          hasInternalLinks(content),
          'You are linking to other pages on your website.',
          'Link to other pages on your site (e.g. /portfolio, /contact).',
        ),
      ]
    : [
        check(
          'url-length',
          'URL Length',
          urlPath.length <= 75,
          `URL is ${urlPath.length} characters long.`,
          `URL is ${urlPath.length} characters. Keep it under 75 characters.`,
        ),
      ]

  const titleLower = normalize(title)
  const titleReadability: SeoCheck[] = [
    check(
      'title-keyword-start',
      'Keyword at Beginning of Title',
      keyword ? titleLower.startsWith(normalize(keyword).split(' ')[0]) : title.length > 0,
      keyword
        ? 'Focus Keyword used near the beginning of the SEO title.'
        : 'SEO title is set.',
      'Place the Focus Keyword closer to the start of your SEO title.',
    ),
    check(
      'title-sentiment',
      'Title Sentiment',
      POSITIVE_WORDS.some((w) => titleLower.includes(w)) ||
        NEGATIVE_WORDS.some((w) => titleLower.includes(w)),
      'Your title has a positive or negative sentiment.',
      'Add emotional words to make your title more compelling.',
    ),
    check(
      'title-power-words',
      'Power Words in Title',
      POWER_WORDS.some((w) => titleLower.includes(w)),
      'Your title contains a power word.',
      "Your title doesn't contain a power word. Try words like 'ultimate', 'proven', or 'essential'.",
    ),
    check(
      'title-numbers',
      'Numbers in Title',
      /\d/.test(title),
      'You are using a number in your SEO title.',
      'Consider adding a number to your title (e.g. "10 Tips…") for higher click-through rates.',
    ),
  ]

  const contentReadability: SeoCheck[] = [
    check(
      'toc',
      'Table of Contents',
      headings.length >= 2 || /table of contents/i.test(content),
      headings.length >= 2
        ? 'Your content has multiple headings (acts as a structure/table of contents).'
        : 'Table of contents marker found.',
      'Add subheadings (## Section) to structure your content like a table of contents.',
    ),
    check(
      'short-paragraphs',
      'Short Paragraphs',
      avgParagraphWords <= 120,
      'You are using short, scannable paragraphs.',
      `Average paragraph is ${Math.round(avgParagraphWords)} words. Break up long blocks of text.`,
    ),
    check(
      'media',
      'Images and Media',
      totalImages > 0 || /!\[|<img|youtube|vimeo|\.(jpg|png|webp|gif)/i.test(content),
      'Your content contains images and/or media.',
      'Add images or media to improve engagement and readability.',
    ),
  ]

  return [
    { id: 'basic', title: 'Basic SEO', checks: basicSeo },
    { id: 'additional', title: 'Additional', checks: additional },
    { id: 'title', title: 'Title Readability', checks: titleReadability },
    { id: 'content', title: 'Content Readability', checks: contentReadability },
  ]
}

export function getSeoScore(groups: SeoCheckGroup[]) {
  const checks = groups.flatMap((g) => g.checks)
  const pass = checks.filter((c) => c.status === 'pass').length
  const total = checks.length
  return total > 0 ? Math.round((pass / total) * 100) : 0
}
