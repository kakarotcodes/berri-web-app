"use client"

import { useState, useEffect } from 'react'

type PlanType = 'monthly' | 'yearly' | 'lifetime'

interface UsePurchaseReturn {
  initiateCheckout: (plan: PlanType) => Promise<void>
  loading: boolean
  error: string | null
}

export function usePurchase(): UsePurchaseReturn {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Reset loading state when page is restored from bfcache (back/forward navigation)
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setLoading(false)
      }
    }

    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  const initiateCheckout = async (plan: PlanType) => {
    try {
      setLoading(true)
      setError(null)

      // Track purchase intent with GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'begin_checkout', {
          currency: 'USD',
          value: 30,
          content_type: 'product',
        })
      }

      // Call API to create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Dodo checkout (adaptor returns checkout_url)
      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err: any) {
      console.error('Checkout error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return {
    initiateCheckout,
    loading,
    error,
  }
}
