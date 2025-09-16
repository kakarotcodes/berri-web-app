// Middleware - authentication logic commented out to remove auth features

import { type NextRequest, NextResponse } from 'next/server'
// import { createMiddlewareClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
  // Authentication disabled - just pass through all requests
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
}

// export async function middleware(request: NextRequest) {
//   try {
//     const { client, response } = createMiddlewareClient(request)

//     // Refresh session if expired - required for Server Components
//     await client.auth.getSession()

//     return response
//   } catch (e) {
//     // If you are here, a Supabase client could not be created!
//     // This is likely because you have not set up environment variables.
//     // Check out http://localhost:3000 for Next Steps.
//     console.error('Middleware error:', e)
//     return NextResponse.next({
//       request: {
//         headers: request.headers,
//       },
//     })
//   }
// }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api/auth routes (OAuth callbacks need to run without middleware interference)
     * - api routes that don't need auth
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}