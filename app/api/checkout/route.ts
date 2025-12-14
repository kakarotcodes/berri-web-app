import { Checkout } from '@dodopayments/nextjs'
import { NextRequest } from 'next/server'

// Product SKU from environment variable
const LIFETIME_PRODUCT_SKU = process.env.DODO_LIFETIME_PRODUCT_SKU!

const PRODUCT_SKUS = {
  monthly: LIFETIME_PRODUCT_SKU,
  yearly: LIFETIME_PRODUCT_SKU,
  lifetime: LIFETIME_PRODUCT_SKU,
  
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

    // Build return URL - HARDCODED FOR TESTING
    const returnUrl =  process.env.DODO_PAYMENTS_RETURN_URL //'https://berri-web-staging.vercel.app/success'

    // Create checkout session using the adaptor
    const checkoutHandler = Checkout({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
      environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
      type: 'session',
    })

    // Call the handler with a modified request that includes the product cart AND return_url in the body
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
        return_url: returnUrl,
        metadata: {
          source: 'web_app',
          plan_type: plan,
        },
      }),
    })

    return await checkoutHandler(modifiedRequest as unknown as NextRequest)
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Failed to create checkout session. Please try again.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
