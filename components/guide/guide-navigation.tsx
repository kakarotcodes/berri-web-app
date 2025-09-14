import Link from 'next/link'
import { ChevronLeft, ChevronRight, SkipForward } from 'lucide-react'
import { GuideNavigation as GuideNavigationType } from '@/lib/guide-data'
import { Button } from '@/components/ui/button'

interface GuideNavigationProps {
  navigation: GuideNavigationType
}

export function GuideNavigation({ navigation }: GuideNavigationProps) {
  const { current, previous, next } = navigation

  return (
    <div className="border-t border-border pt-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Section Progress</span>
          <span>{navigation.section.title}</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${(navigation.section.pages.findIndex(p => p.slug === current.slug) + 1) / navigation.section.pages.length * 100}%`
            }}
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {previous ? (
            <Link href={`/guide/${previous.category}/${previous.slug}`}>
              <Button variant="outline" className="group">
                <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="font-medium">{previous.title}</div>
                </div>
              </Button>
            </Link>
          ) : (
            <div className="w-32" />
          )}
        </div>

        {/* Quick jump to modules */}
        {current.category !== 'feature-modules' && (
          <div className="mx-4">
            <Link href="/guide/feature-modules/notes">
              <Button variant="ghost" size="sm" className="text-xs">
                <SkipForward className="h-3 w-3 mr-1" />
                Skip to Modules
              </Button>
            </Link>
          </div>
        )}

        <div className="flex-1 flex justify-end">
          {next ? (
            <Link href={`/guide/${next.category}/${next.slug}`}>
              <Button className="group">
                <div className="text-right">
                  <div className="text-xs opacity-90">Next</div>
                  <div className="font-medium">{next.title}</div>
                </div>
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-2">
                <div className="text-2xl">🎉</div>
              </div>
              <div className="text-sm font-medium text-foreground">Guide Complete!</div>
              <div className="text-xs text-muted-foreground">You've mastered Berri</div>
            </div>
          )}
        </div>
      </div>

      {/* Page context */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="text-xs text-muted-foreground text-center space-x-4">
          <span>Reading time: {current.readingTime} minutes</span>
          <span>•</span>
          <span>
            Page {navigation.section.pages.findIndex(p => p.slug === current.slug) + 1} of {navigation.section.pages.length} in this section
          </span>
        </div>
      </div>
    </div>
  )
}