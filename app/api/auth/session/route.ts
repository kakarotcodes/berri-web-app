import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { refreshGoogleTokensIfNeeded } from '@/lib/auth/google-token-refresh'
import jwt from 'jsonwebtoken'

// Get current user session
export async function GET(request: NextRequest) {
  try {
    // First try to get user from Supabase SSR (web app)
    const supabase = createClient()
    const { data: { user: supabaseUser }, error: supabaseError } = await supabase.auth.getUser()

    // Guard: If Supabase user is available, handle session
    if (supabaseUser && !supabaseError) {
      return await handleUserSession(supabaseUser)
    }

    // Try to authenticate via JWT token
    const electronUser = await authenticateElectronUser(request)
    if (electronUser) {
      return await handleUserSession(electronUser)
    }

    // No user found
    return NextResponse.json({ user: null })
  } catch (error) {
    return NextResponse.json({ user: null })
  }
}

// Helper function to authenticate Electron users via JWT
async function authenticateElectronUser(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  // Guard: Check if authorization header exists and is Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    // Guard: Check if token is valid Electron token with user_id
    if (!((decoded.type === 'electron_session' || decoded.type === 'electron_access') && decoded.user_id)) {
      return null
    }

    const adminSupabase = createAdminClient()
    const { data: { user: electronUser }, error: electronError } = await adminSupabase.auth.admin.getUserById(decoded.user_id)
    
    // Guard: Check if user was found successfully
    if (!electronUser || electronError) {
      return null
    }

    return electronUser
  } catch (jwtError) {
    // JWT verification failed
    return null
  }
}

// Helper function to handle user session data
async function handleUserSession(user: any) {
  // Get Google tokens and refresh if needed
  const tokenStatus = await refreshGoogleTokensIfNeeded(user.id)

  // Return user info with token status
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      user_metadata: {
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
        provider: user.app_metadata?.provider
      }
    },
    tokenStatus
  })
}

// Logout - clear session
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Sign out the user (this clears Supabase cookies)
    const { error } = await supabase.auth.signOut()
    
    // Guard: Check for logout errors
    if (error) {
      return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}