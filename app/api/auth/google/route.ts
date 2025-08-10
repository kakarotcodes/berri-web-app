import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const source = searchParams.get('source')
  
  // Debug logging to identify environment variable issues
  console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL)
  console.log('Request URL:', request.url)
  console.log('Request headers host:', request.headers.get('host'))
  


  try {
    const supabase = createClient();
    console.log(
      "redirect to",
      `https://berri.in/api/auth/google/callback?source=${
        source || "web"
      }`
    );
    // Unified Google OAuth with combined scopes for Gmail and Calendar
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly",
        redirectTo: `https://berri.in/api/auth/google/callback?source=${source || "web"}`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    // Guard: Handle OAuth initiation errors
    if (error) {
      return NextResponse.redirect(
        `https://berri.in/login?error=auth_failed`
      );
    }

    // Redirect to Google OAuth
    return NextResponse.redirect(data.url);
  } catch (error) {
    return NextResponse.redirect(
      `https://berri.in/login?error=server_error`
    );
  }
}
