"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PricingCardProps {
  name: string
  description: string
  price: number
  billingPeriod: 'forever' | 'month' | 'year' | 'one-time'
  priceNote?: string
  features: string[]
  cta: string
  ctaVariant?: 'default' | 'outline' | 'secondary'
  onCtaClick: () => void
  loading?: boolean
  popular?: boolean
  badge?: string
  highlight?: boolean
  disabled?: boolean
}

export function PricingCard({
  name,
  description,
  price,
  billingPeriod,
  priceNote,
  features,
  cta,
  ctaVariant = 'default',
  onCtaClick,
  loading = false,
  popular = false,
  badge,
  highlight = false,
  disabled = false,
}: PricingCardProps) {
  const getBillingText = () => {
    switch (billingPeriod) {
      case 'forever':
        return 'forever'
      case 'month':
        return '/month'
      case 'year':
        return '/year'
      case 'one-time':
        return 'one-time'
      default:
        return ''
    }
  }

  return (
    <Card
      className={cn(
        'relative flex flex-col',
        popular && 'border-primary shadow-lg shadow-primary/10 scale-105',
        highlight && 'border-2 border-primary',
        disabled && 'opacity-60'
      )}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge
            variant={popular ? 'default' : 'secondary'}
            className="px-3 py-1 text-xs font-medium"
          >
            <Sparkles className="size-3 mr-1" />
            {badge}
          </Badge>
        </div>
      )}

      <CardHeader className="text-center">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground">{getBillingText()}</span>
        </div>
        {priceNote && (
          <p className="text-sm text-muted-foreground mt-1">{priceNote}</p>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="size-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          variant={ctaVariant}
          onClick={onCtaClick}
          disabled={loading || disabled}
        >
          {loading ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            cta
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
