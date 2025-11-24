import { NextRequest } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import jwt from 'jsonwebtoken'
import { getJWTSecret } from '@/lib/security/jwt-config'

/**
 * Shared Authentication Utilities for API Routes
 * 
 * These utilities provide consistent authentication patterns across all API routes,
 * supporting both web app (Supabase SSR) and Electron app (JWT) authentication methods.
 */

export interface AuthenticatedUser {
  id: string
  email?: string
  user_metadata?: any
  app_metadata?: any
}

/**
 * Authenticate user from either Supabase SSR or JWT token
 * Uses guard clauses to handle different authentication methods cleanly
 */
export async function authenticateUser(request: NextRequest): Promise<AuthenticatedUser | null> {
  // Try Supabase SSR authentication first (web app)
  const supabaseUser = await authenticateViaSupabase()
  if (supabaseUser) {
    return supabaseUser
  }

  // Try JWT authentication (Electron app)
  const jwtUser = await authenticateViaJWT(request)
  if (jwtUser) {
    return jwtUser
  }

  // No authentication method succeeded
  return null
}

/**
 * Authenticate via Supabase SSR (web app users)
 */
async function authenticateViaSupabase(): Promise<AuthenticatedUser | null> {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  // Guard: Check if Supabase user exists and is valid
  if (!user || error) {
    return null
  }

  return user
}

/**
 * Authenticate via JWT token (Electron app users)
 * Uses guard clauses to validate token and user existence
 */
async function authenticateViaJWT(request: NextRequest): Promise<AuthenticatedUser | null> {
  const authHeader = request.headers.get('authorization')
  
  // Guard: Check if authorization header exists and is Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  
  try {
    const decoded = jwt.verify(token, getJWTSecret()) as any
    
    // Guard: Check if token is valid Electron token with user_id
    if (!((decoded.type === 'electron_session' || decoded.type === 'electron_access') && decoded.user_id)) {
      return null
    }

    const adminSupabase = createAdminClient()
    const { data: { user }, error } = await adminSupabase.auth.admin.getUserById(decoded.user_id)
    
    // Guard: Check if user was found successfully
    if (!user || error) {
      return null
    }

    return user
  } catch (jwtError) {
    // JWT verification failed
    return null
  }
}