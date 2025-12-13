'use client'

import { useEffect } from 'react'
import { HeroSection } from '@/components/hero-section'
import { Features } from '@/components/features'
import { PricingSection } from '@/components/pricing-section'
import { Footer } from '@/components/footer'

export default function Home() {
  useEffect(() => {
    // Handle hash navigation after page fully loads
    if (window.location.hash) {
      const hash = window.location.hash
      // Small delay to ensure layout is complete
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <Features />
      <PricingSection />
      <Footer />
    </div>
  )
}