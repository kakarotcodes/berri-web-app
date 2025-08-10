'use client'

/**
 * Authentication Success Page - Berri Web Application
 * 
 * This page handles OAuth callback results and coordinates between web and Electron authentication.
 * It implements a secure token exchange flow that prevents JWT tokens from being exposed in URLs.
 * 
 * Authentication Flow:
 * 1. OAuth provider redirects to this page with exchange token
 * 2. If source=electron: redirect to berri-app:// protocol with exchange token
 * 3. If source=web: set success flag and redirect to landing page
 * 4. Electron app processes protocol URL and exchanges token for secure JWT
 * 5. Web page redirects to homepage with success indicator
 * 
 * Security Considerations:
 * - Exchange tokens are short-lived and single-use
 * - JWT tokens never appear in browser URLs
 * - Protocol handler ensures secure token storage in OS keychain
 * - Landing page redirect provides consistent user experience
 */

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const processAuth = async () => {
      if (typeof window === 'undefined') return

      const urlParams = new URLSearchParams(window.location.search)
      const source = urlParams.get('source')
      const exchangeToken = urlParams.get('exchange_token')

      if (source === 'electron' && exchangeToken) {
        // For Electron authentication: redirect to custom protocol with exchange token
        // The protocol handler will securely exchange this token for JWT tokens
        const protocol = 'berri-app'
        window.location.href = `${protocol}://auth-success?exchange_token=${exchangeToken}`
        
        // Provide user feedback by redirecting web page to homepage with success indicator
        // This creates a seamless experience where users see confirmation in both apps
        setTimeout(() => {
          router.push('/?auth_success=true')
        }, 1500)
        return
      }

      if (source === 'web') {
        // For web-only authentication: set success flag and redirect to landing page
        sessionStorage.setItem('auth_success', 'true')
        router.push('/')
        return
      }
      
      // Fallback for unknown sources - redirect to safe landing page
      router.push('/')
    }

    // Process with a small delay to ensure DOM is ready
    const timer = setTimeout(processAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Authentication successful!</p>
        <p className="mt-2 text-sm text-gray-500">Opening Berri app and redirecting to homepage...</p>
      </div>
    </div>
  )
}