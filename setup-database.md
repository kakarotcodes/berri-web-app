# Database Setup Instructions

## Prerequisites
Make sure your Supabase project is set up and running.

## Steps to Set Up Database

1. **Go to Supabase Dashboard**
   - Open your browser and go to https://supabase.com/dashboard
   - Select your project (`jkrehaebvmsjnymdtysa.supabase.co`)

2. **Open SQL Editor**
   - In the left sidebar, click on "SQL Editor"
   - Click on "New Query"

3. **Run the Schema**
   - Copy the contents of `schema.sql` and paste it into the SQL editor
   - Click "Run" to execute the schema

4. **Verify Tables**
   - Go to "Table Editor" in the left sidebar
   - You should see a new table called `user_tokens`
   - The table should have columns: id, user_id, provider, access_token, refresh_token, expires_at, scopes, updated_at, created_at

## Alternative: Manual Table Creation

If you prefer to create the table manually:

1. Go to Table Editor
2. Click "New table"
3. Name: `user_tokens`
4. Add the following columns:
   - `id` (uuid, primary key, default: gen_random_uuid())
   - `user_id` (uuid, foreign key to auth.users)
   - `provider` (varchar)
   - `access_token` (text)
   - `refresh_token` (text)
   - `expires_at` (timestamptz)
   - `scopes` (text)
   - `updated_at` (timestamptz, default: now())
   - `created_at` (timestamptz, default: now())

5. Enable RLS (Row Level Security)
6. Add policy: "Users can only access their own tokens" with condition `auth.uid() = user_id`

## Test the Setup

After running the schema:
1. Start the web app: `npm run dev`
2. Start the Electron app: `npm run dev`
3. Try the authentication flow