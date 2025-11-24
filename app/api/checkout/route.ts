import { Checkout } from '@dodopayments/nextjs'

// Direct export following official Dodo example
export const POST = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
  returnUrl: process.env.DODO_PAYMENTS_RETURN_URL || 'http://localhost:3000/success',
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT as 'test_mode' | 'live_mode',
  type: 'dynamic',
})
