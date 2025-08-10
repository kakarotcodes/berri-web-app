import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // This is a simple redirect to the google callback
  // which handles the actual OAuth processing
  const url = new URL(request.url)
  const searchParams = url.searchParams
  
  // Forward all parameters to the google callback
  const callbackUrl = new URL('/api/auth/google/callback', url.origin)
  searchParams.forEach((value, key) => {
    callbackUrl.searchParams.set(key, value)
  })
  
  return NextResponse.redirect(callbackUrl.toString())
}