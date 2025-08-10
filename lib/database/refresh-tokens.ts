import { createAdminClient } from '@/lib/supabase/server'

/**
 * Generate a secure random refresh token
 */
function generateRefreshToken(): string {
  const crypto = require('crypto')
  return crypto.randomBytes(64).toString('base64url')
}

/**
 * Store an Electron refresh token
 */
export async function storeElectronRefreshToken(
  userId: string,
  deviceId?: string
): Promise<string> {
  console.log('🔍 storeElectronRefreshToken called with:', { userId, deviceId })
  
  const supabase = createAdminClient()
  console.log('✅ Admin client created')
  
  const refreshToken = generateRefreshToken()
  console.log('✅ Refresh token generated:', { tokenLength: refreshToken.length })
  
  console.log('📤 About to insert into electron_refresh_tokens table...')
  const { data, error } = await supabase
    .from('electron_refresh_tokens')
    .insert({
      user_id: userId,
      refresh_token: refreshToken,
      device_id: deviceId,
      expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
    })
    .select()
    .single()
  
  if (error) {
    console.error('❌ ERROR storing Electron refresh token:', {
      error: error,
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    })
    throw error
  }
  
  console.log('✅ Refresh token stored successfully:', { hasData: !!data })
  return refreshToken
}

/**
 * Validate and consume an Electron refresh token
 */
export async function validateElectronRefreshToken(refreshToken: string): Promise<{
  valid: boolean
  userId?: string
  deviceId?: string
}> {
  const supabase = createAdminClient()
  
  const { data, error } = await supabase
    .from('electron_refresh_tokens')
    .select('*')
    .eq('refresh_token', refreshToken)
    .eq('is_revoked', false)
    .gt('expires_at', new Date().toISOString())
    .single()
  
  if (error || !data) {
    return { valid: false }
  }
  
  // Update last_used_at
  await supabase
    .from('electron_refresh_tokens')
    .update({ last_used_at: new Date().toISOString() })
    .eq('id', data.id)
  
  return {
    valid: true,
    userId: data.user_id,
    deviceId: data.device_id
  }
}

/**
 * Revoke an Electron refresh token
 */
export async function revokeElectronRefreshToken(refreshToken: string): Promise<void> {
  const supabase = createAdminClient()
  
  await supabase
    .from('electron_refresh_tokens')
    .update({ is_revoked: true })
    .eq('refresh_token', refreshToken)
}

/**
 * Revoke all refresh tokens for a user
 */
export async function revokeAllElectronRefreshTokens(userId: string): Promise<void> {
  const supabase = createAdminClient()
  
  await supabase
    .from('electron_refresh_tokens')
    .update({ is_revoked: true })
    .eq('user_id', userId)
}

/**
 * Clean up expired refresh tokens (should be run periodically)
 */
export async function cleanupExpiredRefreshTokens(): Promise<void> {
  const supabase = createAdminClient()
  
  await supabase
    .from('electron_refresh_tokens')
    .delete()
    .lt('expires_at', new Date().toISOString())
}