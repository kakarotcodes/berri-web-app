/**
 * Google Analytics 4 Script Component
 * Client Component that injects GA4 tracking scripts
 * Only renders in production environment
 */

'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-5ML1HHN4NZ'

/**
 * GoogleAnalytics Component
 * Injects GA4 gtag.js script using Next.js Script component for optimal loading
 *
 * Features:
 * - Only loads in production
 * - Uses afterInteractive strategy for performance
 * - Type-safe implementation
 * - Follows Next.js 14 best practices
 */
export default function GoogleAnalytics() {
  // Only render in production
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {/* Google Analytics gtag.js script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />

      {/* Google Analytics initialization script */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
