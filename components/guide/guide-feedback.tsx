'use client'

import { useState } from 'react'
import { sendGAEvent } from '@/lib/analytics/ga4'

interface GuideFeedbackProps {
  pageSlug: string
  pageTitle: string
}

export function GuideFeedback({ pageSlug, pageTitle }: GuideFeedbackProps) {
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null)

  const handleFeedback = (helpful: boolean) => {
    setIsHelpful(helpful)

    // Track in GA4
    sendGAEvent('guide_feedback', {
      page_slug: pageSlug,
      helpful: helpful,
      page_title: pageTitle
    })
  }

  const reportIssueUrl = `https://github.com/saif-at-github/berri-web-app/issues/new?template=doc-issue&title=Guide%20Issue:%20${encodeURIComponent(pageTitle)}&labels=documentation&body=${encodeURIComponent(`**Page:** ${pageTitle} (${pageSlug})\n**Issue:**\n\n**Expected:**\n\n**Actual:**\n`)}`

  return (
    <div className="mt-12 border-t pt-8 dark:border-gray-700">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          Was this page helpful?
        </p>
        <div className="mt-3 flex justify-center gap-4">
          <button
            onClick={() => handleFeedback(true)}
            disabled={isHelpful !== null}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              isHelpful === true
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50'
            }`}
          >
            👍 Yes
          </button>
          <button
            onClick={() => handleFeedback(false)}
            disabled={isHelpful !== null}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              isHelpful === false
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50'
            }`}
          >
            👎 No
          </button>
        </div>

        {isHelpful !== null && (
          <div className="mt-4">
            {isHelpful ? (
              <p className="text-sm text-green-600 dark:text-green-400">
                Thanks for your feedback!
              </p>
            ) : (
              <div className="text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                  Sorry to hear that. Please help us improve:
                </p>
                <a
                  href={reportIssueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Report an issue with this page →
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
