import { ErrorBoundary } from './components/ErrorBoundary'
import { CursorGlow, ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Stats from './components/Stats'
import ServicesHelix from './components/ServicesHelix'
import Features from './components/Features'
import WarpTunnel from './components/WarpTunnel'
import Packages from './components/Pricing'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

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
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Stats />
        <ServicesHelix />
        <Features />
        <WarpTunnel />
        <Packages />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
