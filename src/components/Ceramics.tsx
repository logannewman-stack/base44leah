import { Reveal } from './ui'
import { Photo } from './Photo'
import { contactModal } from './useContactModal'
import { IMAGES } from '../images'

const points = [
  'Years of protection — not weeks',
  'Deep, liquid-mirror gloss',
  'Hydrophobic — water & dirt slide off',
  'Backed by a multi-year warranty',
]

const gallery = [IMAGES.services.ceramic, IMAGES.services.correction, IMAGES.services.exterior, IMAGES.services.interior]

export default function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        {/* left — heading + copy */}
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-blueDark">Signature Service</p>
          <h2 className="mt-4 text-4xl font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-brand-ink sm:text-5xl">
            Ceramic
            <br />
            <span className="text-brand-blue">Coatings</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-700">
            Our flagship treatment. We decontaminate and machine-polish your paint to a flawless
            finish, then bond a professional-grade 9H ceramic coating that transforms how your car
            looks, feels, and protects itself — for years to come.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-sm font-medium text-gray-700">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                contactModal.open()
              }}
              className="btn-primary px-8 py-4 text-base uppercase tracking-[0.12em]"
            >
              Book a Coating
            </a>
          </div>
        </Reveal>

        {/* right — photo gallery grid */}
        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          {gallery.map((src, i) => (
            <Photo key={i} src={src} alt={`Detailing work ${i + 1}`} className="aspect-square w-full rounded-2xl shadow-md" />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
