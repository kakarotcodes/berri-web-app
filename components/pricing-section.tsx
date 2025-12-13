"use client"

import { useState, useEffect } from 'react'
import { PricingCard } from '@/components/pricing/pricing-card'
import { usePurchase } from '@/lib/hooks/usePurchase'
import { trackDownload } from '@/lib/analytics/ga4'
import { Sparkles } from 'lucide-react'

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
      const downloadUrl = 'https://berri-downloads.s3.ap-south-1.amazonaws.com/releases/stable/berri-1.2.0.dmg'
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
    <section id="plans" className="py-16 md:py-32 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-teal-500/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            <span>Simple, transparent pricing</span>
          </div>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Choose Your
            <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-teal-500 bg-clip-text text-transparent">
              {" "}Berri Plan
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free or get lifetime access. No subscriptions, no recurring fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
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
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-8 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Additional info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Lifetime plan includes a 15-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}
