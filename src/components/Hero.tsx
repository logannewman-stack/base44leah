import { Button, Chip, Arrow } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* soft decorative tints */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-tint blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-sky-50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* left — copy */}
        <div className="animate-fadeUp">
          <Chip>Mobile detailing · Ceramic coatings</Chip>

          <h1 className="mt-6 display text-5xl leading-[1.04] text-brand-ink sm:text-6xl lg:text-7xl">
            Showroom shine,
            <br />
            <span className="text-brand-blue">delivered to you.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
            Premium mobile detailing, ceramic coatings, and paint correction — brought straight to
            your driveway. Book in 60 seconds and we handle the rest. No drop-offs, no waiting.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#contact" variant="primary" className="px-8 py-4 text-base">
              Book my detail <Arrow />
            </Button>
            <Button href="#packages" variant="ghost" className="px-8 py-4 text-base">
              View packages
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <span className="text-base text-amber-400">★★★★★</span>
              <span className="font-semibold text-brand-ink">4.9/5</span> from 500+ drivers
            </span>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" />
            <span className="font-medium">Fully insured &amp; mobile</span>
          </div>
        </div>

        {/* right — hero photo with floating accents */}
        <div className="relative">
          <Photo
            src={IMAGES.hero}
            alt="Freshly detailed luxury car with a flawless glossy finish"
            eager
            className="aspect-[4/5] w-full rounded-[2rem] shadow-soft sm:aspect-[5/4] lg:aspect-[4/5]"
          />

          {/* floating "cars detailed" card */}
          <div className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card sm:left-6">
            <div className="flex -space-x-2">
              {['#0ea5e9', '#0b1220', '#38bdf8'].map((c) => (
                <span key={c} className="h-8 w-8 rounded-full border-2 border-white" style={{ background: c }} />
              ))}
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-bold text-brand-ink">2,000+</p>
              <p className="text-xs text-slate-500">cars detailed</p>
            </div>
          </div>

          {/* floating ceramic badge */}
          <div className="absolute -right-3 top-6 flex items-center gap-2 rounded-full bg-brand-ink px-4 py-2 text-xs font-semibold text-white shadow-card">
            <span className="h-2 w-2 rounded-full bg-brand-sky" />
            9H ceramic coated
          </div>
        </div>
      </div>
    </section>
  )
}
