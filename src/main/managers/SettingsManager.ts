import { BrowserWindow, ipcMain, app } from 'electron'
import Store from 'electron-store'
import type { PillCustomization, PillConfigResult } from '../../types/pillConfig'
import { validatePillConfig, getDefaultPillConfig } from './PillConfigValidator'
import { IPCValidator } from '../security/ipcValidator'
import type { ILicenseManager } from './LicenseManager'
import { getLimitsForLicense, getPlanType } from '../../shared/freemiumLimits'

/**
 * Shortcut configuration interface (v2)
 *
 * MIGRATION NOTE: Version 2 changed modules from position-based (1-5) to module-centric.
 * Old format: { modules: { "1": "fileExplorer", "2": "clipboard", ... } }
 * New format: { modules: { "fileExplorer": "CommandOrControl+1", "clipboard": "CommandOrControl+2", ... } }
 */
export interface ShortcutsConfig {
  version: number // Schema version for migrations
  toggle: string // App visibility toggle
  snip: string // Snipping tool
  collapse: string // Collapse to pill
  modules: Record<string, string | null> // Module ID -> accelerator mapping (null = no shortcut)
}

/**
 * Interface for SettingsManager
 * Manages application settings and preferences
 */
export interface ISettingsManager {
  getStore(): Store
  applyCommandLineSwitches(): void
  setupIpcHandlers(
    mainWindow: BrowserWindow,
    ipcValidator: IPCValidator,
    licenseManager: ILicenseManager,
    onShortcutsChanged?: () => void
  ): void
  applyAutoStartSetting(): void
  getIncognitoMode(): boolean
  applyIncognitoMode(mainWindow: BrowserWindow): void
  getShortcutsConfig(): ShortcutsConfig
  setShortcutsConfig(config: ShortcutsConfig): void
  getPillConfig(): PillCustomization
  setPillConfig(config: PillCustomization): PillConfigResult
}

/**
 * SettingsManager
 * Handles all application settings including:
 * - Settings store initialization
 * - Command line switches based on settings
 * - Incognito mode (content protection)
 * - Auto-start at login
 * - IPC handlers for settings changes
 */
export class SettingsManager implements ISettingsManager {
  private store: Store
  private isIncognitoMode: boolean
  private isAutoStartEnabled: boolean
  private mainWindow: BrowserWindow | null = null
  private onShortcutsChanged?: () => void
  private licenseManager: ILicenseManager | null = null

  constructor() {
    // Initialize settings store early (needed for app-level configuration)
    this.store = new Store()

    // Get incognito mode setting (default: true = hidden from screen sharing)
    this.isIncognitoMode = this.store.get('incognitoMode', true) as boolean

    // Get auto-start setting (default: true = start at login)
    this.isAutoStartEnabled = this.store.get('autoStart', true) as boolean
  }

  /**
   * Get the settings store instance
   */
  public getStore(): Store {
    return this.store
  }

  /**
   * Apply command line switches based on settings
   * Must be called BEFORE app.ready()
   */
  public applyCommandLineSwitches(): void {
    // 🔒 CRITICAL FIX: Guard against undefined app during early module loading
    if (!app || !app.commandLine) {
      console.error('[SETTINGS] Cannot apply command line switches - app not ready yet')
      return
    }

    // ✅ SECURITY: Sandbox enabled for all processes
    // OAuth authentication happens via shell.openExternal() in the user's default browser,
    // so Electron sandbox doesn't interfere with OAuth flows.
    // Both main window and WebViews have sandbox: true in their webPreferences.
    console.log('[SECURITY] Running with sandbox enabled (all processes sandboxed)')

    // Disable Chromium automation detection
    app.commandLine.appendSwitch('--disable-blink-features', 'AutomationControlled')
    app.commandLine.appendSwitch('--disable-automation')
    app.commandLine.appendSwitch('--disable-dev-shm-usage')

    // GPU flags: Gate behind settings with safe defaults (all false)
    // These flags can reduce stability, break composition, or degrade perf on some systems
    // Only enable if user explicitly opts in for debugging/workarounds
    const disableViz = this.store.get('gpu.disableVizCompositor', false) as boolean
    const disableWorkarounds = this.store.get('gpu.disableWorkarounds', false) as boolean
    const disableSoftwareRasterizer = this.store.get('gpu.disableSoftwareRasterizer', false) as boolean

    // Log GPU flags configuration for field debugging
    console.log('[GPU] Configuration:', {
      disableVizCompositor: disableViz,
      disableWorkarounds: disableWorkarounds,
      disableSoftwareRasterizer: disableSoftwareRasterizer
    })

    if (disableViz) {
      app.commandLine.appendSwitch('--disable-features', 'VizDisplayCompositor')
      console.log('[GPU] Applied: --disable-features=VizDisplayCompositor')
    }
    if (disableWorkarounds) {
      app.commandLine.appendSwitch('disable-gpu-driver-bug-workarounds')
      console.log('[GPU] Applied: disable-gpu-driver-bug-workarounds')
    }
    if (disableSoftwareRasterizer) {
      app.commandLine.appendSwitch('disable-software-rasterizer')
      console.log('[GPU] Applied: disable-software-rasterizer')
    }
  }

