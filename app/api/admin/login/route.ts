import { NextResponse } from 'next/server'
import { setAdminSession, validateCredentials } from '@/lib/auth'
import { rateLimit } from '@/lib/rate-limit'

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

export async function POST(request: Request) {
  const ip = clientIp(request)
  if (!rateLimit(`login:${ip}`, 8, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  let body: { username?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const username = String(body.username || '').trim()
  const password = String(body.password || '')

  if (!username || !password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  await setAdminSession(username)
  return NextResponse.json({ success: true })
}
