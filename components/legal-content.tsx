'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface LegalContentProps {
  content: string
}

export function LegalContent({ content }: LegalContentProps) {
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: React.ReactElement[] = []
    let currentList: string[] = []
    let currentKey = 0

    const processInlineFormatting = (text: string): React.ReactNode => {
      // Handle links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      const parts: React.ReactNode[] = []
      let lastIndex = 0
      let match

      while ((match = linkRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(processBoldText(text.slice(lastIndex, match.index)))
        }
        parts.push(
          <a
            key={`link-${match.index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {match[1]}
          </a>
        )
        lastIndex = match.index + match[0].length
      }

      if (lastIndex < text.length) {
        parts.push(processBoldText(text.slice(lastIndex)))
      }

      return parts.length > 0 ? parts : processBoldText(text)
    }

    const processBoldText = (text: string): React.ReactNode => {
      if (!text.includes('**')) {
        return text
      }

      const parts = text.split('**')
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          return <strong key={index} className="font-semibold text-foreground">{part}</strong>
        }
        return part
      })
    }

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${currentKey++}`} className="list-disc list-inside space-y-2 my-4 ml-4">
            {currentList.map((item, index) => (
              <li key={index} className="text-muted-foreground">
                <span className="text-foreground">{processInlineFormatting(item.replace(/^[-•]\s*/, ''))}</span>
              </li>
            ))}
          </ul>
        )
        currentList = []
      }
    }

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()

      if (!trimmedLine) {
        flushList()
        return
      }

      // Horizontal rule
      if (trimmedLine === '---') {
        flushList()
        elements.push(<hr key={`hr-${index}`} className="my-8 border-border" />)
        return
      }

      // Headers
      if (trimmedLine.startsWith('### ')) {
        flushList()
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold mt-8 mb-4 text-foreground">
            {processInlineFormatting(trimmedLine.substring(4))}
          </h3>
        )
      } else if (trimmedLine.startsWith('## ')) {
        flushList()
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold mt-10 mb-6 text-foreground border-b border-border pb-2">
            {processInlineFormatting(trimmedLine.substring(3))}
          </h2>
        )
      } else if (trimmedLine.startsWith('# ')) {
        flushList()
        elements.push(
          <h1 key={`h1-${index}`} className="text-3xl font-bold mb-6 text-foreground">
            {processInlineFormatting(trimmedLine.substring(2))}
          </h1>
        )
      }
      // Lists (- or bullet points)
      else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ')) {
        currentList.push(trimmedLine)
      }
      // Checkmarks and X marks (legal document style)
      else if (trimmedLine.startsWith('✅') || trimmedLine.startsWith('❌')) {
        flushList()
        elements.push(
          <p key={`check-${index}`} className="mb-2 text-foreground flex items-start gap-2">
            <span className="flex-shrink-0">{trimmedLine.charAt(0)}</span>
            <span>{processInlineFormatting(trimmedLine.substring(2).trim())}</span>
          </p>
        )
      }
      // Lettered items like (a), (b), etc.
      else if (/^\([a-z]\)/.test(trimmedLine)) {
        flushList()
        elements.push(
          <p key={`letter-${index}`} className="mb-3 text-muted-foreground ml-4">
            {processInlineFormatting(trimmedLine)}
          </p>
        )
      }
      // Regular paragraphs
      else {
        flushList()
        elements.push(
          <p key={`p-${index}`} className="mb-4 text-muted-foreground leading-relaxed">
            {processInlineFormatting(trimmedLine)}
          </p>
        )
      }
    })

    flushList()
    return elements
  }

  return (
    <article className="max-w-none">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Content */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        {renderContent(content)}
      </div>
    </article>
  )
}
