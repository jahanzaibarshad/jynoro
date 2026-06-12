import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailContent from '@/components/pages/ProjectDetailContent'
import { getProjectBySlug, readPortfolio } from '@/lib/data-store'

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await readPortfolio()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project Not Found | Jynoro' }
  }

  const seoTitle = project.seoTitle || project.title
  const seoDescription = project.seoDescription || project.description

  return {
    title: `${seoTitle} | Jynoro Portfolio`,
    description: seoDescription,
    keywords: project.focusKeyword,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'website',
      url: `https://jynoro.com/portfolio/${project.slug}`,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), readPortfolio()])

  if (!project) {
    notFound()
  }

  return <ProjectDetailContent project={project} allProjects={allProjects} />
}
