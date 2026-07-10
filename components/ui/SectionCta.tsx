import { type ReactNode } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { SECTION_CTA_WRAP, SECTION_HEADING, SECTION_BODY } from '@/lib/utils'

interface SectionCtaProps {
  title: ReactNode
  description: string
  href?: string
  buttonLabel: string
}

export default function SectionCta({
  title,
  description,
  href = '/contact',
  buttonLabel,
}: SectionCtaProps) {
  return (
    <div className={SECTION_CTA_WRAP}>
      <h2 className={`text-3xl font-bold text-white md:text-4xl ${SECTION_HEADING} mb-0`}>
        {title}
      </h2>
      <p className={`max-w-xl text-base leading-relaxed text-gray-400 md:text-lg ${SECTION_BODY} mb-0`}>{description}</p>
      <Link href={href} className="inline-flex w-full max-w-sm shrink-0 sm:w-auto">
        <Button variant="primary" size="lg" className="w-full justify-center sm:w-auto">
          {buttonLabel}
        </Button>
      </Link>
    </div>
  )
}
