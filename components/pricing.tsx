import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Zap } from 'lucide-react'

const plans = [
    {
        name: 'Starter',
        description: 'Perfect for small teams getting started',
        price: 29,
        period: 'month',
        features: [
            'Up to 10,000 data points',
            'Basic analytics dashboard',
            '5 custom reports',
            'Email support',
            '7-day data retention',
        ],
        popular: false,
    },
    {
        name: 'Professional',
        description: 'Best for growing businesses',
        price: 99,
        period: 'month',
        features: [
            'Up to 100,000 data points',
            'Advanced analytics + AI insights',
            'Unlimited custom reports',
            'Priority support',
            '30-day data retention',
            'API access',
            'Team collaboration',
        ],
        popular: true,
    },
    {
        name: 'Enterprise',
        description: 'For large organizations',
        price: 299,
        period: 'month',
        features: [
            'Unlimited data points',
            'Full AI-powered analytics suite',
            'White-label solutions',
            'Dedicated account manager',
            'Unlimited data retention',
            'Advanced API access',
            'SSO & enterprise security',
            'Custom integrations',
        ],
        popular: false,
    },
]

export function Pricing() {
    return (
        <section id="pricing" className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Simple, transparent 
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"> pricing</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Choose the perfect plan for your business needs. Upgrade or downgrade at any time.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {plans.map((plan, index) => (
                        <Card 
                            key={index} 
                            className={`relative ${
                                plan.popular 
                                    ? 'border-primary shadow-lg shadow-primary/10 scale-105' 
                                    : ''
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                        <Zap className="size-3" />
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <CardHeader className="text-center">
                                <CardTitle className="text-xl">{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold">${plan.price}</span>
                                    <span className="text-muted-foreground">/{plan.period}</span>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <Check className="size-4 text-green-500 flex-shrink-0" />
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>

                            <CardFooter>
                                <Button 
                                    className="w-full" 
                                    variant={plan.popular ? 'default' : 'outline'}
                                >
                                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-muted-foreground">
                        All plans include a 14-day free trial. No credit card required.
                    </p>
                </div>
            </div>
        </section>
    )
}