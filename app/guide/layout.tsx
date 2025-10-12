'use client'

import { useState } from 'react'
import { GuideSidebar } from '@/components/guide/guide-sidebar'
import { guideSections } from '@/lib/guide-data'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Top navigation bar - Back to Website */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/logos/logo1_top_left.svg"
              alt="Berri Logo"
              className="size-8 rounded-lg"
            />
            <span className="text-xl font-bold hidden sm:inline">Berri</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Back to Website</span>
                <Home className="size-4 sm:hidden" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

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
        fixed top-16 bottom-0 left-0 z-50 w-80 bg-card/95 border-r border-border/50 backdrop-blur-sm
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
      <div className="lg:ml-80 pt-16">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-16 z-30">
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

        {/* Page content */}
        <main className="min-h-screen pt-4">
          {children}
        </main>
      </div>
    </div>
  )
}