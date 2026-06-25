import Header from './components/Header'
import Hero from './components/Hero'
import VideoReel from './components/VideoReel'
import Services from './components/Services'
import Process from './components/Process'
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
        <VideoReel />
        <Services />
        <Process />
        <Pricing />
        <Reviews />
        <CTA />
      </main>
      <Footer />
      <BookingModal />
    </div>
  )
}
