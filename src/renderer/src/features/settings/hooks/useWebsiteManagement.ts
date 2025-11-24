/**
 * Website Management Hook
 *
 * Handles all website-related operations for the pill customization settings.
 * Manages website CRUD operations, shortcuts, and trust flow.
 *
 * Features:
 * - Add/remove websites from pill
 * - Edit website shortcuts
 * - Auto-trust websites when adding to pill
 * - Coordinate with WebView store for lifecycle
 * - Track analytics for website actions
 */

import { useState, useEffect } from 'react'
import { analytics } from '@/lib/analytics'
import { useWebsiteStore } from '@/features/website/store/websiteStore'
import type { PillWebsiteConfig, PillConfig } from '../../../../../types/pillConfig'

interface UseWebsiteManagementProps {
  /** Current pill configuration */
  config: PillConfig | null
  /** Function to save config changes */
  saveConfig: (config: PillConfig) => Promise<{ success: boolean; error?: string }>
  /** Total count of visible items (for limit checking) */
  getTotalVisibleCount: () => number
  /** Maximum number of websites allowed (freemium: 1 for free, 12 for paid) */
  maxWebsites: number
}

interface UseWebsiteManagementReturn {
  /** Local websites state */
  localWebsites: PillWebsiteConfig[]
  /** Set local websites state */
  setLocalWebsites: React.Dispatch<React.SetStateAction<PillWebsiteConfig[]>>
  /** Whether a save operation is in progress */
  saving: boolean
  /** Handle adding a new website */
  handleAddWebsite: (websiteData: {
    domain: string
    url: string
    label: string
    icon?: string
    shortcut?: string
  }) => Promise<void>
  /** Handle removing a website */
  handleRemoveWebsite: (domain: string) => Promise<void>
  /** Handle saving a website's shortcut */
  handleSaveWebsiteShortcut: (domain: string, newShortcut: string | null) => Promise<void>
}

/**
 * Custom hook for managing website state and operations
 */
