/**
 * CustomizeScreen - Second screen of onboarding flow
 *
 * Shows:
 * - Pill preview (live preview of selections)
 * - Features grid (Notes, Clipboard, Settings, etc.)
 * - Websites grid (grouped by category with bubble UI like browser module)
 * - Keyboard shortcuts below each feature with edit button
 * - "Do This Later" button (skip customization, use defaults)
 * - "Back" and "Next" buttons for navigation
 *
 * REFACTORED: Uses extracted hooks for better organization and maintainability
 */

import React, { useState, useMemo } from 'react'
import ShortcutEditorModal from '@/features/settings/components/ShortcutEditorModal'
import type { PillCustomization, PillConfigResult } from '../../../../../types/pillConfig'
import { usePopularWebsites } from '../hooks/usePopularWebsites'
import { PopularWebsitesGrid } from '../components/PopularWebsitesGrid'
import { useLicense } from '@/hooks/useLicense'
import { PillPreview, FeatureCard } from './CustomizeScreen/components'
import {
  useCustomizationInit,
  useFeatureHandlers,
  useWebsiteHandlers,
  useSaveCustomization,
  usePillDragDrop
} from './CustomizeScreen/hooks'
import { getLimitsForLicense, getPlanType } from '../../../../../shared/freemiumLimits'

interface CustomizeScreenProps {
  pillConfig: PillCustomization | null
  savePillConfig: (config: PillCustomization) => Promise<PillConfigResult>
  onBack: () => void
  onNext: () => void
  onSkip: () => void
}

interface FeatureItem {
  id: string
  selected: boolean
}

interface WebsiteItem {
  domain: string
  url: string
  label: string
  selected: boolean
}

