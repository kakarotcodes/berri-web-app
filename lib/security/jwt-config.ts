import crypto from 'crypto'

/**
 * Secure JWT Secret Management
 * 
 * This module handles JWT secret generation and management in a secure way:
 * - Runtime generation for development
 * - External secret management for production
 * - Never stores secrets in version control
 */

class JWTSecretManager {
  private static instance: JWTSecretManager
  private secret: string | null = null

  private constructor() {}

  static getInstance(): JWTSecretManager {
    if (!JWTSecretManager.instance) {
      JWTSecretManager.instance = new JWTSecretManager()
    }
    return JWTSecretManager.instance
  }

  /**
   * Get JWT secret with secure fallback generation
   * Priority order:
   * 1. Production secret from external secret manager
   * 2. Environment variable (staging)
   * 3. Runtime-generated secure secret (development)
   */
  getSecret(): string {
    // Return cached secret if available
    if (this.secret) {
      return this.secret
    }

    // 1. Try external secret manager (production)
    if (process.env.NODE_ENV === 'production') {
      const externalSecret = this.getExternalSecret()
      if (externalSecret) {
        this.secret = externalSecret
        return this.secret
      }
    }

    // 2. Try environment variable (staging/testing)
    if (process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 64) {
      this.secret = process.env.JWT_SECRET
      return this.secret
    }

    // 3. Generate runtime secret (development)
    console.warn('⚠️  JWT_SECRET not found in environment, generating runtime secret for development')
    console.warn('⚠️  This secret will change on each restart - not suitable for production!')
    
    this.secret = this.generateSecureSecret()
    return this.secret
  }

  /**
   * Generate cryptographically secure secret
   */
  private generateSecureSecret(): string {
    return crypto.randomBytes(64).toString('hex')
  }

  /**
   * Get secret from external secret management service
   * This would integrate with AWS Secrets Manager, Azure Key Vault, etc.
   */
  private getExternalSecret(): string | null {
    // TODO: Implement external secret fetching for production
    // Example: AWS Secrets Manager
    // const secretArn = process.env.JWT_SECRET_ARN
    // if (secretArn) {
    //   return await secretsManager.getSecretValue({ SecretId: secretArn })
    // }
    
    return null
  }

  /**
   * Validate that secret is cryptographically secure
   */
  private isSecureSecret(secret: string): boolean {
    // Minimum 64 characters (256 bits)
    if (secret.length < 64) {
      return false
    }

    // Check for basic entropy (not all same character)
    const uniqueChars = new Set(secret).size
    if (uniqueChars < 10) {
      return false
    }

    return true
  }
}

// Export singleton instance
export const jwtSecretManager = JWTSecretManager.getInstance()

// Export convenience function
export function getJWTSecret(): string {
  return jwtSecretManager.getSecret()
}