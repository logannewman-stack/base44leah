import { ErrorBoundary } from './components/ErrorBoundary'
import { ScrollProgress } from './components/Effects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import ExtensionsBand from './components/ExtensionsBand'
import Services from './components/Services'
import BeforeAfter from './components/BeforeAfter'
import About from './components/About'
import Gallery from './components/Gallery'
import PriceList from './components/PriceList'
import Reviews from './components/Reviews'
import Booking from './components/Booking'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

export default function App() {
  return (
    <div className="relative min-h-screen bg-cream-100">
      <ErrorBoundary>
        <ScrollProgress />
      </ErrorBoundary>
      <Navbar />
      <main className="relative">
        <Hero />
        <Marquee />
        <ExtensionsBand />
        <Services />
        <BeforeAfter />
        <About />
        <Gallery />
        <PriceList />
        <Reviews />
        <Booking />
      </main>
      <Footer />
      <BookingModal />
    </div>
  )
}