const CustomizeScreen: React.FC<CustomizeScreenProps> = ({
  pillConfig,
  savePillConfig,
  onBack,
  onNext,
  onSkip
}) => {
  // ========================================
  // STATE
  // ========================================

  // Local state for features
  const [features, setFeatures] = useState<FeatureItem[]>([
    { id: 'notes', selected: false },
    { id: 'clipboard', selected: false },
    { id: 'fileExplorer', selected: false },
    { id: 'webview', selected: false },
    { id: 'snippingTool', selected: false },
    { id: 'googleMeet', selected: false },
    { id: 'screenCapture', selected: false },
    { id: 'settings', selected: true } // Always selected (required)
  ])

  // Local state for websites (user-added)
  const [websites, setWebsites] = useState<WebsiteItem[]>([])

  // State for selected popular websites (Set of domains)
  const [selectedPopularSites, setSelectedPopularSites] = useState<Set<string>>(new Set())

  // Modal state
  const [editingShortcut, setEditingShortcut] = useState<string | null>(null)

  // Shortcuts state (loaded from config)
  const [shortcuts, setShortcuts] = useState<Record<string, string | null>>({})

  // Track next available shortcut number (increments on each new selection, never decrements)
  const [nextShortcutNumber, setNextShortcutNumber] = useState(1)

  // ========================================
  // EXTERNAL DATA
  // ========================================

  // Fetch popular websites from backend
  const { groupedWebsites, allWebsites, loading: loadingPopularSites } = usePopularWebsites()

  // License state for freemium model
  const { licenseInfo } = useLicense()

  // FREEMIUM: Get limits from centralized source (single source of truth)
  const limits = getLimitsForLicense(licenseInfo)
  const planType = getPlanType(licenseInfo)
  const isFree = planType === 'free'

  // ========================================
  // COMPUTED VALUES
  // ========================================

  // Pill preview items (selected features + selected websites)
  const pillPreviewItems = useMemo(() => {
    const selectedFeatures = features.filter((f) => f.selected)

    // Get selected popular websites from backend
    const selectedPopularWebsiteItems: WebsiteItem[] = allWebsites
      .filter((site) => selectedPopularSites.has(site.domain))
      .map((site) => ({
        domain: site.domain,
        url: site.canonical_url,
        label: site.label,
        selected: true
      }))

    // Get user-added websites
    const selectedUserWebsites = websites.filter((w) => w.selected)

    return [...selectedFeatures, ...selectedPopularWebsiteItems, ...selectedUserWebsites]
  }, [features, allWebsites, selectedPopularSites, websites])

  const selectedCount = pillPreviewItems.length

  // ========================================
  // CUSTOM HOOKS
  // ========================================

  // Initialize state from pillConfig
  useCustomizationInit({
    pillConfig,
    allWebsites,
    setFeatures,
    setSelectedPopularSites,
    setWebsites,
    setShortcuts,
    setNextShortcutNumber,
    pillPreviewItems
  })

  // Feature handlers
  const { handleToggleFeature } = useFeatureHandlers({
    features,
    setFeatures,
    shortcuts,
    setShortcuts,
    nextShortcutNumber,
    setNextShortcutNumber,
    isFree: isFree,
    maxModules: limits.maxPinnedModules
  })

  // Website handlers
  const { handleTogglePopularWebsite } = useWebsiteHandlers({
    isFree,
    selectedPopularSites,
    setSelectedPopularSites,
    websites,
    setWebsites,
    shortcuts,
    setShortcuts,
    nextShortcutNumber,
    setNextShortcutNumber
  })

  // Save customization
  const { handleNext } = useSaveCustomization({
    pillConfig,
    features,
    selectedPopularSites,
    websites,
    allWebsites,
    shortcuts,
    setShortcuts,
    savePillConfig,
    onNext
  })

  // Drag and drop
  const { activeId, handleDragStart, handleDragEnd } = usePillDragDrop({
    pillPreviewItems,
    setFeatures,
    setWebsites
  })

  // ========================================
  // HELPER FUNCTIONS
  // ========================================

  // Get shortcut for a feature (from loaded config or default)
  const getFeatureShortcut = (featureId: string): string | null => {
    return shortcuts[featureId] || null
  }

  // Handle shortcut save
  const handleSaveShortcut = async (newShortcut: string | null) => {
    if (!editingShortcut) return

    try {
      const result = await window.electronAPI.updateModuleShortcut(editingShortcut, newShortcut)

      if (result.success) {
        // Update local state
        setShortcuts((prev) => ({
          ...prev,
          [editingShortcut]: newShortcut
        }))
      }
    } catch (error) {
      console.error('[CustomizeScreen] Failed to save shortcut:', error)
      throw error
    }
  }

  // Handle "Do This Later" - skip to next screen with defaults
  const handleSkip = () => {
    onSkip()
  }

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Content container with gradient border */}
      <div className="relative w-full h-full flex-1 flex flex-col min-h-0">
        <div className="relative rounded-md p-[1px] bg-gradient-to-br from-white/15 via-fuchsia-400/20 to-cyan-400/20 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)] flex-1 flex flex-col min-h-0">
          <div className="rounded-md bg-zinc-900/70 backdrop-blur-xl ring-1 ring-white/10 flex-1 flex flex-col min-h-0">
            <div className="relative z-10 px-5 py-4 text-white flex-1 flex flex-col overflow-y-auto min-h-0">
              {/* Title */}
              <h1 className="text-center text-xl font-semibold tracking-tight mb-1">
                Customize Berri
              </h1>
              <p className="text-center text-xs text-white/70 mb-4">
                Select features and websites • {selectedCount} selected
              </p>

              {/* Pill Preview - Draggable */}
              <PillPreview
                items={pillPreviewItems}
                activeId={activeId}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

              {/* Selection Grids */}
              <div className="flex-1 min-h-0 overflow-y-auto space-y-6">
                {/* Section 1: Features Grid */}
                <div>
                  <div className="mb-3">
                    <p className="text-white font-medium text-sm">Features</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                    {features.map((feature) => (
                      <FeatureCard
                        key={feature.id}
                        featureId={feature.id}
                        selected={feature.selected}
                        shortcut={getFeatureShortcut(feature.id)}
                        onToggle={handleToggleFeature}
                        onEditShortcut={setEditingShortcut}
                      />
                    ))}
                  </div>
                </div>

                {/* Section 2: Popular Websites Grid */}
                <div>
                  <div className="mb-3">
                    <p className="text-white font-medium text-sm">Popular Websites</p>
                    <p className="text-white/50 text-xs mt-1">
                      You can add more websites in Settings later
                    </p>
                  </div>

                  {/* PopularWebsitesGrid Component */}
                  <PopularWebsitesGrid
                    groupedWebsites={groupedWebsites}
                    selectedWebsites={Array.from(selectedPopularSites)}
                    onToggleWebsite={handleTogglePopularWebsite}
                    loading={loadingPopularSites}
                    shortcuts={shortcuts}
                    onEditShortcut={setEditingShortcut}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center gap-3">
                {/* Back Button */}
                <button
                  onClick={onBack}
                  className="px-4 py-2 text-white/70 text-sm font-medium rounded-md hover:bg-white/10 transition-colors"
                >
                  Back
                </button>

                {/* Center: Do This Later */}
                <button
                  onClick={handleSkip}
                  className="px-4 py-2 text-white/50 text-xs font-medium hover:text-white/70 transition-colors"
                >
                  Do This Later
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shortcut Editor Modal */}
      {editingShortcut && (
        <ShortcutEditorModal
          moduleId={editingShortcut}
          currentShortcut={shortcuts[editingShortcut] || null}
          isOpen={!!editingShortcut}
          onClose={() => setEditingShortcut(null)}
          onSave={handleSaveShortcut}
        />
      )}
    </div>
  )
}

export default CustomizeScreen
