"use client"

import { PricingCard } from '@/components/pricing/pricing-card'
import { usePurchase } from '@/lib/hooks/usePurchase'
import { trackDownload } from '@/lib/analytics/ga4'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out Berri',
    price: 0,
    billingPeriod: 'forever' as const,
    features: [
      '5 modules',
      '1 custom website',
      'Unlimited clipboard history',
      'Basic screenshots',
      'Community support',
    ],
    cta: 'Download Free',
    ctaVariant: 'outline' as const,
    popular: false,
  },
  {
    id: 'monthly',
    name: 'Pro Monthly',
    description: 'Full features, billed monthly',
    price: 5,
    billingPeriod: 'month' as const,
    features: [
      '12 modules',
      '12 custom websites',
      'Unlimited clipboard history',
      'Advanced screenshots',
      'Incognito mode',
      'Priority support',
      'All future updates',
    ],
    cta: 'Start Pro Monthly',
    ctaVariant: 'default' as const,
    popular: false,
    badge: 'Flexible',
  },
  {
    id: 'yearly',
    name: 'Pro Yearly',
    description: 'Best value - save 17%',
    price: 50,
    billingPeriod: 'year' as const,
    priceNote: '$4.17/month',
    features: [
      '12 modules',
      '12 custom websites',
      'Unlimited clipboard history',
      'Advanced screenshots',
      'Incognito mode',
      'Priority support',
      'All future updates',
    ],
    cta: 'Start Pro Yearly',
    ctaVariant: 'default' as const,
    popular: true,
    badge: 'Most Popular',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    description: 'Pay once, use forever',
    price: 149,
    billingPeriod: 'one-time' as const,
    features: [
      '12 modules',
      '12 custom websites',
      'Unlimited clipboard history',
      'Advanced screenshots',
      'Incognito mode',
      'Lifetime updates',
      'Priority support forever',
      '5 device activations',
    ],
    cta: 'Get Lifetime Access',
    ctaVariant: 'default' as const,
    popular: false,
    badge: 'Best Deal',
    highlight: true,
  },
]

export function PricingSection() {
  const { initiateCheckout, loading, error } = usePurchase()

  const handleCtaClick = (planId: string) => {
    if (planId === 'free') {
      // Handle free download
      const downloadUrl = 'https://berri-downloads.s3.ap-south-1.amazonaws.com/releases/stable/berri-1.2.0.dmg'
      trackDownload('pricing_section', downloadUrl, '1.2.0')
      setTimeout(() => {
        window.location.href = downloadUrl
      }, 100)
    } else {
      // Handle paid checkout
      initiateCheckout(planId as 'monthly' | 'yearly' | 'lifetime')
    }
  }

  return (
    <section id="pricing" className="py-16 md:py-32">
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
            Start free, upgrade when you're ready. All plans include the core features you love.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              billingPeriod={plan.billingPeriod}
              priceNote={plan.priceNote}
              features={plan.features}
              cta={plan.cta}
              ctaVariant={plan.ctaVariant}
              onCtaClick={() => handleCtaClick(plan.id)}
              loading={loading}
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
            All paid plans include a 30-day money-back guarantee. No questions asked.
          </p>
          <div className="mt-4">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              See detailed comparison
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
