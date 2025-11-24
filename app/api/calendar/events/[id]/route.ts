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

interface UpdateEventOptions {
  title?: string
  start?: string
  end?: string
  description?: string
  location?: string
  attendees?: string[]
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id: eventId } = await params
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

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Get event
    const response = await calendar.events.get({
      calendarId: 'primary',
      eventId
    })

    const event = response.data

    return NextResponse.json({
      success: true,
      event: {
        id: event.id || '',
        title: event.summary || '',
        start: event.start?.dateTime || event.start?.date || '',
        end: event.end?.dateTime || event.end?.date || '',
        description: event.description || '',
        location: event.location || '',
        htmlLink: event.htmlLink || '',
        attendees: event.attendees?.map(attendee => attendee.email) || []
      }
    })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get event' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id: eventId } = await params
  try {
    // Authenticate user using shared utility
    const user = await authenticateUser(request)

    // Guard: Ensure user is authenticated
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const userId = user.id

    // Get request parameters
    const updateData: UpdateEventOptions = await request.json()

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

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // First get the existing event
    const existingEvent = await calendar.events.get({
      calendarId: 'primary',
      eventId
    })

    // Build updated event resource
    const eventResource: any = {
      summary: updateData.title || existingEvent.data.summary,
      description: updateData.description !== undefined ? updateData.description : existingEvent.data.description,
      location: updateData.location !== undefined ? updateData.location : existingEvent.data.location
    }

    if (updateData.start) {
      eventResource.start = {
        dateTime: updateData.start,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    } else {
      eventResource.start = existingEvent.data.start
    }

    if (updateData.end) {
      eventResource.end = {
        dateTime: updateData.end,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    } else {
      eventResource.end = existingEvent.data.end
    }

    if (updateData.attendees !== undefined) {
      eventResource.attendees = updateData.attendees.map(email => ({ email }))
    } else {
      eventResource.attendees = existingEvent.data.attendees
    }

    // Update event
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId,
      requestBody: eventResource
    })

    const updatedEvent = response.data

    return NextResponse.json({
      success: true,
      event: {
        id: updatedEvent.id || '',
        title: updatedEvent.summary || '',
        start: updatedEvent.start?.dateTime || updatedEvent.start?.date || '',
        end: updatedEvent.end?.dateTime || updatedEvent.end?.date || '',
        description: updatedEvent.description || '',
        location: updatedEvent.location || '',
        htmlLink: updatedEvent.htmlLink || '',
        attendees: updatedEvent.attendees?.map(attendee => attendee.email) || []
      }
    })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update event' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id: eventId } = await params
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

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Delete event
    await calendar.events.delete({
      calendarId: 'primary',
      eventId
    })

    return NextResponse.json({
      success: true
    })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete event' },
      { status: 500 }
    )
  }
}