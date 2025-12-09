import { Metadata } from 'next'
import fs from 'fs'
import path from 'path'
import { LegalContent } from '@/components/legal-content'

export const metadata: Metadata = {
  title: 'Privacy Policy - Berri',
  description: 'Privacy Policy for Berri desktop application for macOS',
}

export default function PrivacyPage() {
  const filePath = path.join(process.cwd(), 'PRIVACY_POLICY.md')
  const content = fs.readFileSync(filePath, 'utf-8')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <LegalContent content={content} />
      </div>
    </div>
  )
}
