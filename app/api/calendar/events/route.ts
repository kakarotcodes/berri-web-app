import { getGoogleTokens } from '@/lib/database/init'
import { refreshGoogleTokensIfNeeded } from '@/lib/auth/google-token-refresh'
import { authenticateUser } from '@/lib/api/auth-utils'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  description?: string
  location?: string
  htmlLink?: string
  type?: 'event' | 'holiday'
  country?: string
  isPublic?: boolean
}

interface CreateEventOptions {
  title: string
  start: string
  end: string
  description?: string
  location?: string
  attendees?: string[]
}


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
    const timeMin = searchParams.get('timeMin') || new Date().toISOString()
    const timeMax = searchParams.get('timeMax') || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    const maxResults = parseInt(searchParams.get('maxResults') || '10')

    // Guard: Check if Google tokens exist
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

    return await handleListEvents(calendar, { timeMin, timeMax, maxResults })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Calendar operation failed' },
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

    const body = await request.json()
    const { action, ...params } = body

    // Guard: Check if Google tokens exist
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

    // Handle different actions using guard clauses
    if (action === 'list') {
      return await handleListEvents(calendar, params)
    }
    
    if (action === 'create') {
      return await handleCreateEvent(calendar, params)
    }
    
    // Guard: Invalid action
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Calendar operation failed' },
      { status: 500 }
    )
  }
}

async function handleListEvents(calendar: any, params: any) {
  const {
    timeMin = new Date().toISOString(),
    timeMax = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    maxResults = 10
  } = params

  // Fetch from primary calendar
  const primaryResponse = await calendar.events.list({
    calendarId: 'primary',
    timeMin,
    timeMax,
    maxResults,
    singleEvents: true,
    orderBy: 'startTime',
  })

  // Also try to fetch from Indian holidays calendar if available
  let holidayResponse = null
  try {
    holidayResponse = await calendar.events.list({
      calendarId: 'en.indian#holiday@group.v.calendar.google.com',
      timeMin,
      timeMax,
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime',
    })
  } catch (holidayError) {
    // Holiday calendar not accessible, skipping holidays
  }

  // Combine events from primary calendar
  const primaryEvents: CalendarEvent[] = primaryResponse.data.items?.map((event: any) => ({
    id: event.id || '',
    title: event.summary || 'No Title',
    start: event.start?.dateTime || event.start?.date || '',
    end: event.end?.dateTime || event.end?.date || '',
    description: event.description || '',
    location: event.location || '',
    htmlLink: event.htmlLink || '',
    type: 'event' as const
  })) || []

  // Add holiday events if available
  const holidayEvents: CalendarEvent[] = holidayResponse?.data.items?.map((event: any) => ({
    id: `holiday-${event.id}` || '',
    title: event.summary || 'Holiday',
    start: event.start?.dateTime || event.start?.date || '',
    end: event.end?.dateTime || event.end?.date || '',
    description: event.description || '',
    location: event.location || '',
    htmlLink: event.htmlLink || '',
    type: 'holiday' as const,
    country: 'India',
    isPublic: true
  })) || []

  // Combine all events
  const events = [...primaryEvents, ...holidayEvents]
  
  return NextResponse.json({
    success: true,
    events
  })
}

async function handleCreateEvent(calendar: any, eventData: CreateEventOptions) {
  const eventResource = {
    summary: eventData.title,
    start: {
      dateTime: eventData.start,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    end: {
      dateTime: eventData.end,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    description: eventData.description || '',
    location: eventData.location || '',
    attendees: eventData.attendees?.map(email => ({ email })) || [],
  }

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: eventResource,
  })

  const createdEvent = response.data

  return NextResponse.json({
    success: true,
    event: {
      id: createdEvent.id || '',
      title: createdEvent.summary || '',
      start: createdEvent.start?.dateTime || createdEvent.start?.date || '',
      end: createdEvent.end?.dateTime || createdEvent.end?.date || '',
      htmlLink: createdEvent.htmlLink || ''
    }
  })
}