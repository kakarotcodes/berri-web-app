// This file has been disabled - authentication is turned off
// import { NextRequest, NextResponse } from 'next/server'
// import { refreshGoogleTokensIfNeeded } from '@/lib/auth/google-token-refresh'
// import { authenticateUser } from '@/lib/api/auth-utils'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  return NextResponse.json({
    error: 'Authentication disabled',
    message: 'Auth system has been disabled for this application'
  }, { status: 503 })
}

// export async function POST(request: NextRequest) {
//   try {
//     // Authenticate user using shared utility
//     const user = await authenticateUser(request)
//
//     // Guard: Ensure user is authenticated
//     if (!user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     }
//
//     // Refresh Google tokens if needed
//     const tokenResult = await refreshGoogleTokensIfNeeded(user.id)
//
//     // Guard: Check if user has tokens
//     if (!tokenResult.hasTokens) {
//       return NextResponse.json({
//         error: tokenResult.error || 'No refresh token found',
//         requiresReauth: true
//       }, { status: 400 })
//     }
//
//     // Guard: Check if refresh failed
//     if (tokenResult.error) {
//       return NextResponse.json({
//         error: tokenResult.error,
//         requiresReauth: true
//       }, { status: 401 })
//     }
//
//     return NextResponse.json({
//       success: true,
//       access_token: tokenResult.hasTokens ? 'token_available' : null, // Don't expose actual token
//       expires_at: tokenResult.expiresAt,
//       refreshed: tokenResult.refreshed || false
//     })
//
//   } catch (error) {
//     return NextResponse.json({
//       error: 'Internal server error',
//       details: error instanceof Error ? error.message : 'Unknown error'
//     }, { status: 500 })
//   }
// }