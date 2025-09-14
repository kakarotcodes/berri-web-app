'use client'

import { useState } from 'react'
import { GuideSidebar } from '@/components/guide/guide-sidebar'
import { guideSections } from '@/lib/guide-data'

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-20 bottom-0 left-0 z-50 w-80 bg-card/95 border-r border-border/50 backdrop-blur-sm
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <GuideSidebar
          sections={guideSections}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div className="lg:ml-80">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Open sidebar"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Berri Guide</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Page content - add top padding to account for fixed header */}
        <main className="min-h-screen pt-20">
          {children}
        </main>
      </div>
    </div>
  )
}