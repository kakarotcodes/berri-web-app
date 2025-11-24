/**
 * Freemium Feature Limits - Single Source of Truth
 *
 * This file defines all feature limits for different plan types.
 * Import this in both main and renderer processes to ensure consistency.
 *
 * IMPORTANT: This is the ONLY place where limit numbers should be defined.
 * Do not hard-code limits anywhere else in the codebase.
 */

/**
 * Plan types supported by the app
 *
 * Note: "free" is the default state when no license exists or license is invalid
 */
export type PlanType = 'free' | 'lifetime' | 'pro' | 'monthly' | 'yearly' | 'enterprise'

/**
 * Feature limits for each plan type
 */
export interface PlanLimits {
  /** Maximum number of modules that can be pinned/visible in the pill */
  maxPinnedModules: number

  /** Maximum number of custom websites that can be added to the pill */
  maxWebsites: number

  /** Whether incognito mode is available */
  incognitoMode: boolean
}

/**
 * Complete feature limits matrix
 *
 * Free tier: Basic functionality with restrictions
 * Paid tiers: Full functionality with higher limits
 */
export const FEATURE_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    maxPinnedModules: 5,
    maxWebsites: 1,
    incognitoMode: false
  },
  lifetime: {
    maxPinnedModules: 12,
    maxWebsites: 12,
    incognitoMode: true
  },
  pro: {
    maxPinnedModules: 12,
    maxWebsites: 12,
    incognitoMode: true
  },
  monthly: {
    maxPinnedModules: 12,
    maxWebsites: 12,
    incognitoMode: true
  },
  yearly: {
    maxPinnedModules: 12,
    maxWebsites: 12,
    incognitoMode: true
  },
  enterprise: {
    maxPinnedModules: 20,
    maxWebsites: 20,
    incognitoMode: true
  }
}

/**
 * Helper to get plan type from license info
 *
 * Handles edge cases:
 * - No license info → free
 * - Invalid plan type → free
 * - Expired license → free (defensive)
 *
 * @param licenseInfo - License information from LicenseManager
 * @returns Plan type (defaults to 'free' for safety)
 */
export function getPlanType(licenseInfo: { planType?: string } | null | undefined): PlanType {
  // No license info → free tier
  if (!licenseInfo) {
    return 'free'
  }

  // Extract plan type
  const { planType } = licenseInfo

  // Validate it's a known plan type
  if (planType && planType in FEATURE_LIMITS) {
    return planType as PlanType
  }

  // Unknown plan type → treat as free (defensive)
  console.warn('[FREEMIUM] Unknown plan type:', planType, '→ defaulting to free')
  return 'free'
}

/**
 * Helper to get limits for a given license info
 *
 * @param licenseInfo - License information from LicenseManager
 * @returns Feature limits for the user's plan
 */
export function getLimitsForLicense(
  licenseInfo: { planType?: string } | null | undefined
): PlanLimits {
  const planType = getPlanType(licenseInfo)
  return FEATURE_LIMITS[planType]
}

/**
 * Helper to check if a plan is paid (not free)
 *
 * @param licenseInfo - License information from LicenseManager
 * @returns true if user has any paid plan
 */
export function isPaidPlan(licenseInfo: { planType?: string } | null | undefined): boolean {
  return getPlanType(licenseInfo) !== 'free'
}

/**
 * Helper to get display name for a plan type
 *
 * @param planType - Plan type
 * @returns Human-readable plan name
 */
export function getPlanDisplayName(planType: PlanType): string {
  const names: Record<PlanType, string> = {
    free: 'Berri Free',
    lifetime: 'Berri Lifetime',
    pro: 'Berri Pro',
    monthly: 'Berri Pro (Monthly)',
    yearly: 'Berri Pro (Yearly)',
    enterprise: 'Berri Enterprise'
  }
  return names[planType]
}
