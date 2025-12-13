import { getGoogleTokens } from '@/lib/database/init'
import { refreshGoogleTokensIfNeeded } from '@/lib/auth/google-token-refresh'
import { authenticateUser } from '@/lib/api/auth-utils'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{
    id: string
  }>
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id: messageId } = await params
  try {
    // Authenticate user using shared utility
    const user = await authenticateUser(request)

    // Guard: Ensure user is authenticated
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const userId = user.id

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

    // Delete message (move to trash)
    await gmail.users.messages.trash({
      userId: 'me',
      id: messageId
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete message' },
      { status: 500 }
    )
  }
}