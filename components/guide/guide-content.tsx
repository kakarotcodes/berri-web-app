'use client'

import { GuidePage } from '@/lib/guide-data'
import { Clock, BookOpen } from 'lucide-react'

interface GuideContentProps {
  page: GuidePage
}

export function GuideContent({ page }: GuideContentProps) {
  // Helper function to process bold text
  const processBoldText = (text: string) => {
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

  // Simple markdown-like content renderer
  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let currentList: string[] = []
    let currentKey = 0

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${currentKey++}`} className="list-disc list-inside space-y-2 my-4 ml-4">
            {currentList.map((item, index) => (
              <li key={index} className="text-muted-foreground">
                <span className="text-foreground">{processBoldText(item.substring(2))}</span>
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

      // Headers
      if (trimmedLine.startsWith('### ')) {
        flushList()
        elements.push(
          <h3 key={`h3-${index}`} className="text-xl font-semibold mt-8 mb-4 text-foreground">
            {processBoldText(trimmedLine.substring(4))}
          </h3>
        )
      } else if (trimmedLine.startsWith('## ')) {
        flushList()
        elements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-bold mt-10 mb-6 text-foreground border-b border-border pb-2">
            {processBoldText(trimmedLine.substring(3))}
          </h2>
        )
      } else if (trimmedLine.startsWith('# ')) {
        flushList()
        elements.push(
          <h1 key={`h1-${index}`} className="text-3xl font-bold mb-6 text-foreground">
            {processBoldText(trimmedLine.substring(2))}
          </h1>
        )
      }
      // Lists
      else if (trimmedLine.startsWith('- ')) {
        currentList.push(trimmedLine)
      }
      // Code blocks (backticks) - Handle keyboard shortcuts specially
      else if (trimmedLine.includes('`')) {
        flushList()
        const parts = trimmedLine.split('`')
        elements.push(
          <p key={`code-${index}`} className="mb-4 text-muted-foreground">
            {parts.map((part, partIndex) => {
              if (partIndex % 2 === 1) {
                // Check if this is a keyboard shortcut (contains "Control" or "Ctrl")
                if (part.includes('Control') || part.includes('Ctrl')) {
                  return (
                    <kbd key={partIndex} className="inline-flex items-center gap-1 px-2 py-1 bg-muted border border-border rounded text-xs font-mono text-foreground shadow-sm">
                      {part.replace('Control', '⌃').replace('Ctrl', '⌃')}
                    </kbd>
                  )
                }
                return (
                  <code key={partIndex} className="px-2 py-1 bg-muted rounded text-sm font-mono text-foreground">
                    {part}
                  </code>
                )
              }
              return processBoldText(part)
            })}
          </p>
        )
      }
      // Table detection (simple)
      else if (trimmedLine.includes('|') && trimmedLine.split('|').length > 2) {
        flushList()
        // This is a basic table row - in a real implementation you'd want proper table parsing
        const cells = trimmedLine.split('|').map(cell => cell.trim()).filter(cell => cell)

        if (cells[0] === 'Shortcut' || cells.every(cell => cell.includes('-'))) {
          // Skip header separator or add table header
          return
        }

        elements.push(
          <div key={`table-${index}`} className="grid grid-cols-3 gap-4 py-2 border-b border-border/30 text-sm">
            {cells.map((cell, cellIndex) => (
              <div key={cellIndex} className={cellIndex === 0 ? 'font-mono text-foreground' : 'text-muted-foreground'}>
                {processBoldText(cell.replace(/`/g, ''))}
              </div>
            ))}
          </div>
        )
      }
      // Regular paragraphs
      else {
        flushList()
        elements.push(
          <p key={`p-${index}`} className="mb-4 text-muted-foreground leading-relaxed">
            {processBoldText(trimmedLine)}
          </p>
        )
      }
    })

    flushList()
    return elements
  }

  return (
    <article className="max-w-none">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {page.title}
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          {page.description}
        </p>

        {/* Page metadata */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{page.readingTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Guide</span>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <div className="space-y-4">
          {renderContent(page.content)}
        </div>
      </div>

      {/* Helpful tips section */}
      <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border/50">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <BookOpen className="h-3 w-3 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground">
              Use the navigation arrows below to move between sections, or use the sidebar to jump to any specific topic.
              Your progress is automatically saved as you read through the guide.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}