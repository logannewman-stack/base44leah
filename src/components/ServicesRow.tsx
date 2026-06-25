import { Chip, Reveal } from './ui'
import { Photo } from './Photo'
import { contactModal } from './useContactModal'
import { IMAGES } from '../images'

const services = [
  { tag: 'Protection', title: 'Ceramic Coating', copy: 'A 9H liquid-glass coating that locks in gloss and repels water, dirt, and UV for years.', img: IMAGES.ceramic },
  { tag: 'Restoration', title: 'Paint Correction', copy: 'Multi-stage machine polishing that erases swirls, scratches, and oxidation to a mirror finish.', img: IMAGES.correction },
  { tag: 'Defense', title: 'Paint Protection Film', copy: 'Self-healing clear film that shields high-impact panels from rock chips, scuffs, and stains.', img: IMAGES.ppf },
  { tag: 'Interior', title: 'Interior Detailing', copy: 'Steam, shampoo, and extraction for a deep-cleaned, sanitized, like-new cabin.', img: IMAGES.interior },
  { tag: 'Exterior', title: 'Wash & Decontamination', copy: 'A pH-balanced foam hand wash, clay-bar decon, and a streak-free finish — at your door.', img: IMAGES.wash },
  { tag: 'Detailing', title: 'Engine Bay Cleaning', copy: 'A safe, thorough degrease and dress so your engine bay looks as clean as the day one.', img: IMAGES.detailer },
]

function Card({ s }: { s: (typeof services)[number] }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Photo src={s.img} alt={s.title} className="aspect-[16/10] w-full" />
      <div className="flex flex-1 flex-col p-7">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">{s.tag}</span>
        <h3 className="mt-2 font-display text-2xl font-bold text-brand-ink">{s.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{s.copy}</p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            contactModal.open()
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink transition-all hover:gap-3 hover:text-brand-blue"
        >
          Book this service
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Chip>Our services</Chip>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">
            Everything your car needs, <span className="text-brand-blue">brought to you.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            Every service is fully mobile and performed at your home or office by certified,
            fully-insured detailers.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Reveal key={s.title}>
              <Card s={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
