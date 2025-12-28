"use client"

import { motion } from 'framer-motion'
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
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative h-full group',
        disabled && 'opacity-60 pointer-events-none'
      )}
    >
      {/* Card */}
      <div
        className={cn(
          'relative h-full flex flex-col overflow-hidden rounded-3xl bg-background border-2 transition-all duration-500',
          highlight
            ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20'
            : 'border-foreground/10 hover:border-foreground/20',
          popular && 'md:scale-105'
        )}
      >
        {/* Gradient background for highlighted */}
        {highlight && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-500/5" />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute -top-px left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-b-xl bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-semibold">
              <Sparkles className="size-3" />
              {badge}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>

            {/* Price */}
            <div className="mt-6 flex items-baseline justify-center gap-1">
              <span className="text-5xl md:text-6xl font-black tracking-tight">
                ${price}
              </span>
              <span className="text-muted-foreground text-lg">
                {getBillingText()}
              </span>
            </div>
          </div>

          {/* Features */}
          <div className="flex-1">
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5',
                    highlight ? 'bg-purple-500/20' : 'bg-foreground/10'
                  )}>
                    <Check className={cn(
                      'size-3',
                      highlight ? 'text-purple-500' : 'text-foreground'
                    )} />
                  </div>
                  <span className="text-sm text-foreground/80">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onCtaClick}
            disabled={loading || disabled}
            className={cn(
              'mt-8 w-full py-4 px-6 rounded-full font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2',
              ctaVariant === 'default'
                ? 'bg-foreground text-background hover:opacity-90'
                : 'bg-transparent border-2 border-foreground/20 text-foreground hover:bg-foreground/5',
              highlight && ctaVariant === 'default' && 'bg-gradient-to-r from-purple-500 to-violet-600 text-white'
            )}
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {cta}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </>
            )}
          </motion.button>
        </div>

        {/* Hover glow effect */}
        <div className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none',
          highlight ? 'bg-gradient-to-t from-purple-500/10 to-transparent' : 'bg-gradient-to-t from-foreground/5 to-transparent'
        )} />
      </div>
    </motion.div>
  )
}
