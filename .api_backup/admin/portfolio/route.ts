import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { readPortfolio, writePortfolio, type PortfolioProject } from '@/lib/data-store'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const projects = await readPortfolio()
  return NextResponse.json({ projects })
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = (await request.json()) as PortfolioProject
  const projects = await readPortfolio()
  const nextId = projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1
  const slug =
    body.slug ||
    body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  const project: PortfolioProject = {
    ...body,
    id: nextId,
    slug,
    gallery: body.gallery || [],
    highlights: body.highlights || [],
    technologies: body.technologies || [],
    featured: body.featured ?? false,
  }

  projects.push(project)
  await writePortfolio(projects)
  return NextResponse.json({ project })
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projects = (await request.json()) as PortfolioProject[]
  await writePortfolio(projects)
  return NextResponse.json({ success: true })
}
