import { lazy, Suspense } from 'react'
import { CursorGlow, ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

const Background3D = lazy(() => import('./components/Background3D'))

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Static gradient base shows instantly; WebGL field streams in over it. */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.10),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.12),_transparent_55%)] bg-ink-900" />
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Stats />
        <HowItWorks />
        <Features />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
