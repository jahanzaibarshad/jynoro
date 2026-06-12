import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { readPortfolio, writePortfolio, type PortfolioProject } from '@/lib/data-store'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const projectId = Number(id)
  const body = (await request.json()) as PortfolioProject
  const projects = await readPortfolio()
  const index = projects.findIndex((p) => p.id === projectId)

  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  projects[index] = { ...body, id: projectId }
  await writePortfolio(projects)
  return NextResponse.json({ project: projects[index] })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const projectId = Number(id)
  const projects = await readPortfolio()
  const filtered = projects.filter((p) => p.id !== projectId)

  if (filtered.length === projects.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  await writePortfolio(filtered)
  return NextResponse.json({ success: true })
}
