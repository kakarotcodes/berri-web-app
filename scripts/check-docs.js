#!/usr/bin/env node

/**
 * Documentation Validation Script
 * Checks for common documentation errors
 *
 * Usage: npm run docs:check
 */

const fs = require('fs')
const path = require('path')

const guideDataPath = path.join(__dirname, '../lib/guide-data.ts')
const guideData = fs.readFileSync(guideDataPath, 'utf-8')

const issues = []
const warnings = []

// Check for Control+W references (should be removed)
const controlWMatches = guideData.match(/Control\+W|Control \+ W/g)
if (controlWMatches) {
  issues.push(`❌ Found ${controlWMatches.length} Control+W reference(s) - this shortcut does not exist`)
}

// Check for hardcoded Control+1-9 shortcuts with feature names
// Exclude lines that are in example/workflow sections (contain "Example", "Workflow", "typically")
const lines = guideData.split('\n')
const hardcodedShortcuts = []
for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  // Check if line has hardcoded shortcut pattern
  if (/Control\+[1-9].*(?:Files|Clipboard|Notes|Browse|Webview)/.test(line)) {
    // Check if it's in an example/workflow context (check current line and 5 lines before)
    const contextLines = lines.slice(Math.max(0, i - 5), i + 1).join(' ')
    const isExample = /Example|Workflow|typically|Configuration Example/.test(contextLines)
    if (!isExample) {
      hardcodedShortcuts.push(line.trim())
    }
  }
}
if (hardcodedShortcuts.length > 0) {
  issues.push(`❌ Found ${hardcodedShortcuts.length} hardcoded module shortcut(s) - shortcuts are user-configured!`)
}

// Check for "Games Module" references (should be deleted)
if (guideData.includes('Games Module') || guideData.includes("id: 'games'")) {
  issues.push('❌ Found "Games Module" references - this feature is commented out in the app')
}

// Check for "Webview Module" (should be "Browse Module")
if (guideData.includes('Webview Module')) {
  warnings.push('⚠️  Found "Webview Module" - should be "Browse Module" (as shown in app UI)')
}

// Check for incorrect pill dimensions
if (guideData.includes('50px wide') || guideData.includes('200px tall')) {
  warnings.push('⚠️  Found outdated pill dimensions (50px×200px) - should be 35px×190-350px')
}

// Check guide version matches package.json
const packageJsonPath = path.join(__dirname, '../package.json')
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  const versionMatch = guideData.match(/version:\s*['"]([^'"]+)['"]/);
  if (versionMatch && versionMatch[1] !== packageJson.version) {
    warnings.push(`⚠️  Guide version (${versionMatch[1]}) doesn't match package.json (${packageJson.version})`)
  }
}

// Count pages
const pageCount = (guideData.match(/\{\s*id:/g) || []).length
console.log(`\n📋 Documentation Check Results\n`)
console.log(`📄 Total guide pages: ${pageCount}`)

// Output issues
if (issues.length > 0) {
  console.log(`\n🔴 Critical Issues (${issues.length}):\n`)
  issues.forEach(issue => console.log(`  ${issue}`))
}

// Output warnings
if (warnings.length > 0) {
  console.log(`\n🟡 Warnings (${warnings.length}):\n`)
  warnings.forEach(warning => console.log(`  ${warning}`))
}

// Summary
if (issues.length === 0 && warnings.length === 0) {
  console.log('\n✅ No issues found!\n')
  process.exit(0)
} else {
  console.log(`\n📊 Summary: ${issues.length} critical issue(s), ${warnings.length} warning(s)\n`)
  if (issues.length > 0) {
    console.log('❌ Fix critical issues before deploying\n')
    process.exit(1)
  } else {
    console.log('⚠️  Consider addressing warnings\n')
    process.exit(0)
  }
}
