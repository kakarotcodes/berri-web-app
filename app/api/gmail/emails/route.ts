import { getGoogleTokens } from '@/lib/database/init'
import { refreshGoogleTokensIfNeeded } from '@/lib/auth/google-token-refresh'
import { authenticateUser } from '@/lib/api/auth-utils'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

interface GmailEmail {
  id: string
  threadId: string
  subject: string
  sender: string
  senderName: string
  recipient: string
  snippet: string
  timestamp: string
  isRead: boolean
  isStarred: boolean
  isImportant: boolean
  labels: string[]
  hasAttachments: boolean
  attachments: Array<{
    filename: string
    mimeType: string
    size: number
    attachmentId: string
  }>
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
    const maxResults = parseInt(searchParams.get('maxResults') || '20')
    const query = searchParams.get('query') || 'in:inbox'
    const pageToken = searchParams.get('pageToken') || undefined

    return await fetchGmailEmails(userId, { maxResults, query, pageToken })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch emails' },
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
    const { maxResults = 20, query = 'in:inbox', pageToken } = await request.json()

    return await fetchGmailEmails(userId, { maxResults, query, pageToken })

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch emails' },
      { status: 500 }
    )
  }
}

async function fetchGmailEmails(userId: string, options: { maxResults: number; query: string; pageToken?: string }) {
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

  // Fetch messages list
  const listResponse = await gmail.users.messages.list({
    userId: 'me',
    maxResults: options.maxResults,
    q: options.query,
    pageToken: options.pageToken
  })

  if (!listResponse.data.messages || listResponse.data.messages.length === 0) {
    return NextResponse.json({ success: true, emails: [] })
  }

  // Fetch message details
  const messagePromises = listResponse.data.messages.map(async (message) => {
    try {
      const response = await gmail.users.messages.get({
        userId: 'me',
        id: message.id!,
        format: 'full',
        fields: 'id,threadId,labelIds,snippet,payload(headers,parts(filename,mimeType,body(size,attachmentId),parts))'
      })
      return response.data
    } catch (error) {
      // Failed to fetch message - skip this one
      return null
    }
  })

  const messageResponses = await Promise.all(messagePromises)
  const validMessages = messageResponses.filter(msg => msg !== null)

  // Process messages into clean email objects
  const emails: GmailEmail[] = []

  for (const messageData of validMessages) {
    try {
      const headers = messageData.payload?.headers || []
      
      const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject'
      const from = headers.find(h => h.name === 'From')?.value || 'Unknown Sender'
      const to = headers.find(h => h.name === 'To')?.value || 'Unknown Recipient'
      const date = headers.find(h => h.name === 'Date')?.value || new Date().toISOString()
      
      // Extract sender info
      const senderInfo = extractSenderInfo(from)
      
      // Extract labels and status
      const labels = messageData.labelIds || []
      const isRead = !labels.includes('UNREAD')
      const isStarred = labels.includes('STARRED')
      const isImportant = labels.includes('IMPORTANT')
      
      // Extract attachments
      const attachments = extractAttachments(messageData.payload)
      
      emails.push({
        id: messageData.id || '',
        threadId: messageData.threadId || '',
        subject,
        sender: senderInfo.email,
        senderName: senderInfo.name,
        recipient: to,
        snippet: messageData.snippet || '',
        timestamp: formatTimestamp(date),
        isRead,
        isStarred,
        isImportant,
        labels,
        hasAttachments: attachments.length > 0,
        attachments
      })
    } catch (error) {
      // Error processing message - skip this one
    }
  }

  return NextResponse.json({
    success: true,
    emails,
    nextPageToken: listResponse.data.nextPageToken
  })
}

function extractSenderInfo(fromHeader: string): { email: string; name: string } {
  if (!fromHeader) return { email: 'unknown@example.com', name: 'Unknown' }
  
  const match = fromHeader.match(/^(.+?)\s*<(.+?)>$/)
  if (match) {
    return {
      name: match[1].trim().replace(/^"|"$/g, ''),
      email: match[2].trim()
    }
  }
  
  return { email: fromHeader.trim(), name: fromHeader.trim() }
}

function extractAttachments(payload: any): Array<{ filename: string; mimeType: string; size: number; attachmentId: string }> {
  const attachments: Array<{ filename: string; mimeType: string; size: number; attachmentId: string }> = []
  
  if (!payload) return attachments

  const processPayloadPart = (part: any) => {
    if (!part) return
    
    if (part.filename && part.filename.length > 0) {
      const body = part.body || {}
      attachments.push({
        filename: part.filename,
        mimeType: part.mimeType || 'application/octet-stream',
        size: body.size ? parseInt(body.size, 10) : 0,
        attachmentId: body.attachmentId || ''
      })
    }
    
    if (part.parts && Array.isArray(part.parts)) {
      part.parts.forEach(processPayloadPart)
    }
  }

  processPayloadPart(payload)
  return attachments
}

function formatTimestamp(dateStr: string): string {
  try {
    return new Date(dateStr).toISOString()
  } catch {
    return new Date().toISOString()
  }
}