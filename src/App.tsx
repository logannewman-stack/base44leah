import { ErrorBoundary } from './components/ErrorBoundary'
import { ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/ServicesRow'
import About from './components/Ceramics'
import Process from './components/ShineClub'
import Gallery from './components/Instagram'
import Packages from './components/Pricing'
import Reviews from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

export default function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <ErrorBoundary>
        <ScrollProgress />
      </ErrorBoundary>
      <Navbar />
      <main className="relative">
        <Hero />
        <Stats />
        <Services />
        <About />
        <Process />
        <Gallery />
        <Packages />
        <Reviews />
        <CTA />
      </main>
      <Footer />
      <ContactModal />
    </div>
  )
}
