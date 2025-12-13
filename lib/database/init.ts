import { createAdminClient } from '@/lib/supabase/server'
import { readFileSync } from 'fs'
import { join } from 'path'

/**
 * Initialize the database schema for secure Google token storage
 * This should be run once during deployment or setup
 */
export async function initializeDatabase() {
  const supabase = createAdminClient()
  
  try {
    // Read the schema file
    const schemaPath = join(process.cwd(), 'lib', 'database', 'schema.sql')
    const schema = readFileSync(schemaPath, 'utf-8')
    
    // Execute the schema
    const { error } = await supabase.rpc('exec_sql', { sql: schema })
    
    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    return { success: false, error }
  }
}

/**
 * Store or update Google tokens for a user
 */
export async function storeGoogleTokens(
  userId: string, 
  accessToken: string, 
  refreshToken: string, 
  expiresAt: Date,
  scopes: string[] = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.readonly']
) {
  const supabase = createAdminClient()
  
  // First try to update existing record
  const { data: updateData, error: updateError } = await supabase
    .from('user_google_tokens')
    .update({
      provider_access_token: accessToken,
      provider_refresh_token: refreshToken,
      token_expires_at: expiresAt.toISOString(),
      scopes: scopes
    })
    .eq('user_id', userId)
    .select()
  
  if (updateError) {
    throw updateError
  }
  
  // If update didn't affect any rows, insert new record
  if (!updateData || updateData.length === 0) {
    const { data: insertData, error: insertError } = await supabase
      .from('user_google_tokens')
      .insert({
        user_id: userId,
        provider_access_token: accessToken,
        provider_refresh_token: refreshToken,
        token_expires_at: expiresAt.toISOString(),
        scopes: scopes
      })
      .select()
    
    if (insertError) {
      throw insertError
    }
    
    return insertData
  }
  
  return updateData
}

/**
 * Get Google tokens for a user
 */
export async function getGoogleTokens(userId: string) {
  const supabase = createAdminClient()
  
  const { data, error } = await supabase
    .from('user_google_tokens')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No tokens found
      return null
    }
    throw error
  }
  
  return data
}