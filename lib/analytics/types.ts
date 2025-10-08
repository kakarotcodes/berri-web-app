/**
 * Google Analytics 4 Type Definitions
 * Provides type-safe event tracking for GA4
 */

// GA4 Measurement ID type
export type GAMeasurementID = `G-${string}`

// Button locations for download tracking
export type DownloadButtonLocation =
  | 'hero_main'
  | 'mobile_menu'
  | 'scrolled_header'

// Platform types
export type Platform = 'mac' | 'windows' | 'linux'

/**
 * Base event parameters that can be sent with any GA4 event
 */
export interface BaseEventParams {
  [key: string]: string | number | boolean | undefined
}

/**
 * Parameters for download events
 * Follows GA4 recommended event structure
 */
export interface DownloadEventParams extends BaseEventParams {
  button_location: DownloadButtonLocation
  platform: Platform
  file_name: string
  version: string
  download_url: string
  value?: number // For conversion tracking (default: 1)
}

/**
 * Generic event parameters for custom events
 */
export interface CustomEventParams extends BaseEventParams {
  event_category?: string
  event_label?: string
  value?: number
}

/**
 * GA4 Event names
 * Using both recommended events and custom events
 */
export type GA4EventName =
  // Recommended GA4 events
  | 'page_view'
  | 'click'

  // Custom events for Berri
  | 'download_mac_os_main'
  | 'download_mac_os_mobile'
  | 'download_mac_os_header'
  | 'guide_navigation'
  | 'theme_toggle'

/**
 * Type-safe gtag function signature
 * Matches the official Google Analytics gtag.js API
 */
export interface GtagFunction {
  (command: 'config', targetId: string, config?: BaseEventParams): void
  (command: 'event', eventName: string, params?: BaseEventParams): void
  (command: 'js', date: Date): void
}

/**
 * Window object extension for gtag
 */
declare global {
  interface Window {
    gtag?: GtagFunction
    dataLayer?: any[]
  }
}
