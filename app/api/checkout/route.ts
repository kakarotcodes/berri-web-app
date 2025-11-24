import { Checkout } from '@dodopayments/nextjs'
import { NextRequest } from 'next/server'

// Product SKU mapping
const PRODUCT_SKUS = {
  monthly: 'berri-monthly',
  yearly: 'berri-yearly',
  lifetime: 'berri-lifetime',
} as const

type PlanType = keyof typeof PRODUCT_SKUS

// Create the checkout handler with dynamic return URLs based on plan
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json()
    const { plan } = body

    // Validate plan
    if (!plan || !PRODUCT_SKUS[plan as PlanType]) {
      return new Response(
        JSON.stringify({ error: 'Invalid plan. Must be one of: monthly, yearly, lifetime' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get product SKU
    const productSku = PRODUCT_SKUS[plan as PlanType]

    // Build return URL with plan parameter
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const returnUrl = `${appUrl}/success?plan=${plan}`

    // Create checkout session using the adaptor
    const checkoutHandler = Checkout({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
      returnUrl,
      environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
      type: 'session',
    })

    // Call the handler with a modified request that includes the product cart
    const modifiedRequest = new Request(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify({
        product_cart: [
          {
            product_id: productSku,
            quantity: 1,
          },
        ],
        metadata: {
          source: 'web_app',
          plan_type: plan,
        },
      }),
    })

    return await checkoutHandler(modifiedRequest as unknown as NextRequest)
  } catch (error: any) {
    console.error('Checkout creation error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
