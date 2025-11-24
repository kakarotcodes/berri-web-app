import { HeroSection } from '@/components/hero-section'
import { Features } from '@/components/features'
import { PricingSection } from '@/components/pricing-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <Features />
      <PricingSection />
      <Footer />
    </div>
  )
}