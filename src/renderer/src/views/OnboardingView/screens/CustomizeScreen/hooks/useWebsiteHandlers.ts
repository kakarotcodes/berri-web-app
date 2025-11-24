/**
 * Custom hook for website selection handlers in CustomizeScreen
 *
 * Handles:
 * - Popular website toggle (with freemium radio behavior)
 * - Custom website addition (with freemium radio behavior)
 * - Shortcut assignment/unregistration
 */

import type { PopularSite } from '../../../../../../../shared/types/popularSites'
import { getShortcutByNumber, getSpecialShortcut, hasSpecialShortcut } from '../utils'

interface WebsiteItem {
  domain: string
  url: string
  label: string
  selected: boolean
}

interface UseWebsiteHandlersProps {
  isFree: boolean
  selectedPopularSites: Set<string>
  setSelectedPopularSites: React.Dispatch<React.SetStateAction<Set<string>>>
  websites: WebsiteItem[]
  setWebsites: React.Dispatch<React.SetStateAction<WebsiteItem[]>>
  shortcuts: Record<string, string | null>
  setShortcuts: React.Dispatch<React.SetStateAction<Record<string, string | null>>>
  nextShortcutNumber: number
  setNextShortcutNumber: React.Dispatch<React.SetStateAction<number>>
}

