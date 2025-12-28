'use client'

import { useEffect } from 'react'
import { HeroSection } from '@/components/hero-section'
import { Features } from '@/components/features'
import { UseCases } from '@/components/use-cases'
import { PricingSection } from '@/components/pricing-section'
import { Footer } from '@/components/footer'

export default function Home() {
  useEffect(() => {
    // Handle hash navigation after page fully loads
    if (window.location.hash) {
      const hash = window.location.hash
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <Features />
      <UseCases />
      <PricingSection />
      <Footer />
    </main>
  )
}
