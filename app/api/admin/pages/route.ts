import { NextResponse } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'
import { readPages } from '@/lib/data-store'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const pages = await readPages()
  return NextResponse.json({ pages })
}
