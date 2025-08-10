import { HeroSection } from '@/components/hero-section'
import { Features } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { Testimonials } from '@/components/testimonials'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    ELECTRON_PROTOCOL: process.env.ELECTRON_PROTOCOL,
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Environment Variables (Testing)</h2>
        <div className="bg-card p-4 rounded-lg border mb-8">
          <pre className="text-sm whitespace-pre-wrap break-all">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </div>
      </div>
      <HeroSection />
      <Features />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}