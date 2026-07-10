import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy — Jynoro Website Cookie Usage',
  description: 'Learn how Jynoro uses cookies and similar technologies to improve your browsing experience on our web development and AI services website.',
  alternates: {
    canonical: '/cookies',
  },
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#050508] py-32 relative overflow-hidden">
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[300px] bg-[#00E5FF]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Cookie Policy</h1>
        <p className="text-gray-400 font-mono text-sm mb-12">Last Updated: June 2026</p>

        <div className="prose prose-invert prose-cyan max-w-none text-gray-300">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies</h2>
            <p className="mb-4">
              As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the site's functionality.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
            <p className="mb-4">
              We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Disabling Cookies</h2>
            <p className="mb-4">
              You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore, it is recommended that you do not disable cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">4. The Cookies We Set</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</li>
              <li><strong>Forms related cookies:</strong> When you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Third Party Cookies</h2>
            <p className="mb-4">
              In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">6. More Information</h2>
            <p className="mb-4">
              Hopefully, that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
              <br /><br />
              <strong>Email:</strong> info@jynoro.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
