'use client'

import { useState, useMemo } from 'react'
import { getAllPages, type GuidePage } from '@/lib/guide-data'
import { sendGAEvent } from '@/lib/analytics/ga4'
import Link from 'next/link'

export function GuideSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const allPages = useMemo(() => getAllPages(), [])

  const results = useMemo(() => {
    if (!query || query.length < 2) return []

    const lowerQuery = query.toLowerCase()

    return allPages
      .map(page => {
        const titleMatch = page.title.toLowerCase().includes(lowerQuery)
        const descMatch = page.description.toLowerCase().includes(lowerQuery)
        const contentMatch = page.content.toLowerCase().includes(lowerQuery)

        // Score: title match = 3pts, description = 2pts, content = 1pt
        const score = (titleMatch ? 3 : 0) + (descMatch ? 2 : 0) + (contentMatch ? 1 : 0)

        return { page, score, titleMatch, descMatch }
      })
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5) // Top 5 results
  }, [query, allPages])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setIsOpen(newQuery.length >= 2)

    if (newQuery.length >= 2) {
      sendGAEvent('guide_search', {
        search_term: newQuery,
        result_count: results.length
      })
    }
  }

  const handleResultClick = (page: GuidePage) => {
    setIsOpen(false)
    setQuery('')

    sendGAEvent('guide_search_click', {
      search_term: query,
      page_slug: page.slug,
      page_title: page.title
    })
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search guides..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <ul className="max-h-96 overflow-y-auto py-2">
            {results.map(({ page, titleMatch, descMatch }) => (
              <li key={page.id}>
                <Link
                  href={`/guide/${page.category}/${page.slug}`}
                  onClick={() => handleResultClick(page)}
                  className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${titleMatch ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {page.title}
                      </p>
                      <p className={`mt-1 text-xs ${descMatch ? 'text-blue-500 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                        {page.description}
                      </p>
                    </div>
                    <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">
                      {page.readingTime} min
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && results.length === 0 && query.length >= 2 && (
        <div className="absolute z-50 mt-2 w-full rounded-md border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No results found for &quot;{query}&quot;
          </p>
        </div>
      )}
    </div>
  )
}
