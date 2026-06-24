import { ErrorBoundary } from './components/ErrorBoundary'
import SpiralBg from './components/SpiralBg'
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

export default function App() {
  return (
    <div className="relative min-h-screen">
      <ErrorBoundary>
        <SpiralBg />
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
