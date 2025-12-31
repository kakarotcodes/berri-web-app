"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PricingCard } from '@/components/pricing/pricing-card'
import { usePurchase } from '@/lib/hooks/usePurchase'
import { trackDownload } from '@/lib/analytics/ga4'

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Try Berri with core features',
    price: 0,
    billingPeriod: 'forever' as const,
    features: [
      '5 Quick Tools',
      '1 quick website',
      'Keyboard shortcuts',
    ],
    cta: 'Download Free',
    ctaVariant: 'outline' as const,
    popular: false,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    description: 'Pay once, own it forever',
    price: 20,
    billingPeriod: 'one-time' as const,
    features: [
      'All Quick Tools',
      '12 quick websites',
      'Keyboard shortcuts',
      'Hide app while sharing screen',
      'Lifetime updates',
      '2 device activations',
    ],
    cta: 'Get Lifetime Access',
    ctaVariant: 'default' as const,
    popular: true,
    badge: 'One-Time Payment',
    highlight: true,
  },
]

export function PricingSection() {
  const { initiateCheckout, loadingPlan, error } = usePurchase()
  const [downloadingFree, setDownloadingFree] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Reset free download loading state when page is restored from bfcache
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setDownloadingFree(false)
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  const handleCtaClick = (planId: string) => {
    if (planId === 'free') {
      // Handle free download
      setDownloadingFree(true)
      const downloadUrl = 'https://berri-downloads.s3.ap-south-1.amazonaws.com/releases/stable/berri-1.3.0.dmg'
      trackDownload('pricing_section', downloadUrl, '1.2.0')
      setTimeout(() => {
        window.location.href = downloadUrl
      }, 100)
    } else {
      // Handle paid checkout
      initiateCheckout('lifetime')
    }
  }

  // Determine loading state for each plan
  const isLoading = (planId: string) => {
    if (planId === 'free') return downloadingFree
    if (planId === 'lifetime') return loadingPlan === 'lifetime'
    return false
  }

  return (
    <section
      ref={sectionRef}
      id="plans"
      className="relative py-32 md:py-48 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-32"
        >
          <span className="inline-block text-sm font-semibold text-purple-500 uppercase tracking-widest mb-4">
            Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
            Choose your
            <br />
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
              Berri plan
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Start free or get lifetime access. No subscriptions, no recurring fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-4xl gap-6 md:gap-8 md:grid-cols-2">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <PricingCard
                name={plan.name}
                description={plan.description}
                price={plan.price}
                billingPeriod={plan.billingPeriod}
                features={plan.features}
                cta={plan.cta}
                ctaVariant={plan.ctaVariant}
                onCtaClick={() => handleCtaClick(plan.id)}
                loading={isLoading(plan.id)}
                popular={plan.popular}
                badge={plan.badge}
                highlight={plan.highlight}
              />
            </motion.div>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-center max-w-md mx-auto"
          >
            <p className="text-sm text-red-500">{error}</p>
          </motion.div>
        )}

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-foreground/5 border border-foreground/10">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm text-muted-foreground">
              14-day money-back guarantee. No questions asked.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
