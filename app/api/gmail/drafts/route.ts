import { getGoogleTokens } from '@/lib/database/init'
import { refreshGoogleTokensIfNeeded } from '@/lib/auth/google-token-refresh'
import { authenticateUser } from '@/lib/api/auth-utils'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Authenticate user using shared utility
    const user = await authenticateUser(request)
    
    // Guard: Ensure user is authenticated
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const userId = user.id

    // Get request parameters from URL search params
    const { searchParams } = new URL(request.url)
    const maxResults = parseInt(searchParams.get('maxResults') || '20')

    // Guard: Ensure Google tokens exist
    const tokens = await getGoogleTokens(userId)
    if (!tokens) {
      return NextResponse.json({ error: 'No Google tokens found' }, { status: 401 })
    }

    // Guard: Ensure tokens are valid and refreshed
    const tokenStatus = await refreshGoogleTokensIfNeeded(userId)
    if (!tokenStatus.hasTokens || tokenStatus.expired) {
      return NextResponse.json({ error: 'Failed to refresh Google tokens' }, { status: 401 })
    }

    // Set up Google OAuth client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )
    
    oauth2Client.setCredentials({
      access_token: tokens.provider_access_token,
      refresh_token: tokens.provider_refresh_token
    })

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

    // Get drafts
    const response = await gmail.users.drafts.list({
      userId: 'me',
      maxResults
    })

    return NextResponse.json({
      success: true,
      drafts: response.data.drafts || []
    })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get drafts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate user using shared utility
    const user = await authenticateUser(request)
    
    // Guard: Ensure user is authenticated
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const userId = user.id

    // Get request parameters
    const { to, cc, bcc, subject, body } = await request.json()

    if (!to || !to.length || !subject || !body) {
      return NextResponse.json({ error: 'to, subject, and body are required' }, { status: 400 })
    }

    // Guard: Ensure Google tokens exist
    const tokens = await getGoogleTokens(userId)
    if (!tokens) {
      return NextResponse.json({ error: 'No Google tokens found' }, { status: 401 })
    }

    // Guard: Ensure tokens are valid and refreshed
    const tokenStatus = await refreshGoogleTokensIfNeeded(userId)
    if (!tokenStatus.hasTokens || tokenStatus.expired) {
      return NextResponse.json({ error: 'Failed to refresh Google tokens' }, { status: 401 })
    }

    // Set up Google OAuth client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )
    
    oauth2Client.setCredentials({
      access_token: tokens.provider_access_token,
      refresh_token: tokens.provider_refresh_token
    })

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

    // Build email message
    const emailLines = []
    emailLines.push(`To: ${to.join(', ')}`)
    if (cc && cc.length > 0) emailLines.push(`Cc: ${cc.join(', ')}`)
    if (bcc && bcc.length > 0) emailLines.push(`Bcc: ${bcc.join(', ')}`)
    emailLines.push(`Subject: ${subject}`)
    emailLines.push('Content-Type: text/html; charset=utf-8')
    emailLines.push('')
    emailLines.push(body)

    const email = emailLines.join('\r\n')
    const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')

    // Create draft
    const response = await gmail.users.drafts.create({
      userId: 'me',
      requestBody: {
        message: {
          raw: encodedEmail
        }
      }
    })

    return NextResponse.json({
      success: true,
      draftId: response.data.id
    })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create draft' },
      { status: 500 }
    )
  }
}