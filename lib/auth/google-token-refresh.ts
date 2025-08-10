import { getGoogleTokens, storeGoogleTokens } from '@/lib/database/init'
import { google } from 'googleapis'

/**
 * Refresh Google tokens for a user if they are expired
 * Returns the current token status (refreshed if needed)
 */
export async function refreshGoogleTokensIfNeeded(userId: string): Promise<{
  hasTokens: boolean
  expired: boolean
  expiresAt?: string
  scopes?: string[]
  refreshed?: boolean
  error?: string
}> {
  try {
    // Get stored Google tokens
    const tokens = await getGoogleTokens(userId)
    
    if (!tokens || !tokens.provider_refresh_token) {
      return {
        hasTokens: false,
        expired: true,
        error: 'No refresh token found'
      }
    }
    
    // Check if current token is still valid (with 5-minute buffer)
    const now = new Date()
    const expiresAt = new Date(tokens.token_expires_at!)
    const bufferTime = 5 * 60 * 1000 // 5 minutes in milliseconds
    
    if (expiresAt.getTime() > now.getTime() + bufferTime) {
      // Token is still valid
      return {
        hasTokens: true,
        expired: false,
        expiresAt: tokens.token_expires_at!,
        scopes: tokens.scopes
      }
    }
    
    // Token needs refresh - use Google OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID!,
      process.env.GOOGLE_CLIENT_SECRET!,
      `https://berri.in/auth-success`
    )
    
    // Set the refresh token
    oauth2Client.setCredentials({
      refresh_token: tokens.provider_refresh_token
    })
    
    try {
      // Refresh the access token
      const { credentials } = await oauth2Client.refreshAccessToken()
      
      if (!credentials.access_token) {
        throw new Error('No access token returned from refresh')
      }
      
      // Calculate new expiry time
      const newExpiresAt = new Date()
      newExpiresAt.setSeconds(newExpiresAt.getSeconds() + (credentials.expiry_date ? Math.floor((credentials.expiry_date - Date.now()) / 1000) : 3600))
      
      // Store the refreshed tokens
      await storeGoogleTokens(
        userId,
        credentials.access_token,
        credentials.refresh_token || tokens.provider_refresh_token, // Keep existing refresh token if new one not provided
        newExpiresAt,
        tokens.scopes
      )
      
      return {
        hasTokens: true,
        expired: false,
        expiresAt: newExpiresAt.toISOString(),
        scopes: tokens.scopes,
        refreshed: true
      }
      
    } catch (refreshError: any) {
      return {
        hasTokens: true,
        expired: true,
        expiresAt: tokens.token_expires_at!,
        scopes: tokens.scopes,
        error: refreshError.message || 'Token refresh failed'
      }
    }
    
  } catch (error: any) {
    return {
      hasTokens: false,
      expired: true,
      error: error.message || 'Unknown error'
    }
  }
}