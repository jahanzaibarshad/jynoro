import { readPortfolio } from '@/lib/data-store'
import PortfolioSectionClient from './PortfolioSectionClient'

export default async function PortfolioSection() {
  const projects = await readPortfolio()
  const featured = projects.filter((p) => p.featured)
  return <PortfolioSectionClient projects={featured} />
}
