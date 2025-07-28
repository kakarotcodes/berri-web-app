import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
    {
        name: 'Sarah Chen',
        role: 'VP of Analytics',
        company: 'TechFlow Inc.',
        content: 'Berri transformed how we understand our customer data. The AI insights helped us increase conversion rates by 40% in just three months.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Marcus Rodriguez',
        role: 'Head of Growth',
        company: 'StartupXYZ',
        content: 'The real-time analytics dashboard is incredible. We can now make data-driven decisions instantly instead of waiting days for reports.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Emily Watson',
        role: 'Data Director',
        company: 'Enterprise Corp',
        content: 'Finally, a platform that makes complex data simple. Our entire team now has access to insights that used to require a data scientist.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'David Kim',
        role: 'CEO',
        company: 'GrowthLabs',
        content: 'Berri\'s AI-powered insights revealed patterns we never would have found manually. It\'s like having a data science team in your pocket.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'Lisa Park',
        role: 'Product Manager',
        company: 'InnovateCo',
        content: 'The security features give us complete peace of mind. We can analyze sensitive data knowing it\'s protected by enterprise-grade security.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    },
    {
        name: 'James Thompson',
        role: 'Analytics Lead',
        company: 'DataDriven LLC',
        content: 'The speed is unmatched. We process millions of records in seconds. It\'s completely changed how we approach data analysis.',
        rating: 5,
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
    }
]

export function Testimonials() {
    return (
        <section className="py-16 md:py-32 bg-muted/50">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Loved by 
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"> thousands</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        See what our customers are saying about Berri
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="p-6">
                                <div className="mb-4 flex">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                
                                <blockquote className="mb-4 text-sm leading-relaxed text-muted-foreground">
                                    "{testimonial.content}"
                                </blockquote>
                                
                                <div className="flex items-center gap-3">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="size-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="font-semibold text-sm">{testimonial.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span>4.9/5 from 1,200+ reviews</span>
                    </div>
                </div>
            </div>
        </section>
    )
}