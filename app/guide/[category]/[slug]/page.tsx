import { notFound } from 'next/navigation'
import { getPageBySlug, getNavigationForPage } from '@/lib/guide-data'
import { GuideContent } from '@/components/guide/guide-content'
import { GuideNavigation } from '@/components/guide/guide-navigation'
import { GuideBreadcrumb } from '@/components/guide/guide-breadcrumb'

interface GuidePageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { category, slug } = await params
  const page = getPageBySlug(category, slug)
  const navigation = getNavigationForPage(category, slug)

  if (!page || !navigation) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <GuideBreadcrumb
        section={navigation.section}
        page={page}
      />

      {/* Main content */}
      <div className="mt-6">
        <GuideContent page={page} />
      </div>

      {/* Navigation */}
      <div className="mt-12">
        <GuideNavigation navigation={navigation} />
      </div>
    </div>
  )
}

// Generate static params for all guide pages
export async function generateStaticParams() {
  const { guideSections } = await import('@/lib/guide-data')
  const params: { category: string; slug: string }[] = []

  guideSections.forEach(section => {
    section.pages.forEach(page => {
      params.push({
        category: page.category,
        slug: page.slug
      })
    })
  })

  return params
}

// Generate metadata for each page
export async function generateMetadata({ params }: GuidePageProps) {
  const { category, slug } = await params
  const page = getPageBySlug(category, slug)

  if (!page) {
    return {
      title: 'Page Not Found - Berri Guide'
    }
  }

  return {
    title: `${page.title} - Berri Guide`,
    description: page.description,
  }
}