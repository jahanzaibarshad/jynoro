import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailContent from '@/components/pages/ProjectDetailContent'
import { getProjectBySlug, PORTFOLIO_PROJECTS } from '@/lib/portfolio-data'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project Not Found | Jynoro' }
  }

  return {
    title: `${project.title} | Jynoro Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Jynoro`,
      description: project.description,
      type: 'website',
      url: `https://jynoro.com/portfolio/${project.slug}`,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetailContent project={project} />
}
