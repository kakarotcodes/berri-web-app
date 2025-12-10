import { Metadata } from 'next'
import { LegalContent } from '@/components/legal-content'
import content from '@/TERMS_AND_CONDITIONS.md'

export const metadata: Metadata = {
  title: 'Terms and Conditions - Berri',
  description: 'Terms and Conditions for Berri desktop application for macOS',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LegalContent content={content} />
      </div>
    </div>
  )
}
