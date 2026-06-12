import { cookies } from 'next/headers'
import crypto from 'crypto'

const COOKIE_NAME = 'jynoro_admin'
const SESSION_MS = 7 * 24 * 60 * 60 * 1000

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'jahanzaibranjha'
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'r4njha@2003'
const SECRET =
  process.env.ADMIN_SECRET ||
  (process.env.NODE_ENV === 'production'
    ? ''
    : 'jynoro-dev-secret-change-in-production')

function sign(payload: string) {
  if (!SECRET) {
    throw new Error('ADMIN_SECRET must be set in production')
  }
  return crypto.createHmac('sha256', SECRET).update(payload).digest('hex')
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

export function createSessionToken(username: string) {
  const exp = Date.now() + SESSION_MS
  const payload = `${username}:${exp}`
  return `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`
}

export function verifySessionToken(token: string): boolean {
  try {
    const [encoded, signature] = token.split('.')
    if (!encoded || !signature) return false
    const payload = Buffer.from(encoded, 'base64url').toString('utf-8')
    if (!safeEqual(sign(payload), signature)) return false
    const [, expStr] = payload.split(':')
    return Date.now() < Number(expStr)
  } catch {
    return false
  }
}

export function validateCredentials(username: string, password: string) {
  return safeEqual(username, ADMIN_USERNAME) && safeEqual(password, ADMIN_PASSWORD)
}

export async function setAdminSession(username: string) {
  const store = await cookies()
  store.set(COOKIE_NAME, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_MS / 1000,
  })
}

export async function clearAdminSession() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function isAdminAuthenticated() {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifySessionToken(token)
}
