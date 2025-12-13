'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, ChevronRight, Search, X } from 'lucide-react'
import { GuideSection, GuidePage, getAllPages } from '@/lib/guide-data'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GuideSidebarProps {
  sections: GuideSection[]
  onClose?: () => void
}

export function GuideSidebar({ sections, onClose }: GuideSidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['getting-started']))
  const [completedPages, setCompletedPages] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPages, setFilteredPages] = useState<GuidePage[]>([])

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('berri-guide-progress')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setCompletedPages(new Set(data.completed || []))
        setExpandedSections(new Set(data.expanded || ['getting-started']))
      } catch {
        // Failed to load guide progress - use defaults
      }
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    const data = {
      completed: Array.from(completedPages),
      expanded: Array.from(expandedSections)
    }
    localStorage.setItem('berri-guide-progress', JSON.stringify(data))
  }, [completedPages, expandedSections])

  // Mark current page as visited
  useEffect(() => {
    const currentPath = pathname.replace('/guide/', '')
    if (currentPath && currentPath !== pathname) {
      setCompletedPages(prev => new Set(prev).add(currentPath))
    }
  }, [pathname])

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      const allPages = getAllPages()
      const filtered = allPages.filter(page =>
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredPages(filtered)
    } else {
      setFilteredPages([])
    }
  }, [searchQuery])

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const isPageCompleted = (page: GuidePage) => {
    return completedPages.has(`${page.category}/${page.slug}`)
  }

  const isPageCurrent = (page: GuidePage) => {
    return pathname === `/guide/${page.category}/${page.slug}`
  }

  const getSectionProgress = (section: GuideSection) => {
    const completedCount = section.pages.filter(isPageCompleted).length
    return { completed: completedCount, total: section.pages.length }
  }

  const totalProgress = () => {
    const allPages = getAllPages()
    const completedCount = allPages.filter(isPageCompleted).length
    return { completed: completedCount, total: allPages.length }
  }

  const progress = totalProgress()
  const progressPercent = Math.round((progress.completed / progress.total) * 100)

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Berri Guide</h2>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{progress.completed} of {progress.total}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {progressPercent}% complete
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search guide..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {searchQuery ? (
          /* Search results */
          <div className="p-3">
            <div className="text-sm text-muted-foreground mb-3">
              {filteredPages.length} result{filteredPages.length !== 1 ? 's' : ''}
            </div>
            {filteredPages.map((page) => (
              <Link
                key={`${page.category}/${page.slug}`}
                href={`/guide/${page.category}/${page.slug}`}
                onClick={onClose}
                className={cn(
                  'block p-3 rounded-md text-sm hover:bg-accent transition-colors',
                  isPageCurrent(page) && 'bg-accent text-accent-foreground'
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'w-2 h-2 rounded-full flex-shrink-0',
                    isPageCompleted(page) ? 'bg-green-500' : 'bg-muted'
                  )} />
                  <div>
                    <div className="font-medium">{page.title}</div>
                    <div className="text-xs text-muted-foreground">{page.description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Section navigation */
          <nav className="p-3 space-y-2">
            {sections.map((section) => {
              const isExpanded = expandedSections.has(section.id)
              const sectionProgress = getSectionProgress(section)

              return (
                <div key={section.id}>
                  {/* Section header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-3 text-left rounded-md hover:bg-accent transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="font-medium text-sm">{section.title}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-muted-foreground">
                        {sectionProgress.completed}/{sectionProgress.total}
                      </div>
                      <div className={cn(
                        'w-2 h-2 rounded-full',
                        sectionProgress.completed === sectionProgress.total
                          ? 'bg-green-500'
                          : sectionProgress.completed > 0
                          ? 'bg-yellow-500'
                          : 'bg-muted'
                      )} />
                    </div>
                  </button>

                  {/* Section pages */}
                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {section.pages.map((page) => (
                        <Link
                          key={`${page.category}/${page.slug}`}
                          href={`/guide/${page.category}/${page.slug}`}
                          onClick={onClose}
                          className={cn(
                            'block p-2 rounded-md text-sm hover:bg-accent transition-colors',
                            isPageCurrent(page) && 'bg-accent text-accent-foreground font-medium'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              'w-1.5 h-1.5 rounded-full flex-shrink-0',
                              isPageCompleted(page) ? 'bg-green-500' :
                              isPageCurrent(page) ? 'bg-primary' : 'bg-muted'
                            )} />
                            <span>{page.title}</span>
                            <span className="text-xs text-muted-foreground ml-auto">
                              {page.readingTime}m
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <div className="text-xs text-muted-foreground text-center">
          Complete the guide to master Berri
        </div>
      </div>
    </div>
  )
}