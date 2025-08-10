import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const source = searchParams.get('source')
  
  try {
    const supabase = createClient()
    
    // Unified Google OAuth with combined scopes for Gmail and Calendar
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly',
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback?source=${source || 'web'}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })

    // Guard: Handle OAuth initiation errors
    if (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=auth_failed`)
    }

    // Redirect to Google OAuth
    return NextResponse.redirect(data.url)
  } catch (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?error=server_error`)
  }
}