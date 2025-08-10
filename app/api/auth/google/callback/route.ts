import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { storeGoogleTokens } from '@/lib/database/init'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const source = searchParams.get('source')
  const error_param = searchParams.get('error')
  
  // Guard: Handle OAuth errors
  if (error_param) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=${error_param}`)
  }

  // Guard: Ensure authorization code exists
  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=no_code`)
  }

  try {
    const supabase = createClient()
    
    // Exchange code for session with Supabase
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    // Guard: Ensure session was created successfully
    if (error || !data.session) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=session_failed`)
    }
    
    const { session, user } = data

    // Store Google provider tokens if available
    await storeGoogleTokensIfAvailable(session, user.id)

    // Handle different authentication sources
    if (source === 'electron') {
      return await handleElectronAuth(user, session)
    }
    
    // Default to web app authentication
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth-success?source=web`)
    
  } catch (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=callback_failed`)
  }
}

// Helper function to store Google tokens if available
async function storeGoogleTokensIfAvailable(session: any, userId: string) {
  // Guard: Check if required tokens exist
  if (!session.provider_token || !session.provider_refresh_token) {
    return
  }

  try {
    // Calculate token expiration (Google tokens typically expire in 1 hour)
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 1)
    
    await storeGoogleTokens(
      userId,
      session.provider_token,
      session.provider_refresh_token,
      expiresAt,
      ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.readonly']
    )
  } catch (tokenError) {
    // Don't fail the auth flow if token storage fails
  }
}

// Helper function to handle Electron authentication
async function handleElectronAuth(user: any, session: any) {
  // Generate secure one-time exchange token for Electron app
  const exchangeToken = jwt.sign(
    { 
      user_id: user.id,
      email: user.email,
      session_id: session.access_token.substring(0, 20), // First 20 chars for reference
      type: 'electron_exchange',
      exp: Math.floor(Date.now() / 1000) + 300 // 5 minutes expiry
    },
    process.env.JWT_SECRET!
  )

  // First redirect to landing page, then trigger custom protocol
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/auth-success?source=electron&exchange_token=${exchangeToken}`)
}