import { ErrorBoundary } from './components/ErrorBoundary'
import { ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/ServicesRow'
import Feature from './components/ShineClub'
import About from './components/Ceramics'
import Reviews from './components/Testimonials'
import Gallery from './components/Instagram'
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
        <Services />
        <Feature />
        <About />
        <Reviews />
        <Gallery />
      </main>
      <Footer />
      <ContactModal />
    </div>
  )
}
