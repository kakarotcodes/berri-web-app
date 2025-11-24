import { NextRequest, NextResponse } from 'next/server'
import DodoPayments from 'dodopayments'

// Product SKU mapping
const PRODUCT_SKUS = {
  monthly: 'berri-monthly',
  yearly: 'berri-yearly',
  lifetime: 'berri-lifetime',
} as const

type PlanType = keyof typeof PRODUCT_SKUS

// Rate limiting: Simple in-memory store (for production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string, maxRequests = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { plan } = body

    // Validate plan
    if (!plan || !PRODUCT_SKUS[plan as PlanType]) {
      return NextResponse.json(
        { error: 'Invalid plan. Must be one of: monthly, yearly, lifetime' },
        { status: 400 }
      )
    }

    // Check environment variables
    const publishableKey = process.env.NEXT_PUBLIC_DODO_PUBLISHABLE_KEY
    const secretKey = process.env.DODO_SECRET_KEY

    if (!publishableKey || !secretKey) {
      console.error('Dodo Payments API keys not configured')
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Check if using placeholder keys
    if (secretKey.includes('YOUR_KEY_HERE')) {
      console.error('Dodo Payments keys are still placeholder values')
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Initialize Dodo Payments client
    const dodo = new DodoPayments({
      bearerToken: secretKey,
      environment: secretKey.startsWith('sk_test_') ? 'test_mode' : 'live_mode',
    })

    // Get product SKU
    const productSku = PRODUCT_SKUS[plan as PlanType]

    // Get success and cancel URLs
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl = `${appUrl}/success?plan=${plan}`
    const cancelUrl = `${appUrl}/pricing`

    // Create checkout session
    const session = await dodo.checkoutSessions.create({
      product_cart: [
        {
          product_id: productSku,
          quantity: 1,
        },
      ],
      return_url: successUrl,
      // Optional: Add metadata for tracking
      metadata: {
        source: 'web_app',
        plan_type: plan,
      },
    })

    // Return checkout URL
    return NextResponse.json({
      success: true,
      checkoutUrl: session.checkout_url,
      sessionId: session.session_id,
    })

  } catch (error: any) {
    console.error('Checkout creation error:', error)

    // Handle Dodo-specific errors
    if (error.message?.includes('product') || error.message?.includes('not found')) {
      return NextResponse.json(
        { error: 'Product not found. Please contact support.' },
        { status: 400 }
      )
    }

    // Generic error
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}
