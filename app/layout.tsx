import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingBot from '@/components/layout/FloatingBot'
import ScrollToTop from '@/components/layout/ScrollToTop'
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
  title: {
    default: 'Jynoro | Web Development, AI Automation, SEO & Design Agency',
    template: '%s | Jynoro',
  },
  description: 'Jynoro is a web development, AI automation, SEO, and graphic design agency building responsive websites, custom web apps, AI agents, and growth-focused digital systems for businesses worldwide.',
  keywords: [
    'jynoro',
    'jynoro agency',
    'jynoro web development',
    'jynoro website',
    'web development', 
    'web development agency',
    'website development services',
    'full stack development', 
    'full stack web development services',
    'ai agent',
    'ai automation agency',
    'artificial intelligence integration',
    'autonomous ai agents',
    'custom web apps', 
    'custom web application development',
    'Next.js development', 
    'React development',
    'SaaS architecture', 
    'web design agency', 
    'graphic design services',
    'AI orchestration', 
    'RAG pipelines', 
    'SEO optimization', 
    'technical SEO agency',
    'seo services',
    'website maintenance services',
    'TypeScript engineering', 
    'frontend development', 
    'backend development', 
    'custom software development',
    'enterprise software',
    'startups tech partner'
  ],
  authors: [{ name: 'Jynoro Engineering' }],
  creator: 'Jynoro',
  publisher: 'Jynoro',
  metadataBase: new URL('https://jynoro.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jynoro.com',
    title: 'Jynoro | Web Development, AI Automation, SEO & Design Agency',
    description: 'Jynoro builds responsive websites, custom web apps, AI agents, SEO systems, and premium digital design for businesses worldwide.',
    siteName: 'Jynoro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jynoro | Web Development, AI Automation, SEO & Design Agency',
    description: 'Web development, AI automation, SEO, custom software, and graphic design by Jynoro.',
    creator: '@jynoro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.webp', type: 'image/webp' }],
    apple: [{ url: '/favicon.webp', type: 'image/webp' }],
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
      <body className="bg-[#050508] text-white" suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen pt-[4.75rem] md:pt-[5.25rem]">{children}</main>
          <Footer />
          <FloatingBot />
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  )
}
