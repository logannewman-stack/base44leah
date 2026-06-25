import { Reveal } from './ui'
import { contactModal } from './useContactModal'

const plans = [
  {
    name: 'Starter Detail',
    sub: 'Perfect for regular maintenance',
    price: '$89',
    cta: 'Book Starter',
    featured: false,
    features: ['Full exterior hand wash', 'Wheel & tire cleaning', 'Window cleaning (exterior)', 'Tire shine application', 'Light interior wipe-down'],
  },
  {
    name: 'Full Detail',
    sub: 'Our most popular — inside and out',
    price: '$199',
    cta: 'Book Full Detail',
    featured: true,
    features: ['Everything in Starter', 'Deep interior vacuum & shampoo', 'Leather conditioning', 'Engine bay wipe-down', 'Clay bar decontamination', 'Hand wax & sealant'],
  },
  {
    name: 'Ceramic Pro',
    sub: 'Long-lasting paint protection',
    price: '$599',
    cta: 'Book Ceramic',
    featured: false,
    features: ['Everything in Full Detail', 'Paint correction & polish', 'Professional ceramic coating', '2-year protection warranty', 'UV & chemical resistance', 'Hydrophobic water beading'],
  },
]

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function Packages() {
  const book = (e: React.MouseEvent) => {
    e.preventDefault()
    contactModal.open()
  }
  return (
    <section id="packages" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">Simple, Transparent Pricing</h2>
        </Reveal>

        {/* equal height/width/padding across all three */}
        <div className="mx-auto mt-16 grid max-w-[960px] items-stretch gap-6 sm:grid-cols-3">
          {plans.map((p) => (
            <Reveal key={p.name} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl border-2 bg-white p-8 ${
                  p.featured ? 'border-brand-blue shadow-lg' : 'border-gray-200 shadow-sm'
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-blue px-4 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-brand-ink">{p.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{p.sub}</p>

                <p className="mt-5 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold tracking-[-0.02em] text-brand-ink">{p.price}</span>
                  <span className="text-sm text-gray-500">/service</span>
                </p>

                <ul className="mt-7 space-y-3 text-[15px] text-gray-700">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <a href="#contact" onClick={book} className={`${p.featured ? 'btn-primary' : 'btn-outline-sky'} w-full`}>
                    {p.cta}
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-[15px] italic text-gray-500">
            All services include a 100% satisfaction guarantee. Not happy? We come back, free.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
