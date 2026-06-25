import { ErrorBoundary } from './components/ErrorBoundary'
import { ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import ServicesRow from './components/ServicesRow'
import ShineClub from './components/ShineClub'
import Ceramics from './components/Ceramics'
import Packages from './components/Pricing'
import Reviews from './components/Testimonials'
import Instagram from './components/Instagram'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <ErrorBoundary>
        <ScrollProgress />
      </ErrorBoundary>
      <Navbar />
      <main className="relative">
        <Hero />
        <Stats />
        <ServicesRow />
        <ShineClub />
        <Ceramics />
        <Packages />
        <Reviews />
        <Instagram />
        <CTA />
      </main>
      <Footer />
      <ContactModal />
    </div>
  )
}
