import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — How Jynoro Protects Your Data',
  description: 'Learn how Jynoro collects, uses, and protects your personal data. We are committed to privacy and transparency in all our web development and AI services.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#050508] py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Privacy Policy</h1>
        <p className="text-gray-400 font-mono text-sm mb-12">Last Updated: June 2026</p>

        <div className="prose prose-invert prose-cyan max-w-none text-gray-300">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="mb-4">
              At Jynoro, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">2. The Data We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes billing address, email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, operating system and platform.</li>
              <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br />
              <strong>Email:</strong> info@jynoro.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
