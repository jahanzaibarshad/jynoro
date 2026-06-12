import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import SmoothScroll from '@/components/layout/SmoothScroll'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Jynoro - Tech Solutions for Real Business Growth',
  description: 'Modern web development services for business growth. We build better websites and apps.',
  keywords: 'web development, web design, custom apps, SEO, digital solutions',
  authors: [{ name: 'Jynoro' }],
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  verification: {
    google: '2ZMy3SPkmeHkk66S5NxvkvA3vMjVMvJJyEP82Kgg6UY',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="2ZMy3SPkmeHkk66S5NxvkvA3vMjVMvJJyEP82Kgg6UY"
        />
      </head>
      <body className="bg-slate-900 text-white">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen pt-[5.25rem]">{children}</main>
          <Footer />
          <WhatsAppButton />
        </SmoothScroll>
      </body>
    </html>
  )
}
