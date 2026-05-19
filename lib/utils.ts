export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export const SECTION_CLASS =
  'py-12 px-4 md:py-20 md:px-6 lg:px-12 lg:px-24 relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_600px]'

export const SECTION_HEADING = 'mb-4'
export const SECTION_BODY = 'mb-8'
export const SECTION_CTA = 'mt-12 mb-12'

/** Centers block-level buttons under headings (flex buttons ignore text-center). */
export const SECTION_CTA_WRAP =
  'mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center gap-6'

export const STAT_CARD =
  'flex min-h-[140px] flex-col items-center justify-center text-center'

export const CARD_GRID = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
export const CARD_BASE =
  'min-h-[280px] rounded-2xl p-6 md:p-8 bg-slate-800/60 border border-slate-700/50 transition-[background-color,border-color,box-shadow] duration-300'

/** Glass cards for parallax sections — image shows through */
export const CARD_GLASS =
  'bg-slate-950/55 border border-white/15 shadow-xl shadow-indigo-500/10 hover:bg-slate-950/65 hover:border-indigo-400/35 md:backdrop-blur-md'

export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString('en-US', options)
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
