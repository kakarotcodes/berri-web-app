"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Mail, Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { trackDownload } from '@/lib/analytics/ga4'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Track conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        currency: 'USD',
        value: 30,
        transaction_id: `txn_${Date.now()}`,
      })
    }
  }, [plan])

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault()
    const downloadUrl = 'https://berri-downloads.s3.ap-south-1.amazonaws.com/releases/stable/berri-1.2.0.dmg'
    trackDownload('success_page', downloadUrl, '1.2.0')
    setTimeout(() => {
      window.location.href = downloadUrl
    }, 100)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle className="size-8 text-green-500" />
          </div>
          <CardTitle className="text-3xl">
            🎉 Purchase Complete!
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Thank you for choosing Berri
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email notification */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <Mail className="size-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Check your email</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your license key has been sent to your email address.
                  <span className="text-foreground font-medium"> Please check your inbox (and spam folder)</span> for the email containing your activation key.
                </p>
              </div>
            </div>
          </div>

          {/* Next steps */}
          <div className="space-y-3">
            <h3 className="font-semibold">Next Steps:</h3>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary font-medium flex-shrink-0">
                  1
                </span>
                <span>
                  <span className="text-foreground font-medium">Download Berri Desktop</span> if you haven't already
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary font-medium flex-shrink-0">
                  2
                </span>
                <span>
                  <span className="text-foreground font-medium">Open the app</span> and go to Settings → License
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary font-medium flex-shrink-0">
                  3
                </span>
                <span>
                  <span className="text-foreground font-medium">Enter your license key</span> from the email along with your email address
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary font-medium flex-shrink-0">
                  4
                </span>
                <span>
                  <span className="text-foreground font-medium">Enjoy</span> all the premium features!
                </span>
              </li>
            </ol>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              size="lg"
              className="flex-1 rounded-full"
              onClick={handleDownload}
            >
              <Download className="size-4 mr-2" />
              Download for macOS
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 rounded-full"
              asChild
            >
              <Link href="/guide">
                View User Guide
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            <p>
              Need help? Check out our{' '}
              <Link href="/guide" className="text-primary hover:underline">
                user guide
              </Link>
              {' '}or contact support if you have any issues activating your license.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  )
}
