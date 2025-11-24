/**
 * Custom hook for feature selection handlers in CustomizeScreen
 *
 * Handles:
 * - Feature toggle (with settings always-on constraint)
 * - Shortcut assignment/unregistration for features
 */

import { getShortcutByNumber } from '../utils'

interface FeatureItem {
  id: string
  selected: boolean
}

interface UseFeatureHandlersProps {
  features: FeatureItem[]
  setFeatures: React.Dispatch<React.SetStateAction<FeatureItem[]>>
  shortcuts: Record<string, string | null>
  setShortcuts: React.Dispatch<React.SetStateAction<Record<string, string | null>>>
  nextShortcutNumber: number
  setNextShortcutNumber: React.Dispatch<React.SetStateAction<number>>
  isFree: boolean
  maxModules: number
}

export function useFeatureHandlers({
  features,
  setFeatures,
  setShortcuts,
  nextShortcutNumber,
  setNextShortcutNumber,
  isFree,
  maxModules
}: UseFeatureHandlersProps) {
  /**
   * Toggle feature selection
   * Settings is always selected (cannot be toggled off)
   * Automatically assigns/unregisters shortcuts on selection/deselection
   * FREEMIUM: Free tier limited to maxModules (5 modules)
   */
  const handleToggleFeature = async (featureId: string) => {
    if (featureId === 'settings') {
      // Settings cannot be disabled
      return
    }

    // Check if feature is currently selected
    const feature = features.find((f) => f.id === featureId)
    if (!feature) return

    // FREEMIUM: Check module limit before allowing selection
    if (!feature.selected && isFree) {
      const currentSelectedCount = features.filter((f) => f.selected).length
      if (currentSelectedCount >= maxModules) {
        console.warn(
          `[CustomizeScreen] Free tier cannot select more than ${maxModules} modules (currently: ${currentSelectedCount})`
        )
        // Don't allow selection - user has reached limit
        return
      }
    }

    if (feature.selected) {
      // User is DESELECTING - unregister shortcut
      console.log(`[CustomizeScreen] Deselecting ${featureId}, unregistering shortcut`)

      try {
        await window.electronAPI.updateModuleShortcut(featureId, null)
        setShortcuts((prev) => {
          const updated = { ...prev }
          delete updated[featureId]
          return updated
        })
      } catch (error) {
        console.error(`[CustomizeScreen] Failed to unregister shortcut for ${featureId}:`, error)
      }
    } else {
      // User is SELECTING - assign next available shortcut
      const newShortcut = getShortcutByNumber(nextShortcutNumber)

      if (newShortcut) {
        console.log(`[CustomizeScreen] Selecting ${featureId}, assigning ${newShortcut}`)

        try {
          await window.electronAPI.updateModuleShortcut(featureId, newShortcut)
          setShortcuts((prev) => ({ ...prev, [featureId]: newShortcut }))
          setNextShortcutNumber((prev) => prev + 1)
        } catch (error) {
          console.error(`[CustomizeScreen] Failed to assign shortcut to ${featureId}:`, error)
        }
      } else {
        console.log(`[CustomizeScreen] Selecting ${featureId}, but no shortcuts available (max 18 reached)`)
      }
    }

    // Toggle selection state
    setFeatures((prev) =>
      prev.map((f) => (f.id === featureId ? { ...f, selected: !f.selected } : f))
    )
  }

  return {
    handleToggleFeature
  }
}
