import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { getGoogleTokens } from '@/lib/database/init'
import { storeElectronRefreshToken } from '@/lib/database/refresh-tokens'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { exchange_token } = body
    
    // Guard: Ensure exchange token is provided
    if (!exchange_token) {
      return NextResponse.json({ error: 'Exchange token required' }, { status: 400 })
    }
    
    // Verify and validate the exchange token
    const tokenPayload = await verifyExchangeToken(exchange_token)
    if (!tokenPayload) {
      return NextResponse.json({ error: 'Invalid or expired exchange token' }, { status: 401 })
    }
    
    // Get user from database
    const user = await getUserById(tokenPayload.user_id)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Get stored Google tokens (non-blocking)
    const googleTokens = await getGoogleTokensSafely(user.id)
    
    // Generate tokens for Electron app
    const tokens = await generateElectronTokens(user)
    
    const response = {
      success: true,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
      expires_in: 24 * 60 * 60, // 24 hours in seconds
      user: {
        id: user.id,
        email: user.email,
        user_metadata: {
          full_name: user.user_metadata?.full_name,
          avatar_url: user.user_metadata?.avatar_url,
          provider: user.app_metadata?.provider
        }
      },
      google_tokens: googleTokens ? {
        has_tokens: true,
        expires_at: googleTokens.token_expires_at,
        scopes: googleTokens.scopes
      } : {
        has_tokens: false
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Helper function to verify exchange token
async function verifyExchangeToken(exchangeToken: string) {
  try {
    const tokenPayload = jwt.verify(exchangeToken, process.env.JWT_SECRET!) as any
    
    // Guard: Validate token payload structure
    if (!tokenPayload.user_id || !tokenPayload.email || tokenPayload.type !== 'electron_exchange') {
      return null
    }
    
    return tokenPayload
  } catch (jwtError) {
    return null
  }
}

// Helper function to get user by ID
async function getUserById(userId: string) {
  const supabase = createAdminClient()
  const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId)
  
  // Guard: Check for user retrieval errors
  if (userError || !user) {
    return null
  }
  
  return user
}

// Helper function to safely get Google tokens
async function getGoogleTokensSafely(userId: string) {
  try {
    return await getGoogleTokens(userId)
  } catch (tokenError) {
    // Return null if token retrieval fails (non-critical)
    return null
  }
}

// Helper function to generate Electron tokens
async function generateElectronTokens(user: any) {
  // Generate short-lived access token for Electron app (24 hours)
  const accessToken = jwt.sign(
    {
      user_id: user.id,
      email: user.email,
      type: 'electron_access',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    },
    process.env.JWT_SECRET!
  )
  
  // Generate long-lived refresh token (90 days, stored in database)
  const refreshToken = await storeElectronRefreshToken(user.id)
  
  return { accessToken, refreshToken }
}