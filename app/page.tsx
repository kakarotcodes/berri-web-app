import { HeroSection } from '@/components/hero-section'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <Features />
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      <CTA />
      <Footer />
    </div>
  )
}