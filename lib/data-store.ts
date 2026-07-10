import 'server-only'
import fs from 'fs/promises'
import path from 'path'
import type { BlogPost, PortfolioProject } from './content-types'
import type { CmsPage } from './page-sections'

export type { BlogPost, PortfolioProject } from './content-types'
export { getProjectHref } from './content-types'

const DATA_DIR = path.join(process.cwd(), 'data')
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json')
const BLOG_FILE = path.join(DATA_DIR, 'blog.json')
const PAGES_FILE = path.join(DATA_DIR, 'pages.json')
async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true })
}

export async function readPortfolio(): Promise<PortfolioProject[]> {
  try {
    const raw = await fs.readFile(PORTFOLIO_FILE, 'utf-8')
    const data = JSON.parse(raw) as { projects: PortfolioProject[] }
    return data.projects
  } catch {
    const { PORTFOLIO_PROJECTS } = await import('./portfolio-data')
    return PORTFOLIO_PROJECTS.map((p) => ({ ...p, featured: p.featured ?? true }))
  }
}

export async function writePortfolio(projects: PortfolioProject[]) {
  await ensureDataDir()
  await fs.writeFile(PORTFOLIO_FILE, JSON.stringify({ projects }, null, 2), 'utf-8')
}

export async function readBlogPosts(): Promise<BlogPost[]> {
  // Hardcoded to return the 7 new blogs instead of reading from backend
  return defaultBlogPosts()
}

export async function writeBlogPosts(posts: BlogPost[]) {
  await ensureDataDir()
  await fs.writeFile(BLOG_FILE, JSON.stringify({ posts }, null, 2), 'utf-8')
}

