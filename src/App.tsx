import { lazy, Suspense } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { CursorGlow, ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import ServicesHelix from './components/ServicesHelix'
import Features from './components/Features'
import Packages from './components/Pricing'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

const ImmersiveBg = lazy(() => import('./components/ImmersiveBg'))

// Rich CSS aurora shown instantly and as a fallback if WebGL is unavailable.
function AuroraFallback() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink-900">
      <div className="absolute -left-1/4 top-0 h-[80vh] w-[80vh] rounded-full bg-cyber-blue/20 blur-[140px]" />
      <div className="absolute right-0 top-1/3 h-[80vh] w-[80vh] rounded-full bg-cyber-violet/20 blur-[150px]" />
      <div className="absolute bottom-0 left-1/3 h-[70vh] w-[70vh] rounded-full bg-cyber-magenta/15 blur-[150px]" />
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen">
      <ErrorBoundary fallback={<AuroraFallback />}>
        <Suspense fallback={<AuroraFallback />}>
          <ImmersiveBg />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <ScrollProgress />
      </ErrorBoundary>
      <ErrorBoundary>
        <CursorGlow />
      </ErrorBoundary>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Stats />
        <ServicesHelix />
        <Features />
        <Packages />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
