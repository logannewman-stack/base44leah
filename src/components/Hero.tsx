import { Button } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* right-half full-bleed image */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Photo src={IMAGES.hero} alt="Professional detailer washing and detailing a car" eager className="h-full w-full">
          {/* white bleed on the left edge so it blends into the text half */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #ffffff 0%, transparent 15%)' }} />
          <div className="absolute inset-0 bg-brand-blue/5" />
        </Photo>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center lg:grid-cols-2">
          <div className="py-20 lg:py-32 lg:pr-12">
            <span className="chip">✦ Mobile Detailing · We Come to You</span>

            <h1 className="mt-6 h-hero text-5xl sm:text-6xl lg:text-[72px]">
              Your Car Deserves a
              <br />
              <span className="text-brand-blue">Showroom Shine.</span>
            </h1>

            <p className="mt-6 max-w-lg text-[18px] leading-[1.7] text-gray-700">
              We bring professional-grade detailing directly to your driveway, office, or anywhere you
              are. Book in 60 seconds.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#contact" variant="primary" className="px-8 py-4 text-base">
                Book My Detail
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Button>
              <a href="#packages" className="btn-outline-dark px-8 py-4 text-base">
                See Packages
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-gray-700">
              <span className="inline-flex items-center gap-1.5"><span className="text-amber-400">★</span> 4.9/5 Stars</span>
              <span className="h-4 w-px bg-gray-300" />
              <span>2,000+ Cars Detailed</span>
              <span className="h-4 w-px bg-gray-300" />
              <span>Fully Insured</span>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>

        {/* image on mobile/tablet */}
        <div className="pb-14 lg:hidden">
          <Photo src={IMAGES.hero} alt="Professional detailer washing and detailing a car" className="aspect-[4/3] w-full rounded-card shadow-soft">
            <div className="absolute inset-0 bg-brand-blue/5" />
          </Photo>
        </div>
      </div>
    </section>
  )
}