function defaultBlogPosts(): BlogPost[] {
  return [
    {
      slug: 'autonomous-ai-agents',
      title: 'The Rise of Autonomous AI Agents in Enterprise Workflows',
      excerpt: 'How businesses are moving beyond simple chatbots to deploy autonomous AI agents capable of executing complex, multi-step workflows.',
      content: 'We are witnessing a massive paradigm shift in artificial intelligence. The era of the simple chatbot is ending, and the era of the Autonomous AI Agent has begun. Businesses are no longer satisfied with AI that simply answers questions; they want AI that takes action.\n\nUnlike traditional LLMs that rely entirely on user prompts to generate text, an autonomous agent operates independently. Given a high-level goal, the agent breaks the task down into sub-tasks, utilizes external tools like APIs and databases, and executes the workflow from start to finish.\n\nAgents possess short-term memory (context window) and long-term memory (vector databases). They utilize advanced reasoning architectures like ReAct (Reasoning and Acting) or Chain-of-Thought to plan out multi-step processes.\n\nThe deployment of these agents is revolutionizing enterprise operations across all sectors, from Customer Success Operations resolving issues autonomously, to Software Engineering where AI agents can write code, run tests, and open Pull Requests.\n\nAs frameworks like LangChain, AutoGen, and CrewAI mature, multi-agent systems—where distinct AI personas collaborate and debate with one another—will become the new standard for enterprise architecture. The companies that adopt these technologies now will gain an insurmountable operational advantage.',
      category: 'AI & Automation',
      date: 'Jun 20, 2026',
      readTime: 6,
      featured: true,
      image: '/images/blog/autonomous-ai-agents.webp',
    },
    {
      slug: 'generative-ui-design',
      title: 'Generative UI: The Future of Graphic Design & Web Interfaces',
      excerpt: 'Static layouts are dying. Discover how Generative UI is allowing websites to render bespoke, personalized interfaces for every individual user in real-time.',
      content: 'For the past two decades, web design has followed a rigid paradigm: designers create a static layout in tools like Figma, developers write the code to match, and millions of users view the exact same interface regardless of their individual needs, preferences, or technical literacy.\n\nGenerative UI is completely tearing down this paradigm.\n\nGenerative UI is an interface that is created, adjusted, and rendered in real-time by Artificial Intelligence based on the user\'s immediate context. Instead of navigating through complex menus to find a specific setting, the user simply states what they want, and the UI morphs to present exactly the right controls.\n\nImagine logging into your banking dashboard. A 20-year-old college student might see a vibrant, gamified UI focused on saving goals and micro-investing. A 60-year-old retiree logging into the exact same platform might see a highly legible, high-contrast dashboard prioritizing retirement portfolio yields and security settings.\n\nThe UI adapts to the user\'s mood, device, physical environment, and goals. Interfaces can instantly adjust typography, contrast, and layout complexity for visually or cognitively impaired users. Users no longer have to learn how to navigate your software; your software learns how to navigate the user.\n\nInstead of painting pixels and drawing exact screen states, designers are becoming System Architects. They define the boundaries, the brand guidelines, the design tokens (colors, spacing, typography), and the interaction physics. The AI then acts as the renderer, combining these tokens dynamically to serve the user.',
      category: 'Graphic Design',
      date: 'Jun 19, 2026',
      readTime: 5,
      featured: true,
      image: '/images/blog/generative-ui-design.webp',
    },
    {
      slug: 'llm-web-architecture',
      title: 'How LLMs are Reshaping Modern Web Application Architecture',
      excerpt: 'Integrating Large Language Models requires a fundamental shift in how we build web apps. Learn the new standards for RAG, vector databases, and edge computing.',
      content: 'Just a few years ago, the standard web architecture consisted of a React frontend, a Node.js/Express backend, and a PostgreSQL database. While this stack remains powerful, the integration of Large Language Models (LLMs) has introduced entirely new infrastructure requirements.\n\nTo build truly intelligent web applications, engineering teams must now incorporate vector databases, retrieval-augmented generation (RAG), and edge streaming into their stack.\n\nStandard relational databases search by exact keyword matches. Vector databases search by semantic meaning. When a user asks an AI chatbot a question, the vector DB retrieves documents that are conceptually related to the query, even if they don\'t share any of the same words.\n\nLLMs hallucinate. They confidently invent facts when they don\'t know the answer. RAG solves this by intercepting the user\'s query, searching your private vector database for the factual answer, and injecting those facts directly into the LLM\'s prompt before it generates a response. This guarantees accurate, grounded outputs based strictly on your company\'s proprietary data.\n\nLLMs are slow. Waiting 10 seconds for a complete API response is an unacceptable user experience. Modern web apps use Edge Functions to initiate the LLM request closer to the user, and Server-Sent Events (SSE) to stream the text token-by-token directly to the UI, creating the illusion of zero latency.\n\nWe are moving from deterministic programming to probabilistic programming. Engineering teams that fail to adapt their architectures to support high-speed inference, secure data embedding pipelines, and robust prompt management will be left behind.',
      category: 'Web Development',
      date: 'Jun 18, 2026',
      readTime: 7,
      featured: false,
      image: '/images/blog/llm-web-architecture.webp',
    },
    {
      slug: 'headless-ai-cms',
      title: 'Why Traditional CMS is Dead: The Shift to AI-Driven Headless Architectures',
      excerpt: 'Monolithic content management systems can\'t keep up with modern scaling demands. Why Next.js and headless AI-driven pipelines are the new standard.',
      content: 'For years, platforms like WordPress dominated the internet. They were easy to set up and provided an all-in-one solution where the database, the backend code, and the frontend HTML were tightly coupled into a single monolithic block.\n\nHowever, as web traffic scales and omnichannel marketing becomes the norm, monolithic CMS platforms have become an agonizing bottleneck.\n\nA Headless CMS completely divorces the backend content repository from the frontend presentation layer. Instead of generating HTML, a headless CMS simply exposes your content via a high-speed JSON API. Your frontend—typically built with a highly performant framework like Next.js—consumes that API and renders the content blazingly fast.\n\nThe true power of headless architecture is being unlocked by Artificial Intelligence. AI agents can now connect directly to your headless CMS via API, drafting blog posts, updating product descriptions, and generating SEO metadata automatically in the background.\n\nBecause the content is just raw data, an AI can reformat a single blog post into an Instagram caption, a LinkedIn thread, and a short-form video script, distributing it instantly across all platforms.\n\nThe future of content management isn\'t a dashboard where human writers type articles. It\'s a highly decoupled data pipeline where AI engines generate, optimize, and distribute content seamlessly.',
      category: 'Web Development',
      date: 'Jun 17, 2026',
      readTime: 5,
      featured: false,
      image: '/images/blog/headless-ai-cms.webp',
    },
    {
      slug: 'ai-digital-employees',
      title: 'AI Agents as Digital Employees: Automating Customer Success',
      excerpt: 'Stop relying on outsourced support. Learn how modern AI agents can resolve 80% of customer issues with zero human intervention and perfect brand voice.',
      content: 'Scaling a business usually means scaling support costs linearly. As revenue grows, so does the volume of tickets, refunds, lost passwords, and technical inquiries. The traditional solution—hiring massive outsourced call centers—often leads to degraded brand quality, frustrated customers, and high turnover rates.\n\nA digital employee is an AI agent that doesn\'t just read an FAQ page to a user, but actually possesses the necessary permissions to solve the user\'s problem. Powered by large language models, these agents are integrated deeply into your internal APIs.\n\nWhen a user messages that their last order arrived damaged, a Digital Employee uses Computer Vision to analyze the uploaded image and confirm the damage. It queries the store API to find the user\'s recent order, checks the company policy vector database to confirm the item is eligible for a refund, and executes the refund via the payment API.\n\nIt then generates a highly empathetic, brand-aligned apology message and offers a 10% discount on the next purchase. Total time elapsed? 4 seconds. Human intervention? Zero.\n\nThe ROI on deploying AI digital employees is staggering. By resolving 80% of Tier-1 and Tier-2 support tickets autonomously, companies can reassign their human support staff to focus exclusively on high-value, complex edge cases.',
      category: 'AI & Automation',
      date: 'Jun 16, 2026',
      readTime: 6,
      featured: false,
      image: '/images/blog/ai-digital-employees.webp',
    },
    {
      slug: 'death-of-stock-photos',
      title: 'The Death of Generic Stock Photos: How AI Revolutionized Brand Imagery',
      excerpt: 'Midjourney, DALL-E, and Stable Diffusion have killed the stock photo industry. How to leverage AI to create highly cohesive, bespoke brand imagery.',
      content: 'We\'ve all seen them: the diverse group of corporate professionals pointing excitedly at a blank laptop screen. The impossibly clean, stark-white desk with a succulent plant. The generic handshake. For years, brands were forced to rely on these soulless stock image libraries because hiring a professional photographer for every campaign was prohibitively expensive.\n\nWith the maturity of image generation models like Midjourney v6, DALL-E 3, and Stable Diffusion XL, the game has fundamentally changed. Today, brands can generate world-class, photorealistic, or hyper-stylized imagery in seconds for fractions of a penny.\n\nThe true power of AI image generation isn\'t just saving money; it\'s the ability to create a completely bespoke, highly consistent visual identity. By utilizing techniques like Style Tuning and ControlNet, a brand can train a small AI model on their specific brand colors, product aesthetics, and lighting preferences.\n\nOnce trained, every image generated by that model—whether it\'s a banner for a website or a thumbnail for a YouTube video—will look like it was shot by the exact same high-end creative director.\n\nWhile the technology is incredible, it is crucial for brands to navigate the evolving legal landscape. Using models that are trained exclusively on licensed or public domain data can protect enterprise companies from copyright infringement risks while still unlocking the massive scale of AI generation.\n\nThe era of generic stock photography is over. The era of bespoke, AI-generated brand universes is here.',
      category: 'Graphic Design',
      date: 'Jun 15, 2026',
      readTime: 4,
      featured: false,
      image: '/images/blog/death-of-stock-photos.webp',
    },
    {
      slug: 'rag-vs-finetuning',
      title: 'RAG vs Fine-Tuning: Which is Best for Your Business AI?',
      excerpt: 'The definitive technical guide to choosing between Retrieval-Augmented Generation and model fine-tuning for your enterprise knowledge base.',
      content: 'You want to build an AI chatbot that knows everything about your company—your HR policies, your codebase, your product catalogs, and your internal documentation. Standard models like GPT-4 are incredibly smart, but they know nothing about your proprietary data.\n\nTo teach an LLM about your business, you have two primary options: Retrieval-Augmented Generation (RAG) or Fine-Tuning. Which should you choose?\n\nFine-tuning involves taking an existing open-source model and training it further on thousands of examples of your proprietary data. You are essentially altering the weights—the physical brain structure—of the model itself. It is excellent for teaching a model a specific tone of voice, format, or style, and does not require a massive context window at inference time. However, it is very poor at memorizing specific facts and is extremely expensive and slow to update when your data changes.\n\nRetrieval-Augmented Generation leaves the core model completely untouched. Instead, you convert all your company documents into mathematical vectors and store them in a Vector Database. When a user asks a question, the system searches the database, retrieves the exact relevant paragraphs, and feeds them to the LLM alongside the question. It\'s an open-book test.\n\nRAG offers perfect factual accuracy because the LLM simply summarizes the retrieved text. It is easy to update and allows for granular permission control. However, it requires complex infrastructure and increases latency at inference time due to large context windows.\n\nFor 95% of enterprise use cases—especially chatbots, internal search engines, and customer support—RAG is the clear winner. If you need the model to learn a complex new language or formatting style, use Fine-Tuning.',
      category: 'AI News',
      date: 'Jun 14, 2026',
      readTime: 8,
      featured: false,
      image: '/images/blog/rag-vs-finetuning.webp',
    }
  ]
}

export async function getProjectBySlug(slug: string) {
  const projects = await readPortfolio()
  return projects.find((p) => p.slug === slug)
}

export async function readPages(): Promise<CmsPage[]> {
  try {
    const raw = await fs.readFile(PAGES_FILE, 'utf-8')
    const data = JSON.parse(raw) as { pages: CmsPage[] }
    return data.pages
  } catch {
    const { defaultPages } = await import('./default-pages')
    return defaultPages()
  }
}

export async function writePages(pages: CmsPage[]) {
  await ensureDataDir()
  await fs.writeFile(PAGES_FILE, JSON.stringify({ pages }, null, 2), 'utf-8')
}

export async function getPageBySlug(slug: string) {
  const pages = await readPages()
  return pages.find((p) => p.slug === slug)
}

