/**
 * Google Analytics 4 Helper Utilities
 * Provides environment-aware, type-safe GA4 tracking functions
 */

import type { BaseEventParams, DownloadEventParams, DownloadButtonLocation } from './types'

/**
 * Google Analytics Measurement ID
 * Using environment variable for flexibility across environments
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-5ML1HHN4NZ'

/**
 * Check if we're in production environment
 * GA4 tracking should only be active in production
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production'
}

/**
 * Check if GA4 is loaded and available
 * Safely checks for gtag function existence
 */
export const isGA4Available = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

/**
 * Send a generic event to GA4
 * Handles environment checks and error boundaries
 *
 * @param eventName - Name of the event to track
 * @param params - Event parameters (optional)
 */
export const sendGA4Event = (
  eventName: string,
  params?: BaseEventParams
): void => {
  // Only track in production
  if (!isProduction()) {
    console.log('[GA4 Dev Mode]', eventName, params)
    return
  }

  // Check if GA4 is loaded
  if (!isGA4Available()) {
    console.warn('[GA4] gtag not available')
    return
  }

  try {
    window.gtag!('event', eventName, params)
  } catch (error) {
    console.error('[GA4] Event tracking error:', error)
  }
}

/**
 * Track download events with standardized parameters
 * Follows GA4 best practices for download tracking
 *
 * @param buttonLocation - Where the download button was clicked
 * @param downloadUrl - Full URL of the download file
 * @param version - Version number of the download (e.g., "1.0.24")
 */
export const trackDownload = (
  buttonLocation: DownloadButtonLocation,
  downloadUrl: string,
  version: string
): void => {
  // Extract file name from URL
  const fileName = downloadUrl.split('/').pop() || 'unknown'

  const params: DownloadEventParams = {
    button_location: buttonLocation,
    platform: 'mac',
    file_name: fileName,
    version: version,
    download_url: downloadUrl,
    value: 1, // For conversion tracking
  }

  // Send unique event name based on button location
  const eventNameMap = {
    'hero_main': 'download_mac_os_main',
    'mobile_menu': 'download_mac_os_mobile',
    'scrolled_header': 'download_mac_os_header',
  }
  const eventName = eventNameMap[buttonLocation]
  sendGA4Event(eventName, params)

  // Optional: Also send as generic 'click' event for backup tracking
  sendGA4Event('click', {
    event_category: 'download',
    event_label: buttonLocation,
    value: 1,
  })
}

/**
 * Track page views manually (if needed)
 * GA4 automatically tracks page views, but this can be used for SPAs
 *
 * @param url - Page URL
 * @param title - Page title
 */
export const trackPageView = (url: string, title?: string): void => {
  sendGA4Event('page_view', {
    page_location: url,
    page_title: title || document.title,
  })
}

/**
 * Track guide navigation events
 * Useful for understanding which guide sections users visit
 *
 * @param category - Guide category (e.g., "getting-started")
 * @param slug - Guide page slug (e.g., "installation")
 */
export const trackGuideNavigation = (category: string, slug: string): void => {
  sendGA4Event('guide_navigation', {
    guide_category: category,
    guide_slug: slug,
    event_category: 'guide',
    event_label: `${category}/${slug}`,
  })
}

/**
 * Track theme toggle events
 * Helps understand user preferences
 *
 * @param theme - Theme selected ("light" or "dark")
 */
export const trackThemeToggle = (theme: 'light' | 'dark'): void => {
  sendGA4Event('theme_toggle', {
    theme_mode: theme,
    event_category: 'settings',
    event_label: theme,
  })
}
