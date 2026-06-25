import { Button, Chip, Arrow } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

function Urgency() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      Next available: Tomorrow
    </span>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* full-bleed photo on the right half (desktop) */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
        <Photo src={IMAGES.hero} alt="Freshly detailed black luxury car with glossy paint" eager className="h-full w-full">
          <div className="absolute inset-0 bg-brand-blue/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent" />
        </Photo>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center lg:grid-cols-2">
          <div className="py-16 lg:py-28 lg:pr-12">
            <Chip>Mobile detailing · We come to you</Chip>

            <h1 className="mt-6 display text-5xl leading-[1.05] text-brand-ink sm:text-6xl lg:text-[4.1rem]">
              Premium Mobile Detailing, <span className="text-brand-blue">Delivered to Your Door.</span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
              We come to you — driveway, office, or wherever you are. Book in 60 seconds and we handle
              the rest, with showroom results every time.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#contact" variant="primary" className="px-8 py-4 text-base">
                Book My Detail <Arrow />
              </Button>
              <Button href="#packages" variant="ghost" className="px-8 py-4 text-base">
                View Packages
              </Button>
            </div>

            <div className="mt-5">
              <Urgency />
            </div>

            <div className="mt-9 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['#0ea5e9', '#0a0a0a', '#38bdf8', '#0369a1'].map((c) => (
                  <span key={c} className="h-9 w-9 rounded-full border-2 border-white" style={{ background: c }} />
                ))}
              </div>
              <div className="text-sm">
                <div className="text-amber-400">★★★★★</div>
                <p className="text-slate-600">
                  <span className="font-semibold text-brand-ink">4.9/5</span> from 500+ happy drivers
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>

        {/* photo on mobile/tablet */}
        <div className="pb-14 lg:hidden">
          <Photo src={IMAGES.hero} alt="Freshly detailed black luxury car with glossy paint" className="aspect-[4/3] w-full rounded-card shadow-soft">
            <div className="absolute inset-0 bg-brand-blue/10" />
          </Photo>
        </div>
      </div>
    </section>
  )
}
