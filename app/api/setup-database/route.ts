import { createAdminClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const supabase = createAdminClient()

    // Check if user_google_tokens table exists
    const { error: googleTokensError } = await supabase.from('user_google_tokens').select('*').limit(1)
    
    // Check if electron_refresh_tokens table exists
    const { error: refreshTokensError } = await supabase.from('electron_refresh_tokens').select('*').limit(1)

    const missingTables = []
    
    if (googleTokensError && googleTokensError.message.includes('does not exist')) {
      missingTables.push('user_google_tokens')
    }
    
    if (refreshTokensError && refreshTokensError.message.includes('does not exist')) {
      missingTables.push('electron_refresh_tokens')
    }

    if (missingTables.length > 0) {
      // Missing required database tables
      return NextResponse.json({ 
        success: false,
        needsManualSetup: true,
        missingTables: missingTables,
        message: `Missing tables: ${missingTables.join(', ')}. Please run the SQL from schema.sql in your Supabase dashboard.`,
        sqlInstructions: `
Go to your Supabase dashboard:
1. Open SQL Editor
2. Create a new query  
3. Paste the contents of lib/database/schema.sql
4. Run the query
5. Try authentication again

Missing tables: ${missingTables.join(', ')}
        `
      }, { status: 400 })
    }

    // Check for other errors
    if (googleTokensError && !googleTokensError.message.includes('does not exist')) {
      // Unexpected error with user_google_tokens table
      return NextResponse.json({ 
        success: false, 
        error: `Google tokens table error: ${googleTokensError.message}` 
      }, { status: 500 })
    }
    
    if (refreshTokensError && !refreshTokensError.message.includes('does not exist')) {
      // Unexpected error with electron_refresh_tokens table
      return NextResponse.json({ 
        success: false, 
        error: `Refresh tokens table error: ${refreshTokensError.message}` 
      }, { status: 500 })
    }

    // All database tables exist and are accessible
    return NextResponse.json({ 
      success: true, 
      message: 'Database setup verified - all required tables are ready',
      tables: ['user_google_tokens', 'electron_refresh_tokens']
    })

  } catch (error) {
    // Database setup error
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}