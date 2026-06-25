import { Button, Eyebrow, Reveal } from './ui'
import { contactModal } from './useContactModal'

const services = [
  {
    tag: 'Protection',
    title: 'Ceramic Coating',
    copy: 'A 9H liquid-glass coating that locks in gloss and repels water, dirt, and UV for years.',
    icon: 'M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3z',
  },
  {
    tag: 'Restoration',
    title: 'Paint Correction',
    copy: 'Multi-stage machine polishing that erases swirls, scratches, and oxidation to a mirror finish.',
    icon: 'M12 3l1.8 4.6a3 3 0 0 0 1.8 1.8L20 11l-4.6 1.8a3 3 0 0 0-1.8 1.8L12 19l-1.8-4.6a3 3 0 0 0-1.8-1.8L4 11l4.6-1.6a3 3 0 0 0 1.8-1.8z',
  },
  {
    tag: 'Defense',
    title: 'Paint Protection Film',
    copy: 'Self-healing clear film that shields high-impact panels from rock chips, scuffs, and stains.',
    icon: 'M12 2 5 5v6c0 5 3 9 7 11 4-2 7-6 7-11V5l-7-3z',
  },
  {
    tag: 'Interior',
    title: 'Interior Detailing',
    copy: 'Steam, shampoo, and extraction for a deep-cleaned, sanitized, like-new cabin.',
    icon: 'M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3a2 2 0 0 1 1 2v5h-3v-2H6v2H3v-5a2 2 0 0 1 1-2z',
  },
  {
    tag: 'Maintenance',
    title: 'Mobile Wash & Detail',
    copy: 'Recurring hand washes and refreshes performed right in your driveway, on your schedule.',
    icon: 'M3 13l2-5h11l3 4h2v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3v-2z',
  },
]

function Card({ s }: { s: (typeof services)[number] }) {
  const stroke = s.title === 'Interior Detailing'
  return (
    <div className="group relative flex w-[20rem] shrink-0 snap-start flex-col justify-between border border-white/10 bg-ink-900 p-8 transition-colors duration-300 hover:border-gold">
      <div>
        <span className="flex h-12 w-12 items-center justify-center border border-white/15 text-gold transition-colors group-hover:border-gold">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill={stroke ? 'none' : 'currentColor'} stroke={stroke ? 'currentColor' : 'none'} strokeWidth="2">
            <path d={s.icon} />
          </svg>
        </span>
        <p className="mt-6 text-[0.7rem] font-bold uppercase tracking-widest2 text-gold">{s.tag}</p>
        <h3 className="mt-2 font-display text-3xl uppercase leading-none tracking-tightest text-white">{s.title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-white/60">{s.copy}</p>
      </div>
      <Button href="#contact" variant="book" className="mt-8">
        Book →
      </Button>
    </div>
  )
}

export default function ServicesRow() {
  return (
    <section id="services" className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="mt-4 h-display text-5xl text-white sm:text-6xl">
              What we do
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/55">
            Every service is fully mobile and performed at your home or office. Swipe through and book
            the treatment your vehicle deserves.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 max-w-7xl">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4">
          {services.map((s) => (
            <Card key={s.title} s={s} />
          ))}
          {/* trailing book-all card */}
          <div className="flex w-[20rem] shrink-0 snap-start flex-col items-start justify-center border border-gold bg-gold p-8 text-black">
            <h3 className="font-display text-3xl uppercase leading-none tracking-tightest">Not sure which?</h3>
            <p className="mt-4 text-sm leading-relaxed text-black/75">
              Tell us your vehicle and we'll recommend the perfect package — free, no pressure.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                contactModal.open()
              }}
              className="mt-8 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest2 text-black transition-all hover:gap-3"
            >
              Get a free quote →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
