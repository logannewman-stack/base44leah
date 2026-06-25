import { Reveal } from './ui'
import { Photo } from './Photo'
import { contactModal } from './useContactModal'
import { IMAGES } from '../images'

const services = [
  { title: 'Exterior Detail', price: '$89', desc: 'Hand wash, wheels, and a streak-free glass finish — bumper to bumper.', img: IMAGES.services.exterior, icon: 'M12 3c3.2 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.8-6 6-10z' },
  { title: 'Full Detail', price: '$199', desc: 'Inside and out — exterior detail plus interior vacuum, dashboard, and leather care.', img: IMAGES.services.full, icon: 'M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z' },
  { title: 'Ceramic Coating', price: '$599', desc: 'A 9H ceramic coating that locks in gloss and protects your paint for years.', img: IMAGES.services.ceramic, icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3z' },
  { title: 'Paint Correction', price: '$349', desc: 'Multi-stage polishing that erases swirls, scratches, and oxidation to a mirror finish.', img: IMAGES.services.correction, icon: 'M12 3l1.8 4.6a3 3 0 0 0 1.8 1.8L20 11l-4.6 1.8a3 3 0 0 0-1.8 1.8L12 19l-1.8-4.6a3 3 0 0 0-1.8-1.8L4 11l4.6-1.6a3 3 0 0 0 1.8-1.8z' },
  { title: 'Interior Deep Clean', price: '$129', desc: 'Steam, shampoo, and extraction for a sanitized, fresh, like-new cabin.', img: IMAGES.services.interior, icon: 'M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3a2 2 0 0 1 1 2v5h-3v-2H6v2H3v-5a2 2 0 0 1 1-2z' },
  { title: 'Fleet Service', price: 'Custom', desc: 'Recurring detailing for company vehicles and fleets — volume pricing, one invoice.', img: IMAGES.services.fleet, icon: 'M4 5h7v6H4V5zm9 0h7v6h-7V5zM4 13h7v6H4v-6zm9 0h7v6h-7v-6z' },
]

function Card({ s }: { s: (typeof services)[number] }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Photo src={s.img} alt={s.title} className="h-48 w-full" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-badge text-brand-blue">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d={s.icon} />
            </svg>
          </span>
          <h3 className="text-xl font-semibold text-brand-ink">{s.title}</h3>
        </div>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-gray-700">{s.desc}</p>
        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500">
            {s.price === 'Custom' ? 'Pricing ' : 'Starting at '}
            <span className="text-lg font-bold text-brand-ink">{s.price}</span>
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              contactModal.open()
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 transition-all hover:gap-3 hover:text-brand-blueDark"
          >
            Book This
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-brand-grey py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">What We Offer</h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[1.7] text-gray-700">
            Professional results brought to your door. Every service includes a satisfaction
            guarantee.
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
