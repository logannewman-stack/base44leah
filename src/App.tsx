import { ErrorBoundary } from './components/ErrorBoundary'
import { ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/Stats'
import Services from './components/ServicesRow'
import HowItWorks from './components/ShineClub'
import BeforeAfter from './components/BeforeAfter'
import Packages from './components/Pricing'
import Gallery from './components/Instagram'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import MobileCTA from './components/MobileCTA'

export default function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <ErrorBoundary>
        <ScrollProgress />
      </ErrorBoundary>
      <Navbar />
      <main className="relative">
        <Hero />
        <TrustBar />
        <Services />
        <HowItWorks />
        <BeforeAfter />
        <Packages />
        <Gallery />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      {/* spacer so the mobile action bar never covers footer content */}
      <div className="h-20 md:hidden" />
      <MobileCTA />
      <ContactModal />
    </div>
  )
}
