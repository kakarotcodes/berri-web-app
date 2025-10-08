/**
 * Custom React Hook for Google Analytics 4
 * Provides client-side event tracking with React integration
 */

'use client'

import { useCallback } from 'react'
import type { DownloadButtonLocation } from './types'
import {
  trackDownload,
  trackGuideNavigation,
  trackThemeToggle,
  sendGA4Event,
  isGA4Available,
} from './ga4'

/**
 * Custom hook for accessing GA4 tracking functions in React components
 * Provides memoized tracking functions to prevent unnecessary re-renders
 *
 * @returns Object containing all tracking functions
 */
export const useGoogleAnalytics = () => {
  /**
   * Track download button clicks
   * Memoized to prevent function recreation on every render
   */
  const trackDownloadClick = useCallback(
    (buttonLocation: DownloadButtonLocation, downloadUrl: string, version: string) => {
      trackDownload(buttonLocation, downloadUrl, version)
    },
    []
  )

  /**
   * Track guide page navigation
   */
  const trackGuideClick = useCallback((category: string, slug: string) => {
    trackGuideNavigation(category, slug)
  }, [])

  /**
   * Track theme toggle
   */
  const trackThemeChange = useCallback((theme: 'light' | 'dark') => {
    trackThemeToggle(theme)
  }, [])

  /**
   * Track generic custom events
   */
  const trackEvent = useCallback((eventName: string, params?: Record<string, any>) => {
    sendGA4Event(eventName, params)
  }, [])

  /**
   * Check if GA4 is ready
   * Useful for conditional tracking logic
   */
  const isReady = useCallback(() => {
    return isGA4Available()
  }, [])

  return {
    trackDownloadClick,
    trackGuideClick,
    trackThemeChange,
    trackEvent,
    isReady,
  }
}
