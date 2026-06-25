import { lazy, Suspense, useEffect, type ReactNode } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { CursorGlow, ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import FloatingChatButton from './components/FloatingChatButton'

// Below-the-fold sections are code-split so the initial bundle only carries the
// hero + above-the-fold UI. They're prefetched on idle so they're ready by the
// time the user scrolls to them.
const ServicesHelix = lazy(() => import('./components/ServicesHelix'))
const Features = lazy(() => import('./components/Features'))
const WarpTunnel = lazy(() => import('./components/WarpTunnel'))
const Packages = lazy(() => import('./components/Pricing'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const CTA = lazy(() => import('./components/CTA'))

const lazyChunks = [
  () => import('./components/ServicesHelix'),
  () => import('./components/Features'),
  () => import('./components/WarpTunnel'),
  () => import('./components/Pricing'),
  () => import('./components/Testimonials'),
  () => import('./components/CTA'),
]

// Reserves vertical space so a not-yet-loaded chunk doesn't cause layout shift.
function Defer({ children, minH = '60vh' }: { children: ReactNode; minH?: string }) {
  return <Suspense fallback={<div style={{ minHeight: minH }} aria-hidden />}>{children}</Suspense>
}

// Clean light backdrop: soft grey blooms + a faint grid on near-white.
function LightBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#f6f6f7]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.9),_transparent_55%)]" />
      <div className="absolute -left-1/4 -top-1/4 h-[75vh] w-[75vh] rounded-full bg-cyber-blue/[0.06] blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-[75vh] w-[75vh] rounded-full bg-cyber-magenta/[0.06] blur-[140px]" />
      <div className="absolute inset-0 grid-overlay opacity-70" />
    </div>
  )
}

export default function App() {
  // Warm the split chunks once the main thread is idle after first paint.
  useEffect(() => {
    let cancelled = false
    const run = () => {
      if (cancelled) return
      lazyChunks.forEach((load) => load())
    }
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(run)
    else timeoutId = setTimeout(run, 1500)
    return () => {
      cancelled = true
      if (idleId !== undefined && w.cancelIdleCallback) w.cancelIdleCallback(idleId)
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      <LightBg />
      <ErrorBoundary>
        <ScrollProgress />
      </ErrorBoundary>
      <ErrorBoundary>
        <CursorGlow />
      </ErrorBoundary>
      <Navbar />
      <FloatingChatButton />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Stats />
        <Defer minH="100vh">
          <ServicesHelix />
        </Defer>
        <Defer minH="100vh">
          <Features />
        </Defer>
        <Defer minH="80vh">
          <WarpTunnel />
        </Defer>
        <Defer>
          <Packages />
        </Defer>
        <Defer>
          <Testimonials />
        </Defer>
        <Defer minH="50vh">
          <CTA />
        </Defer>
      </main>
      <Footer />
      <ContactModal />
    </div>
  )
}