export function useWebsiteHandlers({
  isFree,
  selectedPopularSites,
  setSelectedPopularSites,
  websites,
  setWebsites,
  setShortcuts,
  nextShortcutNumber,
  setNextShortcutNumber
}: UseWebsiteHandlersProps) {
  /**
   * Toggle popular website selection (from backend featured sites)
   * Automatically assigns/unregisters shortcuts on selection/deselection
   * Special shortcuts: YouTube gets Control+Y, Gmail gets Control+G
   *
   * FREEMIUM: Free users get radio behavior (1 selection max)
   */
  const handleTogglePopularWebsite = async (site: PopularSite) => {
    const isCurrentlySelected = selectedPopularSites.has(site.domain)

    if (isCurrentlySelected) {
      // User is DESELECTING
      // FREEMIUM: Prevent deselecting last website (free users must always have 1 selected)
      if (isFree === true && selectedPopularSites.size === 1) {
        console.log('[CustomizeScreen] Free user cannot deselect last website')
        return
      }

      // Unregister shortcut for deselected site
      console.log(`[CustomizeScreen] Deselecting ${site.domain}, unregistering shortcut`)

      try {
        await window.electronAPI.updateModuleShortcut(site.domain, null)
        setShortcuts((prev) => {
          const updated = { ...prev }
          delete updated[site.domain]
          return updated
        })
      } catch (error) {
        console.error(`[CustomizeScreen] Failed to unregister shortcut for ${site.domain}:`, error)
      }
    } else {
      // User is SELECTING a new site
      // FREEMIUM RADIO BEHAVIOR: Free users can only have 1 website selected
      // When selecting a new site, replace the current selection
      if (isFree === true && selectedPopularSites.size >= 1) {
        console.log('[CustomizeScreen] Free user selecting new site, replacing current selection')

        // Get the currently selected site
        const currentSiteDomain = Array.from(selectedPopularSites)[0]

        // Unregister shortcut for the old site
        if (currentSiteDomain) {
          try {
            await window.electronAPI.updateModuleShortcut(currentSiteDomain, null)
            setShortcuts((prev) => {
              const updated = { ...prev }
              delete updated[currentSiteDomain]
              return updated
            })
            console.log(`[CustomizeScreen] Unregistered shortcut for replaced site: ${currentSiteDomain}`)
          } catch (error) {
            console.error(`[CustomizeScreen] Failed to unregister shortcut for ${currentSiteDomain}:`, error)
          }
        }

        // Replace selection with new site (will happen in state update at end of function)
        // Continue to shortcut assignment below
      }

      // Assign shortcut to newly selected site
      // User is SELECTING - assign shortcut
      let newShortcut: string | null = null

      // Check for special default shortcuts
      const specialShortcut = getSpecialShortcut(site.domain)
      if (specialShortcut) {
        newShortcut = specialShortcut
        console.log(`[CustomizeScreen] Selecting ${site.domain}, assigning special shortcut: ${newShortcut}`)
      } else {
        // Use sequential numbering for other sites
        newShortcut = getShortcutByNumber(nextShortcutNumber)
        if (newShortcut) {
          console.log(`[CustomizeScreen] Selecting ${site.domain}, assigning ${newShortcut}`)
        } else {
          console.log(
            `[CustomizeScreen] Selecting ${site.domain}, but no shortcuts available (max 18 reached)`
          )
        }
      }

      if (newShortcut) {
        try {
          await window.electronAPI.updateModuleShortcut(site.domain, newShortcut)
          setShortcuts((prev) => ({ ...prev, [site.domain]: newShortcut }))

          // Only increment for non-special shortcuts
          if (!hasSpecialShortcut(site.domain)) {
            setNextShortcutNumber((prev) => prev + 1)
          }
        } catch (error) {
          console.error(`[CustomizeScreen] Failed to assign shortcut to ${site.domain}:`, error)
        }
      }
    }

    // Update selection state
    setSelectedPopularSites((prev) => {
      const newSet = new Set(prev)

      if (isCurrentlySelected) {
        // Deselection (already checked if allowed above)
        newSet.delete(site.domain)
      } else {
        // Selection
        if (isFree === true && prev.size >= 1) {
          // RADIO BEHAVIOR: Replace selection for free users
          return new Set([site.domain])
        } else {
          // CHECKBOX BEHAVIOR: Add to selection for paid users
          newSet.add(site.domain)
        }
      }

      return newSet
    })
  }

  /**
   * Add new website
   * Note: Order calculation accounts for all modules to avoid conflicts
   * Automatically assigns shortcut to newly added website
   *
   * FREEMIUM RADIO BEHAVIOR: Free users can only have 1 website selected
   * Adding a new website replaces the currently selected website
   */
  const handleAddWebsite = async (website: {
    domain: string
    url: string
    label: string
    icon?: string
    shortcut?: string
  }) => {
    // Check if website already exists in user-added websites
    if (websites.some((w) => w.domain === website.domain)) {
      console.warn('[CustomizeScreen] Website already exists in user-added sites:', website.domain)
      return
    }

    // Check if website already exists in selected popular websites
    if (selectedPopularSites.has(website.domain)) {
      console.warn('[CustomizeScreen] Website already exists in popular sites:', website.domain)
      return
    }

    // FREEMIUM RADIO BEHAVIOR: Free users replace current selection
    if (isFree === true) {
      console.log('[CustomizeScreen] Free user adding custom website, replacing current selection')

      // 1. Unregister shortcuts for currently selected popular websites
      for (const siteDomain of selectedPopularSites) {
        try {
          await window.electronAPI.updateModuleShortcut(siteDomain, null)
          setShortcuts((prev) => {
            const updated = { ...prev }
            delete updated[siteDomain]
            return updated
          })
          console.log(`[CustomizeScreen] Unregistered shortcut for replaced popular site: ${siteDomain}`)
        } catch (error) {
          console.error(`[CustomizeScreen] Failed to unregister shortcut for ${siteDomain}:`, error)
        }
      }

      // 2. Clear popular website selections
      setSelectedPopularSites(new Set())

      // 3. Mark all existing user-added websites as unselected
      setWebsites((prev) => prev.map((w) => ({ ...w, selected: false })))

      // Continue to add new website with shortcut below
    }

    // Assign shortcut to new website
    const newShortcut = getShortcutByNumber(nextShortcutNumber)

    if (newShortcut) {
      console.log(`[CustomizeScreen] Adding ${website.domain}, assigning ${newShortcut}`)

      try {
        await window.electronAPI.updateModuleShortcut(website.domain, newShortcut)
        setShortcuts((prev) => ({ ...prev, [website.domain]: newShortcut }))
        setNextShortcutNumber((prev) => prev + 1)
      } catch (error) {
        console.error(`[CustomizeScreen] Failed to assign shortcut to ${website.domain}:`, error)
      }
    } else {
      console.log(
        `[CustomizeScreen] Adding ${website.domain}, but no shortcuts available (max 18 reached)`
      )
    }

    setWebsites((prev) => [
      ...prev,
      {
        domain: website.domain,
        url: website.url,
        label: website.label,
        selected: true // New websites are selected by default
      }
    ])
  }

  return {
    handleTogglePopularWebsite,
    handleAddWebsite
  }
}
