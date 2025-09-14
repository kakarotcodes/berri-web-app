import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { GuideSection, GuidePage } from '@/lib/guide-data'

interface GuideBreadcrumbProps {
  section: GuideSection
  page: GuidePage
}

export function GuideBreadcrumb({ section, page }: GuideBreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>

      <ChevronRight className="h-4 w-4" />

      <Link
        href="/guide"
        className="hover:text-foreground transition-colors"
      >
        Guide
      </Link>

      <ChevronRight className="h-4 w-4" />

      <span className="text-foreground font-medium">
        {section.title}
      </span>

      <ChevronRight className="h-4 w-4" />

      <span className="text-foreground">
        {page.title}
      </span>
    </nav>
  )
}