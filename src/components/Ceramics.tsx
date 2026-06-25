import { Button, Chip } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

const points = [
  { t: 'We come to you', d: 'Fully mobile — your driveway or office, with our own water and power.' },
  { t: 'Certified & insured pros', d: 'Background-checked, trained detailers backed by full insurance.' },
  { t: 'Pro-grade products', d: 'Dual-action polishers and certified ceramic coatings — shop quality at your curb.' },
  { t: '100% satisfaction', d: "If it's not perfect, we make it right. No questions asked." },
]

export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* photo */}
        <div className="relative">
          <Photo
            src={IMAGES.detailer}
            alt="Professional detailer polishing a car to a flawless finish"
            className="aspect-[4/3] w-full rounded-[2rem] shadow-soft"
          />
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-brand-blue px-6 py-5 text-white shadow-blue sm:right-6">
            <p className="font-display text-3xl font-extrabold leading-none">5★</p>
            <p className="mt-1 text-xs text-white/80">rated by 500+ drivers</p>
          </div>
        </div>

        {/* copy */}
        <div>
          <Chip>Why Detail on Demand</Chip>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">
            Detailing done right, <span className="text-brand-blue">without the hassle.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            Skip the drop-off, the waiting room, and the drive-thru wash. We bring a full professional
            detailing setup to your door and leave your vehicle looking flawless.
          </p>

          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            {points.map((p) => (
              <div key={p.t} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-blueDark">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-brand-ink">{p.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{p.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button href="#contact" variant="primary" className="px-8 py-4 text-base">
              Get a free quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
