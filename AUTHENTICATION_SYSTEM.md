# Berri Authentication System

## Architecture Overview

```
┌─────────────────┐    HTTPS/JWT     ┌──────────────────────┐
│  Electron App   │ ◄──────────────► │   Web App Backend    │
│  (Desktop)      │                  │   (Next.js 14)      │
└─────────────────┘                  └──────────────────────┘
        │                                       │
        │ OS Keychain                          │ Supabase Auth
        │                                      │
        ▼                                      ▼
┌─────────────────┐                  ┌──────────────────────┐
│ Secure Storage  │                  │    Database          │
│ (Tokens)        │                  │    (Supabase)        │
└─────────────────┘                  └──────────────────────┘
                                              │
                                              │ Google OAuth
                                              ▼
                                    ┌──────────────────────┐
                                    │   Google APIs        │
                                    │  (Gmail/Calendar)    │
                                    └──────────────────────┘
```

## Authentication Flow

### 1. Initial Login
1. User clicks "Connect Gmail" in Electron app
2. Electron opens browser: `http://localhost:3000/api/auth/google?source=electron`
3. Web app redirects to Google OAuth with required scopes
4. User consents in Google OAuth
5. Google redirects back to callback with authorization code

### 2. Token Exchange
1. Callback exchanges code for Google tokens via Supabase
2. Google tokens stored in database
3. Exchange token (5min) created for Electron
4. Browser redirects to: `berri-app://auth-success?exchange_token=...`

### 3. Token Storage
1. Electron receives custom protocol URL
2. Electron exchanges short token for long-term tokens
3. Access token (24h) and refresh token (90d) stored in OS keychain
4. Database stores refresh token for cleanup/revocation

### 4. API Access
1. Electron retrieves token from keychain
2. HTTP request with `Authorization: Bearer <token>`
3. Web app validates JWT and gets user
4. Web app refreshes Google tokens if needed
5. Web app proxies request to Google APIs

## Database Schema

### Required Tables (Execute in Supabase SQL Editor)

```sql
-- Google OAuth tokens storage
CREATE TABLE IF NOT EXISTS user_google_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    provider_access_token TEXT,
    provider_refresh_token TEXT NOT NULL,
    token_expires_at TIMESTAMPTZ,
    scopes TEXT[] DEFAULT ARRAY['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.readonly'],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS user_google_tokens_user_id_idx ON user_google_tokens(user_id);
ALTER TABLE user_google_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own Google tokens" ON user_google_tokens
    FOR ALL USING (auth.uid() = user_id);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_google_tokens_updated_at BEFORE UPDATE
    ON user_google_tokens FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Electron refresh tokens for cross-session persistence
CREATE TABLE IF NOT EXISTS electron_refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    refresh_token TEXT NOT NULL UNIQUE,
    device_id TEXT,
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '90 days'),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_used_at TIMESTAMPTZ DEFAULT NOW(),
    is_revoked BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS electron_refresh_tokens_token_idx ON electron_refresh_tokens(refresh_token);
CREATE INDEX IF NOT EXISTS electron_refresh_tokens_user_id_idx ON electron_refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS electron_refresh_tokens_expires_at_idx ON electron_refresh_tokens(expires_at);

ALTER TABLE electron_refresh_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own refresh tokens" ON electron_refresh_tokens
    FOR ALL USING (auth.uid() = user_id);

-- Function for electron tokens last_used_at update
CREATE OR REPLACE FUNCTION update_last_used_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_used_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_electron_refresh_tokens_last_used BEFORE UPDATE
    ON electron_refresh_tokens FOR EACH ROW EXECUTE PROCEDURE update_last_used_at_column();
```

## Key Components

### Essential Files

#### Authentication Routes
- `/app/api/auth/google/route.ts` - OAuth initiation
- `/app/api/auth/google/callback/route.ts` - OAuth callback handler  
- `/app/api/auth/electron/exchange/route.ts` - Token exchange for Electron
- `/app/api/auth/session/route.ts` - Session validation

#### API Proxies (Gmail/Calendar)
- `/app/api/gmail/emails/route.ts` - Gmail email listing
- `/app/api/gmail/message/route.ts` - Gmail message details
- `/app/api/calendar/events/route.ts` - Calendar events

#### Database Layer
- `/lib/database/init.ts` - Google token storage functions
- `/lib/database/refresh-tokens.ts` - Electron refresh token management
- `/lib/auth/google-token-refresh.ts` - Token refresh logic

#### Client Components
- `/lib/supabase/server.ts` - Server-side Supabase clients
- `/lib/supabase/client.ts` - Client-side Supabase client

### Electron Components
- `berriv2/src/main/features/api/webAppClient.ts` - HTTP client with auth
- `berriv2/src/main/features/auth/protocolHandler.ts` - Token storage

## Security Features

### Token Types & Lifespans
- **Exchange Token**: 5 minutes (one-time use)
- **Access Token**: 24 hours (daily API access)  
- **Refresh Token**: 90 days (long-term renewal)
- **Google Tokens**: 1 hour + long-lived refresh

### Security Measures
- ✅ JWT cryptographic signatures
- ✅ OS-level keychain storage
- ✅ Database Row Level Security (RLS)
- ✅ Automatic token expiry and cleanup
- ✅ Cross-platform secure storage
- ✅ Server-side token validation
- ✅ Minimal token lifespans

### Authentication Validation
```javascript
// Dual authentication support in all API endpoints
const supabase = createClient()
const { data: { user: supabaseUser } } = await supabase.auth.getUser()

if (!supabaseUser) {
  // Check for Electron JWT token
  const authHeader = request.headers.get('authorization')
  const token = authHeader.substring(7) // Remove 'Bearer '
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  // Validate and retrieve user...
}
```

## Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key  
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Security
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Token Flow Diagram

```
[Electron] --1--> [Browser] --2--> [Google OAuth] --3--> [Callback]
                                                            |
[OS Keychain] <--8-- [Exchange] <--7-- [Protocol] <--4-----|
     |
     6--> [API Request] --> [Web Backend] --> [Google API]
                               |
                               5--> [Database: Google Tokens]
```

1. User initiates OAuth in Electron
2. Browser handles Google OAuth flow
3. Google redirects with auth code
4. Callback creates exchange token, redirects to custom protocol
5. Google tokens stored in database
6. Electron makes API requests with stored tokens
7. Exchange endpoint converts tokens for Electron
8. Long-term tokens stored in OS keychain

## Maintenance

### Token Cleanup (Recommended Cron Job)
```sql
-- Remove expired refresh tokens
DELETE FROM electron_refresh_tokens 
WHERE expires_at < NOW() OR is_revoked = TRUE;

-- Remove old Google tokens for inactive users
DELETE FROM user_google_tokens 
WHERE updated_at < NOW() - INTERVAL '30 days';
```

### Security Monitoring
- Monitor failed JWT verification attempts
- Track unusual token refresh patterns
- Alert on multiple device token creation
- Regular audit of stored tokens