export const useWebsiteManagement = ({
  config,
  saveConfig,
  getTotalVisibleCount,
  maxWebsites
}: UseWebsiteManagementProps): UseWebsiteManagementReturn => {
  const [localWebsites, setLocalWebsites] = useState<PillWebsiteConfig[]>([])
  const [saving, setSaving] = useState(false)
  const { createWebsite, removeWebsite } = useWebsiteStore()

  // Initialize local state from config
  useEffect(() => {
    if (config?.websites) {
      const sorted = [...config.websites].sort((a, b) => a.order - b.order)
      setLocalWebsites(sorted)
    }
  }, [config])

  /**
   * Handle adding a new website
   * Creates WebView and adds to config
   */
  const handleAddWebsite = async (websiteData: {
    domain: string
    url: string
    label: string
    icon?: string
    shortcut?: string
  }) => {
    console.log('[WEBSITE_MGMT] ====== handleAddWebsite CALLED ======', websiteData)
    if (!config) return

    // Check if already at maximum limit (FREEMIUM: 1 for free, 12 for paid)
    // IMPORTANT: Count ALL websites (visible + hidden) to prevent bypass exploit
    // Free users could hide websites and add more, effectively bypassing the limit
    const totalWebsitesCount = localWebsites.length
    if (totalWebsitesCount >= maxWebsites) {
      console.warn(
        `[WEBSITE_MGMT] Cannot add website: maximum limit of ${maxWebsites} websites reached (total: ${totalWebsitesCount})`
      )
      throw new Error(`Maximum limit of ${maxWebsites} websites reached`)
    }

    const totalVisible = getTotalVisibleCount()

    setSaving(true)
    try {
      // Check if site is trusted - if not, silently add to trusted sites
      console.log('[WEBSITE_MGMT] Checking if trusted:', websiteData.url)
      const trustCheckResult = await window.electronAPI.trustedSitesAPI.isUrlTrusted(
        websiteData.url
      )
      console.log('[WEBSITE_MGMT] Trust check result:', trustCheckResult)

      if (!trustCheckResult.trusted) {
        console.log(`[WEBSITE_MGMT] Auto-trusting ${websiteData.domain} for pill addition`)

        const trustResult = await window.electronAPI.trustedSitesAPI.add(
          websiteData.url,
          `Added to pill: ${websiteData.label}`
        )

        if (!trustResult.success) {
          throw new Error(`Failed to trust site: ${trustResult.error || 'Unknown error'}`)
        }

        console.log(`[WEBSITE_MGMT] Successfully trusted ${websiteData.domain}`)

        // Verify trust was actually added
        const verifyResult = await window.electronAPI.trustedSitesAPI.isUrlTrusted(websiteData.url)
        console.log('[WEBSITE_MGMT] Verify trust after add:', verifyResult)

        if (!verifyResult.trusted) {
          throw new Error('Trust verification failed - site was not added to trusted list')
        }
      }

      // Create WebView first (this ensures the website can be loaded)
      await createWebsite(websiteData.domain, websiteData.url, false)

      // Add to config
      const newWebsite: PillWebsiteConfig = {
        domain: websiteData.domain,
        url: websiteData.url,
        label: websiteData.label,
        visible: true,
        order: totalVisible, // Place at end of visible items
        icon: websiteData.icon,
        shortcut: websiteData.shortcut
      }

      const updatedWebsites = [...localWebsites, newWebsite]
      setLocalWebsites(updatedWebsites)

      const result = await saveConfig({
        ...config,
        websites: updatedWebsites
      })

      if (!result.success) {
        console.error('[WEBSITE_MGMT] Failed to save website:', result.error)
        // Rollback local state
        setLocalWebsites(localWebsites)
        // Rollback WebView creation
        await removeWebsite(`website:${websiteData.domain}`)
        throw new Error(result.error || 'Failed to save website')
      } else {
        analytics.track('pill_website_added', {
          domain: websiteData.domain,
          total_visible: totalVisible + 1
        })
      }
    } catch (error) {
      console.error('[WEBSITE_MGMT] Error adding website:', error)
      throw error
    } finally {
      setSaving(false)
    }
  }

  /**
   * Handle removing a website
   * Removes from config and destroys WebView
   */
  const handleRemoveWebsite = async (domain: string) => {
    if (!config) return

    setSaving(true)
    try {
      // Remove from config first
      const updatedWebsites = localWebsites.filter((w) => w.domain !== domain)
      setLocalWebsites(updatedWebsites)

      const result = await saveConfig({
        ...config,
        websites: updatedWebsites
      })

      if (!result.success) {
        console.error('[WEBSITE_MGMT] Failed to save website removal:', result.error)
        // Rollback
        setLocalWebsites(localWebsites)
        throw new Error(result.error || 'Failed to remove website')
      }

      // Destroy WebView after config is saved
      await removeWebsite(`website:${domain}`)

      analytics.track('pill_website_removed', { domain })
    } catch (error) {
      console.error('[WEBSITE_MGMT] Error removing website:', error)
      throw error
    } finally {
      setSaving(false)
    }
  }

  /**
   * Handle saving a website's shortcut
   */
  const handleSaveWebsiteShortcut = async (domain: string, newShortcut: string | null) => {
    if (!config) return

    setSaving(true)
    try {
      // Update the website's shortcut in local state
      const updatedWebsites = localWebsites.map((w) =>
        w.domain === domain ? { ...w, shortcut: newShortcut || undefined } : w
      )

      setLocalWebsites(updatedWebsites)

      // Save to config
      const result = await saveConfig({
        ...config,
        websites: updatedWebsites
      })

      if (!result.success) {
        console.error('[WEBSITE_MGMT] Failed to save website shortcut:', result.error)
        // Rollback
        setLocalWebsites(localWebsites)
        throw new Error(result.error || 'Failed to save website shortcut')
      }

      analytics.track('pill_website_shortcut_updated', {
        domain: domain,
        has_shortcut: !!newShortcut
      })
    } catch (error) {
      console.error('[WEBSITE_MGMT] Error saving website shortcut:', error)
      throw error
    } finally {
      setSaving(false)
    }
  }

  return {
    localWebsites,
    setLocalWebsites,
    saving,
    handleAddWebsite,
    handleRemoveWebsite,
    handleSaveWebsiteShortcut
  }
}