  /**
   * Apply auto-start setting to system login items
   * Should be called after app.ready()
   */
  public applyAutoStartSetting(): void {
    app.setLoginItemSettings({
      openAtLogin: this.isAutoStartEnabled,
      openAsHidden: true // Start minimized/hidden when auto-starting
    })
  }

  /**
   * Get current incognito mode status
   */
  public getIncognitoMode(): boolean {
    return this.isIncognitoMode
  }

  /**
   * Apply incognito mode to a window
   */
  public applyIncognitoMode(mainWindow: BrowserWindow): void {
    mainWindow.setContentProtection(this.isIncognitoMode)
  }

  /**
   * Get keyboard shortcuts configuration with safe defaults
   * Automatically migrates from v1 (position-based) to v2 (module-centric) if needed
   */
  public getShortcutsConfig(): ShortcutsConfig {
    // Get stored config (might be v1 or v2)
    const stored = this.store.get('shortcuts') as unknown

    // Migrate if needed
    const config = this.migrateShortcutsConfig(stored)

    // Save migrated config back to store if migration happened
    // Save if: no stored config, OR stored config is not v2
    const isV2 =
      typeof stored === 'object' && stored !== null && 'version' in stored && stored.version === 2
    if (!isV2) {
      this.store.set('shortcuts', config)
      console.log('[SHORTCUTS] Migrated shortcuts config to v2')
    }

    return config
  }

  /**
   * Migrate shortcuts configuration from v1 to v2
   * v1: position-based modules { "1": "fileExplorer", ... }
   * v2: module-centric modules { "fileExplorer": "CommandOrControl+1", ... }
   */
  private migrateShortcutsConfig(stored: unknown): ShortcutsConfig {
    // Type guard for stored config
    const isStoredObject = (value: unknown): value is Record<string, unknown> => {
      return typeof value === 'object' && value !== null
    }

    // Check if already v2
    if (isStoredObject(stored) && stored.version === 2) {
      return stored as unknown as ShortcutsConfig
    }

    // Default v2 config - Clean slate approach
    // Only system shortcuts (toggle, collapse) are assigned by default
    // Module shortcuts are null and get assigned during onboarding based on user selection
    const defaultConfig: ShortcutsConfig = {
      version: 2,
      toggle: 'Control+E', // System shortcut - always registered
      snip: null, // No default - assigned if user selects snipping tool
      collapse: 'CommandOrControl+Escape', // System shortcut - always registered
      modules: {
        fileExplorer: null,
        clipboard: null,
        webview: null,
        snippingTool: null,
        notes: null,
        googleMeet: null,
        screenCapture: null,
        settings: null
      }
    }

    // If no stored config, return defaults
    if (!isStoredObject(stored)) {
      return defaultConfig
    }

    // Migrate from v1: Convert position-based to module-based
    const migratedModules: Record<string, string | null> = {
      ...defaultConfig.modules
    }

    // If old format exists: { modules: { "1": "fileExplorer", "2": "clipboard", ... } }
    if (stored.modules && typeof stored.modules === 'object' && stored.modules !== null) {
      const oldModules = stored.modules as Record<string, unknown>

      // Check if it's the old position-based format (keys are numbers)
      const isOldFormat = Object.keys(oldModules).some((key) => /^\d+$/.test(key))

      if (isOldFormat) {
        // Convert: { "1": "fileExplorer" } → { "fileExplorer": "Control+1" }
        for (const [position, moduleId] of Object.entries(oldModules)) {
          if (
            typeof moduleId === 'string' &&
            Object.prototype.hasOwnProperty.call(migratedModules, moduleId) &&
            /^\d+$/.test(position)
          ) {
            migratedModules[moduleId] = `Control+${position}`
          }
        }
      } else {
        // Already module-based but no version (edge case)
        Object.assign(migratedModules, oldModules)
      }
    }

    return {
      version: 2,
      toggle: typeof stored.toggle === 'string' ? stored.toggle : defaultConfig.toggle,
      snip: typeof stored.snip === 'string' ? stored.snip : defaultConfig.snip,
      collapse: typeof stored.collapse === 'string' ? stored.collapse : defaultConfig.collapse,
      modules: migratedModules
    }
  }

