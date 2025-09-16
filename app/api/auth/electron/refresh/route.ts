// This file has been disabled - authentication is turned off
// import { NextRequest, NextResponse } from 'next/server'
// import { createAdminClient } from '@/lib/supabase/server'
// import { getGoogleTokens } from '@/lib/database/init'
// import { validateElectronRefreshToken, storeElectronRefreshToken, revokeElectronRefreshToken } from '@/lib/database/refresh-tokens'
// import jwt from 'jsonwebtoken'
// import { getJWTSecret } from '@/lib/security/jwt-config'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  return NextResponse.json({
    error: 'Authentication disabled',
    message: 'Auth system has been disabled for this application'
  }, { status: 503 })
}

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { refresh_token } = body
//
//     // Guard: Ensure refresh token is provided
//     if (!refresh_token) {
//       return NextResponse.json({ error: 'Refresh token required' }, { status: 400 })
//     }
//
//     // Validate the refresh token
//     const tokenValidation = await validateElectronRefreshToken(refresh_token)
//
//     // Guard: Ensure refresh token is valid
//     if (!tokenValidation.valid || !tokenValidation.userId) {
//       return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 })
//     }
//
//     // Get user from database
//     const user = await getUserById(tokenValidation.userId)
//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 })
//     }
//
//     // Get Google tokens (non-blocking)
//     const googleTokens = await getGoogleTokensSafely(user.id)
//
//     // Generate new tokens
//     const tokens = await generateAndRotateTokens(user, tokenValidation.deviceId, refresh_token)
//
//     const response = {
//       success: true,
//       access_token: tokens.accessToken,
//       refresh_token: tokens.refreshToken,
//       expires_in: 24 * 60 * 60, // 24 hours in seconds
//       user: {
//         id: user.id,
//         email: user.email,
//         user_metadata: {
//           full_name: user.user_metadata?.full_name,
//           avatar_url: user.user_metadata?.avatar_url,
//           provider: user.app_metadata?.provider
//         }
//       },
//       google_tokens: googleTokens ? {
//         has_tokens: true,
//         expires_at: googleTokens.token_expires_at,
//         scopes: googleTokens.scopes
//       } : {
//         has_tokens: false
//       }
//     }
//
//     return NextResponse.json(response)
//
//   } catch (error) {
//     return NextResponse.json({
//       error: 'Internal server error',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     }, { status: 500 })
//   }
// }

// // Helper function to get user by ID
// async function getUserById(userId: string) {
//   const supabase = createAdminClient()
//   const { data: { user }, error } = await supabase.auth.admin.getUserById(userId)
//
//   // Guard: Check for user retrieval errors
//   if (error || !user) {
//     return null
//   }
//
//   return user
// }

// // Helper function to safely get Google tokens
// async function getGoogleTokensSafely(userId: string) {
//   try {
//     return await getGoogleTokens(userId)
//   } catch (tokenError) {
//     // Return null if token retrieval fails (non-critical)
//     return null
//   }
// }

// // Helper function to generate and rotate tokens
// async function generateAndRotateTokens(user: any, deviceId: string, oldRefreshToken: string) {
//   // Generate new access token (24 hours)
//   const accessToken = jwt.sign(
//     {
//       user_id: user.id,
//       email: user.email,
//       type: 'electron_access',
//       iat: Math.floor(Date.now() / 1000),
//       exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
//     },
//     getJWTSecret()
//   )
//
//   // Generate new refresh token and revoke the old one
//   const refreshToken = await storeElectronRefreshToken(user.id, deviceId)
//   await revokeElectronRefreshToken(oldRefreshToken)
//
//   return { accessToken, refreshToken }
// }