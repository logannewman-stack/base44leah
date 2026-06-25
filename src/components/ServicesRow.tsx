import { Chip, Reveal } from './ui'
import { contactModal } from './useContactModal'

const services = [
  { title: 'Exterior Detail', price: '$89', desc: 'Hand wash, wheels, tire shine, and a streak-free glass finish — bumper to bumper.', icon: 'M12 3c3.2 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.8-6 6-10z' },
  { title: 'Full Detail', price: '$199', desc: 'Inside and out: exterior detail plus interior vacuum, dashboard, and leather care.', icon: 'M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 17.3 5.8 20.9l1.6-6.8L2.2 8.9l6.9-.6z' },
  { title: 'Ceramic Coating', price: '$599', desc: 'A 9H ceramic coating that locks in gloss and protects your paint for years.', icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3z' },
  { title: 'Paint Correction', price: '$349', desc: 'Multi-stage polishing that erases swirls, scratches, and oxidation to a mirror finish.', icon: 'M12 3l1.8 4.6a3 3 0 0 0 1.8 1.8L20 11l-4.6 1.8a3 3 0 0 0-1.8 1.8L12 19l-1.8-4.6a3 3 0 0 0-1.8-1.8L4 11l4.6-1.6a3 3 0 0 0 1.8-1.8z' },
  { title: 'Interior Deep Clean', price: '$129', desc: 'Steam, shampoo, and extraction for a sanitized, fresh, like-new cabin.', icon: 'M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3a2 2 0 0 1 1 2v5h-3v-2H6v2H3v-5a2 2 0 0 1 1-2z' },
  { title: 'Fleet Service', price: 'Custom', desc: 'Recurring detailing for company vehicles and fleets — volume pricing, one invoice.', icon: 'M4 5h7v6H4V5zm9 0h7v6h-7V5zM4 13h7v6H4v-6zm9 0h7v6h-7v-6z' },
]

function Card({ s }: { s: (typeof services)[number] }) {
  return (
    <div className="group flex flex-col rounded-card border border-slate-200 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue hover:shadow-soft">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-tint text-brand-blue transition-colors group-hover:bg-brand-blue group-hover:text-white">
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
          <path d={s.icon} />
        </svg>
      </span>
      <h3 className="mt-6 text-xl font-bold text-brand-ink">{s.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <p className="text-sm text-slate-500">
          {s.price === 'Custom' ? 'Pricing' : 'Starting at'}{' '}
          <span className="text-lg font-extrabold text-brand-ink">{s.price}</span>
        </p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            contactModal.open()
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-all hover:gap-3 hover:text-brand-blueDark"
        >
          Book This
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
    <section id="services" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Chip>What we offer</Chip>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">Detailing for every need.</h2>
          <p className="mt-5 text-lg text-slate-600">
            Pick a single service or a complete package — all fully mobile and performed at your
            location by certified, insured pros.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