  /**
   * Set keyboard shortcuts configuration
   * Saves to persistent storage
   *
   * @param config - New shortcuts configuration to save
   */
  public setShortcutsConfig(config: ShortcutsConfig): void {
    this.store.set('shortcuts', config)
    console.log('[SHORTCUTS] Shortcuts config saved')
  }

  /**
   * Get pill customization configuration
   * Returns validated config or default if not set/invalid
   */
  public getPillConfig(): PillCustomization {
    const stored = this.store.get('pillConfig')

    if (!stored) {
      // First time - generate and save default config
      const defaultConfig = getDefaultPillConfig()
      this.store.set('pillConfig', defaultConfig)
      return defaultConfig
    }

    // Validate and potentially migrate stored config
    return validatePillConfig(stored)
  }

  /**
   * Set pill customization configuration
   * Validates config before saving and notifies renderer of changes
   *
   * FREEMIUM: Server-side enforcement of license limits (prevents DevTools bypass)
   *
   * Strategy: Delta-based gating
   * - Allows downgraded users to keep existing over-limit configs
   * - Only blocks NET INCREASES beyond the limit
   * - Example: User downgrades from Pro (5 websites) to Free (1 website limit)
   *   - Can keep all 5 websites, reorder them, edit shortcuts
   *   - Cannot add a 6th website
   *
   * @param config - New pill configuration to save
   * @returns Result indicating success or error
   */
  public setPillConfig(config: PillCustomization): PillConfigResult {
    try {
      // FREEMIUM: Enforce license limits BEFORE saving (server-side validation)
      // This prevents bypass via DevTools: window.electronAPI.pillConfig.set({...})
      if (this.licenseManager) {
        const licenseInfo = this.licenseManager.getLicenseInfo()
        const limits = getLimitsForLicense(licenseInfo)
        const planType = getPlanType(licenseInfo)

        // Only enforce limits for free tier (paid tiers have higher limits)
        if (planType === 'free') {
          // Get previous config to implement delta-based gating
          const prevConfig = this.getPillConfig()

          // Calculate previous counts
          const prevWebsites = prevConfig.websites.length
          const prevVisibleModules = prevConfig.modules.filter((m) => m.visible).length

          // Calculate new counts
          const newWebsites = config.websites.length
          const newVisibleModules = config.modules.filter((m) => m.visible).length

          // Check for NET INCREASE in websites beyond limit
          if (newWebsites > prevWebsites && newWebsites > limits.maxWebsites) {
            console.warn(
              `[PILL_CONFIG] Free tier: cannot add websites (${prevWebsites} → ${newWebsites}, limit: ${limits.maxWebsites})`
            )
            return {
              success: false,
              error: `Free tier is limited to ${limits.maxWebsites} website${limits.maxWebsites === 1 ? '' : 's'}. Upgrade to add unlimited websites.`
            }
          }

          // Check for NET INCREASE in modules beyond limit
          if (
            newVisibleModules > prevVisibleModules &&
            newVisibleModules > limits.maxPinnedModules
          ) {
            console.warn(
              `[PILL_CONFIG] Free tier: cannot add modules (${prevVisibleModules} → ${newVisibleModules}, limit: ${limits.maxPinnedModules})`
            )
            return {
              success: false,
              error: `Free tier is limited to ${limits.maxPinnedModules} modules. Upgrade to add unlimited modules.`
            }
          }
        }
      }

      // Validate config before saving
      const validated = validatePillConfig(config)

      // Save to persistent storage
      this.store.set('pillConfig', validated)

      // Notify renderer of change (if main window exists)
      if (this.mainWindow && !this.mainWindow.isDestroyed()) {
        this.mainWindow.webContents.send('pill-config-changed', validated)
      }

      // CRITICAL FIX: Trigger shortcut re-registration when pill config changes
      // This ensures website shortcuts are registered immediately after being assigned
      // Without this, shortcuts only work after app restart
      if (this.onShortcutsChanged) {
        console.log('[PILL_CONFIG] Triggering shortcut re-registration after config change')
        this.onShortcutsChanged()
      }

      return { success: true }
    } catch (error) {
      console.error('[PILL_CONFIG] Failed to set config:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Setup IPC handlers for settings management
   * @param mainWindow - BrowserWindow instance
   * @param ipcValidator - IPC security validator
   * @param licenseManager - License manager for feature gating
   * @param onShortcutsChanged - Optional callback when shortcuts are updated (for re-registration)
   */
  public setupIpcHandlers(
    mainWindow: BrowserWindow,
    ipcValidator: IPCValidator,
    licenseManager: ILicenseManager,
    onShortcutsChanged?: () => void
  ): void {
    // Store main window reference for pill config notifications
    this.mainWindow = mainWindow

    // Store license manager reference for freemium enforcement
    this.licenseManager = licenseManager

    // Store shortcuts changed callback for pill config updates
    // This allows us to re-register shortcuts when website shortcuts change
    this.onShortcutsChanged = onShortcutsChanged

    // Pill configuration handlers
    ipcMain.handle('get-pill-config', (event) => {
      if (!ipcValidator.isValidSender(event)) {
        console.warn('[SECURITY] Unauthorized get-pill-config attempt')
        throw new Error('Unauthorized')
      }
      return this.getPillConfig()
    })

    ipcMain.handle('set-pill-config', (event, config: PillCustomization) => {
      if (!ipcValidator.isValidSender(event)) {
        console.warn('[SECURITY] Unauthorized set-pill-config attempt')
        throw new Error('Unauthorized')
      }
      return this.setPillConfig(config)
    })

    ipcMain.handle('get-shortcuts-config', (event) => {
      if (!ipcValidator.isValidSender(event)) {
        console.warn('[SECURITY] Unauthorized get-shortcuts-config attempt')
        throw new Error('Unauthorized')
      }
      return this.getShortcutsConfig()
    })

    // Update module shortcut
    ipcMain.handle(
      'update-module-shortcut',
      async (event, payload: { moduleId: string; newShortcut: string | null }) => {
        if (!ipcValidator.isValidSender(event)) {
          console.warn('[SECURITY] Unauthorized update-module-shortcut attempt')
          throw new Error('Unauthorized')
        }

        const config = this.getShortcutsConfig()
        config.modules[payload.moduleId] = payload.newShortcut
        this.setShortcutsConfig(config)

        // Trigger shortcut re-registration if callback provided
        if (onShortcutsChanged) {
          onShortcutsChanged()
        }

        return { success: true }
      }
    )

    // Update general shortcut (toggle, snip, collapse)
    ipcMain.handle(
      'update-general-shortcut',
      async (
        event,
        payload: { shortcutKey: 'toggle' | 'snip' | 'collapse'; newShortcut: string }
      ) => {
        if (!ipcValidator.isValidSender(event)) {
          console.warn('[SECURITY] Unauthorized update-general-shortcut attempt')
          throw new Error('Unauthorized')
        }

        const config = this.getShortcutsConfig()
        config[payload.shortcutKey] = payload.newShortcut
        this.setShortcutsConfig(config)

        // Trigger shortcut re-registration if callback provided
        if (onShortcutsChanged) {
          onShortcutsChanged()
        }

        return { success: true }
      }
    )

    // Validate shortcut
    ipcMain.handle(
      'validate-shortcut',
      async (
        event,
        payload: {
          accelerator: string
          moduleId: string | null
          generalShortcutKey?: 'toggle' | 'snip' | 'collapse'
        }
      ) => {
        if (!ipcValidator.isValidSender(event)) {
          console.warn('[SECURITY] Unauthorized validate-shortcut attempt')
          throw new Error('Unauthorized')
        }

        const { validateShortcut } = await import('../utils/shortcutValidation')
        const config = this.getShortcutsConfig()

        return validateShortcut(
          payload.accelerator,
          payload.moduleId,
          config,
          payload.generalShortcutKey
        )
      }
    )

    // Check shortcut availability at OS level
    ipcMain.handle('check-shortcut-availability', async (event, accelerator: string) => {
      if (!ipcValidator.isValidSender(event)) {
        console.warn('[SECURITY] Unauthorized check-shortcut-availability attempt')
        throw new Error('Unauthorized')
      }

      const { globalShortcut } = await import('electron')

      if (globalShortcut.isRegistered(accelerator)) {
        return { available: false, reason: 'Already registered' }
      }

      const testRegister = globalShortcut.register(accelerator, () => {})
      if (!testRegister) {
        return { available: false, reason: 'In use by another application' }
      }

      globalShortcut.unregister(accelerator)
      return { available: true }
    })

    // Incognito mode handlers
    ipcMain.on('toggle-incognito-mode', (event) => {
      if (!ipcValidator.isValidSender(event)) {
        console.warn('[SECURITY] Unauthorized toggle-incognito-mode attempt')
        return
      }

      // Check license - free tier users cannot enable incognito mode
      const licenseInfo = licenseManager.getLicenseInfo()
      if (!licenseInfo || licenseInfo.planType === 'free') {
        // Block free tier users from enabling incognito mode
        if (!this.isIncognitoMode) {
          console.log('[INCOGNITO] Free tier users cannot enable incognito mode')
          mainWindow.webContents.send('incognito-status-changed', {
            enabled: false,
            message: 'Incognito mode is a premium feature. Upgrade to unlock.',
            error: 'premium_feature_required'
          })
          return
        }
        // Allow disabling (though free tier should never have it enabled)
      }

      // Toggle the state
      this.isIncognitoMode = !this.isIncognitoMode

      // Save to persistent storage
      this.store.set('incognitoMode', this.isIncognitoMode)

      // Apply to current window
      mainWindow.setContentProtection(this.isIncognitoMode)

      // Send update to renderer
      mainWindow.webContents.send('incognito-status-changed', {
        enabled: this.isIncognitoMode,
        message: this.isIncognitoMode ? 'Hidden from screen sharing' : 'Visible in screen sharing'
      })
    })

    ipcMain.handle('get-incognito-status', (event) => {
      if (!ipcValidator.isValidSender(event)) {
        console.warn('[SECURITY] Unauthorized get-incognito-status attempt')
        throw new Error('Unauthorized')
      }
      return {
        enabled: this.isIncognitoMode,
        message: this.isIncognitoMode ? 'Hidden from screen sharing' : 'Visible in screen sharing'
      }
    })

    // Auto-start handlers
    ipcMain.on('toggle-auto-start', (event) => {
      if (!ipcValidator.isValidSender(event)) {
        console.warn('[SECURITY] Unauthorized toggle-auto-start attempt')
        return
      }

      // Toggle the state
      this.isAutoStartEnabled = !this.isAutoStartEnabled

      // Save to persistent storage
      this.store.set('autoStart', this.isAutoStartEnabled)

      // Apply to system login items
      app.setLoginItemSettings({
        openAtLogin: this.isAutoStartEnabled,
        openAsHidden: true
      })

      // Send update to renderer
      mainWindow.webContents.send('auto-start-status-changed', {
        enabled: this.isAutoStartEnabled,
        message: this.isAutoStartEnabled ? 'App will start at login' : 'App will not start at login'
      })
    })

    ipcMain.handle('get-auto-start-status', (event) => {
      if (!ipcValidator.isValidSender(event)) {
        console.warn('[SECURITY] Unauthorized get-auto-start-status attempt')
        throw new Error('Unauthorized')
      }
      return {
        enabled: this.isAutoStartEnabled,
        message: this.isAutoStartEnabled ? 'App will start at login' : 'App will not start at login'
      }
    })
  }
}
