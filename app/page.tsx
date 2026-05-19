import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import PortfolioSection from '@/components/home/PortfolioSection'
import WhyJynoroSection from '@/components/home/WhyJynoroSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import BlogPreviewSection from '@/components/home/BlogPreviewSection'
import CTASection from '@/components/home/CTASection'
import ParallaxSection from '@/components/effects/ParallaxSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <ParallaxSection>
        <WhyJynoroSection />
      </ParallaxSection>
      <TestimonialsSection />
      <BlogPreviewSection />
      <CTASection />
    </>
  )
}
