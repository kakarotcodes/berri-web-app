import { getGoogleTokens } from '@/lib/database/init'
import { refreshGoogleTokensIfNeeded } from '@/lib/auth/google-token-refresh'
import { authenticateUser } from '@/lib/api/auth-utils'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Authenticate user using shared utility
    const user = await authenticateUser(request)
    
    // Guard: Ensure user is authenticated
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const userId = user.id

    const { messageId, action } = await request.json()

    // Guard: Ensure message ID is provided
    if (!messageId) {
      return NextResponse.json({ error: 'Message ID is required' }, { status: 400 })
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

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )
    
    oauth2Client.setCredentials({
      access_token: tokens.provider_access_token,
      refresh_token: tokens.provider_refresh_token
    })

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })

    if (action === 'getFullEmail') {
      const response = await gmail.users.messages.get({
        userId: 'me',
        id: messageId,
        format: 'full'
      })

      const message = response.data
      if (!message.payload) {
        return NextResponse.json({ error: 'No email payload received' }, { status: 404 })
      }

      const headers = message.payload.headers || []
      const getHeader = (name: string) =>
        headers.find(h => h.name?.toLowerCase() === name.toLowerCase())?.value || ''

      let body = ''
      const inlineImages = new Map<string, { attachmentId: string; mime: string }>()

      const extractContent = (part: any) => {
        if (!part) return

        // Capture inline images
        if (part.body?.attachmentId && part.headers) {
          const cid = part.headers.find((h: any) => h.name?.toLowerCase() === 'content-id')?.value
          if (cid) {
            inlineImages.set(cid.replace(/[<>]/g, ''), {
              attachmentId: part.body.attachmentId,
              mime: part.mimeType || 'image/png'
            })
          }
        }

        // Text content
        if (part.body?.data) {
          const decoded = Buffer.from(part.body.data, 'base64').toString('utf-8')
          if (part.mimeType === 'text/html') body = decoded
          else if (!body && part.mimeType === 'text/plain') body = decoded
        }

        // Recurse through parts
        if (part.parts) part.parts.forEach(extractContent)
      }

      extractContent(message.payload)

      // Replace cid: with data URIs
      if (body && inlineImages.size > 0) {
        for (const [cid, { attachmentId, mime }] of Array.from(inlineImages.entries())) {
          try {
            const att = await gmail.users.messages.attachments.get({
              userId: 'me',
              messageId,
              id: attachmentId
            })
            const raw = att.data.data || ''
            const b64 = raw.replace(/-/g, '+').replace(/_/g, '/')
            const dataUrl = `data:${mime};base64,${b64}`
            body = body.replace(new RegExp(`cid:${cid}`, 'g'), dataUrl)
          } catch (error) {
            // Failed to fetch inline image - skip this one
          }
        }
      }

      // Normalize protocol-relative URLs
      body = body.replace(/src=["']\/\/([^"']+)["']/g, 'src="https://$1"')
                 .replace(/href=["']\/\/([^"']+)["']/g, 'href="https://$1"')

      const parseRecipients = (s: string) => (s ? s.split(',').map(r => r.trim()) : [])
      const fullHeaders: Record<string, string> = {}
      headers.forEach(h => { if (h.name && h.value) fullHeaders[h.name] = h.value })

      return NextResponse.json({
        success: true,
        email: {
          body,
          fullHeaders,
          date: getHeader('Date'),
          to: parseRecipients(getHeader('To')),
          cc: parseRecipients(getHeader('Cc')),
          bcc: parseRecipients(getHeader('Bcc'))
        }
      })

    } else if (action === 'getAttachment') {
      const { attachmentId } = await request.json()
      
      if (!attachmentId) {
        return NextResponse.json({ error: 'Attachment ID is required' }, { status: 400 })
      }

      const attachment = await gmail.users.messages.attachments.get({
        userId: 'me',
        messageId,
        id: attachmentId
      })

      if (!attachment.data?.data) {
        return NextResponse.json({ error: 'No attachment data received' }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        data: attachment.data.data
      })

    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

  } catch (error) {
    // Gmail message API error
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process message request' },
      { status: 500 }
    )
  }
}