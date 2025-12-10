import { Metadata } from 'next'
import { LegalContent } from '@/components/legal-content'
import content from '@/PRIVACY_POLICY.md'

export const metadata: Metadata = {
  title: 'Privacy Policy - Berri',
  description: 'Privacy Policy for Berri desktop application for macOS',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LegalContent content={content} />
      </div>
    </div>
  )
}
