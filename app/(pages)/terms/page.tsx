import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Jynoro Web Development & AI Agency',
  description: 'Read the terms and conditions for using Jynoro web development, full stack engineering, and AI integration services.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#050508] py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6C3DFF]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Terms of Service</h1>
        <p className="text-gray-400 font-mono text-sm mb-12">Last Updated: June 2026</p>

        <div className="prose prose-invert prose-cyan max-w-none text-gray-300">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing our website at jynoro.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Jynoro's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li>attempt to decompile or reverse engineer any software contained on Jynoro's website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Disclaimer</h2>
            <p className="mb-4">
              The materials on Jynoro's website are provided on an 'as is' basis. Jynoro makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Limitations</h2>
            <p className="mb-4">
              In no event shall Jynoro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Jynoro's website, even if Jynoro or a Jynoro authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Revisions and Errata</h2>
            <p className="mb-4">
              The materials appearing on Jynoro's website could include technical, typographical, or photographic errors. Jynoro does not warrant that any of the materials on its website are accurate, complete or current. Jynoro may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
