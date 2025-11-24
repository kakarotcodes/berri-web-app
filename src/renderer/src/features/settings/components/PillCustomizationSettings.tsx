/**
 * Pill Customization Settings Component (Refactored)
 *
 * Main component for customizing the pill toolbar.
 * Coordinates between modules, websites, and global shortcuts.
 *
 * Architecture:
 * - Uses custom hooks for state management (modules, websites, shortcuts)
 * - Composes child components for each section
 * - Manages modal visibility state
 * - Coordinates reordering between modules and websites
 */

import React, { useState } from 'react'
import { usePillConfig } from '@/hooks/usePillConfig'
import { useLicense } from '@/hooks/useLicense'
import PillPreview from './PillPreview'
import HiddenModulesPalette from './HiddenModulesPalette'
import AddWebsiteModal from './AddWebsiteModal'
import ShortcutEditorModal from './ShortcutEditorModal'
import GeneralShortcutEditorModal from './GeneralShortcutEditorModal'
import SectionHelp from './SectionHelp'
import WebsitesSection from './WebsitesSection'
import GlobalShortcutsSection from './GlobalShortcutsSection'
import { useModuleManagement } from '../hooks/useModuleManagement'
import { useWebsiteManagement } from '../hooks/useWebsiteManagement'
import { useShortcutsConfig } from '../hooks/useShortcutsConfig'
import type { PillModuleConfig, PillWebsiteConfig } from '../../../../../types/pillConfig'
import { getLimitsForLicense } from '../../../../../shared/freemiumLimits'

interface GeneralShortcut {
  key: 'toggle' | 'snip' | 'collapse'
  name: string
  description: string
}

// General shortcuts definition
const GENERAL_SHORTCUTS: GeneralShortcut[] = [
  {
    key: 'toggle',
    name: 'Toggle App Visibility',
    description: 'Show or hide the Berri window'
  },
  {
    key: 'snip',
    name: 'Snipping Tool',
    description: 'Open the snipping tool'
  },
  {
    key: 'collapse',
    name: 'Collapse to Pill',
    description: 'Minimize the app to pill view'
  }
]

