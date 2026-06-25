import Header from './components/Header'
import Hero from './components/Hero'
import DetailProcess from './components/DetailProcess'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Reviews from './components/Reviews'
import CTA from './components/CTA'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

export default function App() {
  return (
    <div className="grain relative min-h-screen bg-ink-950">
      <Header />
      <main>
        <Hero />
        <DetailProcess />
        <Services />
        <Pricing />
        <Reviews />
        <CTA />
      </main>
      <Footer />
      <BookingModal />
    </div>
  )
}
