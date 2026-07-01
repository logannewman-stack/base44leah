import { lazy, Suspense, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { CursorGlow, ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import FloatingChatButton from './components/FloatingChatButton'

// Retry a dynamic import a few times before giving up — flaky mobile networks
// often drop a single chunk request, and a bare lazy() would then blank the page.
function lazyWithRetry<T extends ComponentType<unknown>>(factory: () => Promise<{ default: T }>) {
  return lazy(async () => {
    let lastErr: unknown
    for (let i = 0; i <= 3; i++) {
      try {
        return await factory()
      } catch (e) {
        lastErr = e
        await new Promise((r) => setTimeout(r, 500 * (i + 1)))
      }
    }
    throw lastErr
  })
}

// Everything below the hero is code-split AND kept off the first paint so the
// initial main-thread work is just the hero. Prefetched on idle so they're
// ready by the time the user scrolls.
const Marquee = lazyWithRetry(() => import('./components/Marquee'))
const Stats = lazyWithRetry(() => import('./components/Stats'))
const ServicesHelix = lazyWithRetry(() => import('./components/ServicesHelix'))
const Features = lazyWithRetry(() => import('./components/Features'))
const CoverFlow = lazyWithRetry(() => import('./components/CoverFlow'))
const Packages = lazyWithRetry(() => import('./components/Pricing'))
const Testimonials = lazyWithRetry(() => import('./components/Testimonials'))
const CTA = lazyWithRetry(() => import('./components/CTA'))

// Renders its (lazy) child only once it's scrolled near the viewport, so a
// section's JavaScript parses just-in-time instead of every section executing
// at once right after first paint (which froze the main thread on mobile).
// Until then it shows a same-height spacer, so there's no layout shift.
function Defer({ children, minH = '60vh' }: { children: ReactNode; minH?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      // start loading ~one screen ahead so it's ready before it scrolls in
      { rootMargin: '700px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const spacer = <div style={{ minHeight: minH }} aria-hidden />
  return (
    <div ref={ref}>
      {show ? (
        <ErrorBoundary fallback={spacer}>
          <Suspense fallback={spacer}>{children}</Suspense>
        </ErrorBoundary>
      ) : (
        spacer
      )}
    </div>
  )
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
        <Defer minH="200px">
          <Marquee />
        </Defer>
        <Defer minH="90vh">
          <Stats />
        </Defer>
        <Defer minH="100vh">
          <ServicesHelix />
        </Defer>
        <Defer minH="100vh">
          <Features />
        </Defer>
        <Defer minH="80vh">
          <CoverFlow />
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
