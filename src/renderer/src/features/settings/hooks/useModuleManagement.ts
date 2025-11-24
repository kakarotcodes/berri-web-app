/**
 * Module Management Hook
 *
 * Handles all module-related operations for the pill customization settings.
 * Manages module visibility, ordering, and normalization.
 *
 * Features:
 * - Add/remove modules from pill
 * - Reorder modules via drag-and-drop
 * - Normalize module orders to prevent gaps
 * - Track analytics for module actions
 */

import { useState, useEffect } from 'react'
import { analytics } from '@/lib/analytics'
import type { PillModuleConfig, PillConfig } from '../../../../../types/pillConfig'

interface UseModuleManagementProps {
  /** Current pill configuration */
  config: PillConfig | null
  /** Function to save config changes */
  saveConfig: (config: PillConfig) => Promise<{ success: boolean; error?: string }>
  /** Maximum number of modules allowed (freemium: 5 for free, 12 for paid) */
  maxModules: number
}

interface UseModuleManagementReturn {
  /** Local modules state */
  localModules: PillModuleConfig[]
  /** Set local modules state */
  setLocalModules: React.Dispatch<React.SetStateAction<PillModuleConfig[]>>
  /** Whether a save operation is in progress */
  saving: boolean
  /** Handle module reordering */
  handleReorder: (reorderedModules: PillModuleConfig[]) => Promise<void>
  /** Handle removing a module (hiding it) */
  handleRemove: (moduleId: string) => Promise<void>
  /** Handle adding a module (showing it) */
  handleAdd: (moduleId: string) => Promise<void>
}

/**
 * Custom hook for managing module state and operations
 */
export const useModuleManagement = ({
  config,
  saveConfig,
  maxModules
}: UseModuleManagementProps): UseModuleManagementReturn => {
  const [localModules, setLocalModules] = useState<PillModuleConfig[]>([])
  const [saving, setSaving] = useState(false)

  // Initialize local state from config
  useEffect(() => {
    if (config?.modules) {
      const sorted = [...config.modules].sort((a, b) => a.order - b.order)
      setLocalModules(sorted)
    }
  }, [config])

  /**
   * Normalize module orders to prevent duplicates and gaps
   * Visible modules: 0, 1, 2...
   * Hidden modules: visibleCount, visibleCount+1...
   */
  const normalizeModuleOrders = (modules: PillModuleConfig[]): PillModuleConfig[] => {
    const visible = modules.filter((m) => m.visible).sort((a, b) => a.order - b.order)
    const hidden = modules.filter((m) => !m.visible)

    const visibleWithOrder = visible.map((m, index) => ({ ...m, order: index }))
    const hiddenWithOrder = hidden.map((m, index) => ({
      ...m,
      order: visible.length + index
    }))

    return [...visibleWithOrder, ...hiddenWithOrder]
  }

  /**
   * Handle reorder from drag-and-drop
   */
  const handleReorder = async (reorderedModules: PillModuleConfig[]) => {
    if (!config) return

    setLocalModules(reorderedModules)

    setSaving(true)
    try {
      const result = await saveConfig({
        ...config,
        modules: reorderedModules
      })

      if (!result.success) {
        console.error('[MODULE_MGMT] Failed to save reorder:', result.error)
        // Revert on error
        if (config.modules) {
          setLocalModules([...config.modules])
        }
      } else {
        analytics.track('pill_modules_reordered', {
          visible_count: reorderedModules.filter((m) => m.visible).length
        })
      }
    } catch (error) {
      console.error('[MODULE_MGMT] Error reordering modules:', error)
      if (config.modules) {
        setLocalModules([...config.modules])
      }
    } finally {
      setSaving(false)
    }
  }

  /**
   * Handle removing module from pill (hide it)
   * Normalizes orders after hiding to prevent gaps
   */
  const handleRemove = async (moduleId: string) => {
    if (!config) return

    const updatedModules = localModules.map((m) =>
      m.id === moduleId ? { ...m, visible: false } : m
    )

    // Check if at least one module remains visible
    const visibleCount = updatedModules.filter((m) => m.visible).length
    if (visibleCount === 0) {
      console.warn('[MODULE_MGMT] Cannot hide all modules')
      return
    }

    // Re-normalize orders after hiding module
    const normalized = normalizeModuleOrders(updatedModules)

    setLocalModules(normalized)

    setSaving(true)
    try {
      const result = await saveConfig({
        ...config,
        modules: normalized
      })

      if (!result.success) {
        console.error('[MODULE_MGMT] Failed to save hide:', result.error)
        if (config.modules) {
          setLocalModules([...config.modules])
        }
      } else {
        analytics.track('pill_module_hidden', { module_id: moduleId })
      }
    } catch (error) {
      console.error('[MODULE_MGMT] Error hiding module:', error)
      if (config.modules) {
        setLocalModules([...config.modules])
      }
    } finally {
      setSaving(false)
    }
  }

  /**
   * Handle adding hidden module back to pill (show it)
   * Places it at the end of visible modules to prevent order conflicts
   * FREEMIUM: Free tier limited to 5 modules, paid tier to 12 modules
   */
  const handleAdd = async (moduleId: string) => {
    if (!config) return

    // Count current visible modules to determine where to insert
    const visibleCount = localModules.filter((m) => m.visible).length

    // Check if already at maximum limit (FREEMIUM: 5 for free, 12 for paid)
    if (visibleCount >= maxModules) {
      console.warn(
        `[MODULE_MGMT] Cannot add module: maximum limit of ${maxModules} modules reached`
      )
      throw new Error(`Maximum limit of ${maxModules} modules reached`)
    }

    // Update the module: make visible and assign order at end
    const updatedModules = localModules.map((m) => {
      if (m.id === moduleId) {
        return { ...m, visible: true, order: visibleCount }
      }
      return m
    })

    // Re-normalize all orders to prevent gaps
    const normalized = normalizeModuleOrders(updatedModules)

    setLocalModules(normalized)

    setSaving(true)
    try {
      const result = await saveConfig({
        ...config,
        modules: normalized
      })

      if (!result.success) {
        console.error('[MODULE_MGMT] Failed to save show:', result.error)
        if (config.modules) {
          setLocalModules([...config.modules])
        }
      } else {
        analytics.track('pill_module_shown', { module_id: moduleId })
      }
    } catch (error) {
      console.error('[MODULE_MGMT] Error showing module:', error)
      if (config.modules) {
        setLocalModules([...config.modules])
      }
    } finally {
      setSaving(false)
    }
  }

  return {
    localModules,
    setLocalModules,
    saving,
    handleReorder,
    handleRemove,
    handleAdd
  }
}