const PillCustomizationSettings: React.FC = () => {
  const { config, saveConfig, loading } = usePillConfig()
  const { licenseInfo } = useLicense()

  // FREEMIUM: Get limits from centralized source (single source of truth)
  const limits = getLimitsForLicense(licenseInfo)
  const maxWebsites = limits.maxWebsites
  const maxModules = limits.maxPinnedModules

  // Custom hooks for state management
  const moduleManagement = useModuleManagement({ config, saveConfig, maxModules })
  const websiteManagement = useWebsiteManagement({
    config,
    saveConfig,
    getTotalVisibleCount,
    maxWebsites
  })
  const shortcutsState = useShortcutsConfig()

  // Modal state
  const [isAddWebsiteModalOpen, setIsAddWebsiteModalOpen] = useState(false)
  const [editingWebsiteDomain, setEditingWebsiteDomain] = useState<string | null>(null)
  const [editingGeneralShortcut, setEditingGeneralShortcut] = useState<GeneralShortcut | null>(null)

  // Edit mode always enabled for now
  const editMode = true

  /**
   * Calculate total visible items (modules + websites)
   */
  function getTotalVisibleCount(): number {
    const visibleModulesCount = moduleManagement.localModules.filter((m) => m.visible).length
    const visibleWebsitesCount = websiteManagement.localWebsites.filter((w) => w.visible).length
    return visibleModulesCount + visibleWebsitesCount
  }

  /**
   * Handle reorder from drag-and-drop (both modules and websites)
   */
  const handleReorder = async (
    reorderedModules: PillModuleConfig[],
    reorderedWebsites: PillWebsiteConfig[]
  ) => {
    if (!config) return

    moduleManagement.setLocalModules(reorderedModules)
    websiteManagement.setLocalWebsites(reorderedWebsites)

    try {
      const result = await saveConfig({
        ...config,
        modules: reorderedModules,
        websites: reorderedWebsites
      })

      if (!result.success) {
        console.error('[PILL_SETTINGS] Failed to save reorder:', result.error)
        // Revert on error
        if (config.modules) {
          moduleManagement.setLocalModules([...config.modules])
        }
        if (config.websites) {
          websiteManagement.setLocalWebsites([...config.websites])
        }
      }
    } catch (error) {
      console.error('[PILL_SETTINGS] Error reordering items:', error)
      if (config.modules) {
        moduleManagement.setLocalModules([...config.modules])
      }
      if (config.websites) {
        websiteManagement.setLocalWebsites([...config.websites])
      }
    }
  }

  /**
   * Handle editing a website's shortcut
   */
  const handleEditWebsiteShortcut = (e: React.MouseEvent, domain: string) => {
    e.stopPropagation()
    setEditingWebsiteDomain(domain)
  }

  /**
   * Handle saving a website's shortcut
   */
  const handleSaveWebsiteShortcut = async (newShortcut: string | null) => {
    if (!editingWebsiteDomain) return
    await websiteManagement.handleSaveWebsiteShortcut(editingWebsiteDomain, newShortcut)
  }

  /**
   * Handle editing a general shortcut
   */
  const handleEditGeneralShortcut = (shortcut: GeneralShortcut) => {
    setEditingGeneralShortcut(shortcut)
  }

  /**
   * Handle saving a general shortcut
   */
  const handleSaveGeneralShortcut = async (newShortcut: string) => {
    if (!editingGeneralShortcut) return
    await shortcutsState.handleSaveGeneralShortcut(editingGeneralShortcut.key, newShortcut)
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Pill Customization</h3>
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-400 text-sm">Loading configuration...</div>
        </div>
      </div>
    )
  }

  // Error state
  if (!config) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Pill Customization</h3>
        <div className="flex items-center justify-center py-12">
          <div className="text-red-400 text-sm">Failed to load pill configuration</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <h3 className="text-lg font-semibold text-white">Customize Berri</h3>
          <SectionHelp
            title="Customize Your Toolbar"
            description="The pill is your floating toolbar that gives you quick access to features and websites. Drag to reorder items, hover to add/remove them, and customize keyboard shortcuts."
          />
        </div>
      </div>

      {/* Live Pill Preview */}
      <PillPreview
        modules={moduleManagement.localModules}
        websites={websiteManagement.localWebsites}
        onReorder={handleReorder}
        onRemove={moduleManagement.handleRemove}
        editMode={editMode}
        orientation="horizontal"
      />

      {/* Hidden Modules Palette */}
      <HiddenModulesPalette
        modules={moduleManagement.localModules}
        onAdd={moduleManagement.handleAdd}
        onRemove={moduleManagement.handleRemove}
      />

      {/* Websites Section */}
      <WebsitesSection
        websites={websiteManagement.localWebsites}
        totalVisibleCount={websiteManagement.localWebsites.filter((w) => w.visible).length}
        maxItems={maxWebsites}
        onAddClick={() => setIsAddWebsiteModalOpen(true)}
        onRemove={websiteManagement.handleRemoveWebsite}
        onEditShortcut={handleEditWebsiteShortcut}
      />

      {/* Global Shortcuts Section */}
      {shortcutsState.shortcutsConfig && (
        <GlobalShortcutsSection
          shortcutsConfig={shortcutsState.shortcutsConfig}
          generalShortcuts={GENERAL_SHORTCUTS}
          onEdit={handleEditGeneralShortcut}
          saving={shortcutsState.saving}
        />
      )}

      {/* Help Text */}
      <div className="bg-zinc-900/30 rounded-lg p-4 space-y-2">
        <p className="text-gray-300 text-sm font-medium">How to customize:</p>
        <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
          <li>Hover on features to add/remove them</li>
          <li>Green checkmark indicates enabled modules</li>
          <li>Drag icons in the preview to reorder them</li>
          <li>Click on Edit Shortcut button to add your custom shortcuts to a feature</li>
        </ul>
        <p className="text-gray-400 text-xs mt-3 pt-3 border-t border-zinc-700">
          💡 <span className="font-medium">Note:</span> Shortcuts only work for visible modules. Hide
          a module to disable its shortcut.
        </p>
      </div>

      {/* Add Website Modal */}
      <AddWebsiteModal
        isOpen={isAddWebsiteModalOpen}
        onClose={() => setIsAddWebsiteModalOpen(false)}
        onAdd={websiteManagement.handleAddWebsite}
        existingDomains={websiteManagement.localWebsites.map((w) => w.domain)}
      />

      {/* Website Shortcut Editor Modal */}
      {editingWebsiteDomain && (
        <ShortcutEditorModal
          moduleId={`website:${editingWebsiteDomain}`}
          currentShortcut={
            websiteManagement.localWebsites.find((w) => w.domain === editingWebsiteDomain)
              ?.shortcut || null
          }
          isOpen={!!editingWebsiteDomain}
          onClose={() => setEditingWebsiteDomain(null)}
          onSave={handleSaveWebsiteShortcut}
        />
      )}

      {/* General Shortcut Editor Modal */}
      {editingGeneralShortcut && shortcutsState.shortcutsConfig && (
        <GeneralShortcutEditorModal
          shortcutKey={editingGeneralShortcut.key}
          shortcutName={editingGeneralShortcut.name}
          currentShortcut={shortcutsState.shortcutsConfig[editingGeneralShortcut.key]}
          isOpen={!!editingGeneralShortcut}
          onClose={() => setEditingGeneralShortcut(null)}
          onSave={handleSaveGeneralShortcut}
        />
      )}
    </div>
  )
}

export default PillCustomizationSettings
