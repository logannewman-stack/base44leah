import { Reveal } from './ui'
import { Photo } from './Photo'
import { contactModal } from './useContactModal'
import { IMAGES } from '../images'

const services = [
  { tag: 'Exterior', title: 'Exterior Detail', price: 'From $89', img: IMAGES.services.exterior },
  { tag: 'Complete', title: 'Full Detail', price: 'From $199', img: IMAGES.services.full },
  { tag: 'Protection', title: 'Ceramic Coating', price: 'From $599', img: IMAGES.services.ceramic },
  { tag: 'Restoration', title: 'Paint Correction', price: 'From $349', img: IMAGES.services.correction },
  { tag: 'Interior', title: 'Interior Deep Clean', price: 'From $129', img: IMAGES.services.interior },
  { tag: 'Business', title: 'Fleet Service', price: 'Custom', img: IMAGES.services.fleet },
]

function Card({ s }: { s: (typeof services)[number] }) {
  return (
    <div className="group flex w-[20rem] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <Photo src={s.img} alt={s.title} className="h-44 w-full" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue">{s.tag}</p>
        <h3 className="mt-2 text-2xl font-bold text-brand-ink">{s.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{s.price}</p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            contactModal.open()
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-blue transition-all hover:gap-3 hover:text-brand-blueDark"
        >
          Book →
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-blueDark">What We Offer</p>
            <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-[-0.01em] text-brand-ink sm:text-5xl">Our Services</h2>
          </div>
          <p className="max-w-sm text-sm text-gray-500">
            Fully mobile and performed at your home or office. Swipe to explore and book the treatment
            your vehicle deserves.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 max-w-7xl">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
          {services.map((s) => (
            <Card key={s.title} s={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
