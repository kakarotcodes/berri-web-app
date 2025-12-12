/**
 * Google Analytics 4 Script Component
 * Client Component that injects GA4 tracking scripts
 * Only renders when GA_MEASUREMENT_ID env var is set
 */

'use client'

import Script from 'next/script'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

/**
 * GoogleAnalytics Component
 * Injects GA4 gtag.js script using Next.js Script component for optimal loading
 *
 * Features:
 * - Only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set
 * - Uses afterInteractive strategy for performance
 * - Type-safe implementation
 */
export default function GoogleAnalytics() {
  // Only render if GA measurement ID is configured
  if (!GA_MEASUREMENT_ID) {
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
