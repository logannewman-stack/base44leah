import { Chip, Reveal } from './ui'

const reviews = [
  {
    text: 'Booked Sunday night and my car was spotless in my own driveway by Monday lunch. The ceramic coating still beads water months later. Absolutely worth it.',
    name: 'Jordan Mercer',
    city: 'Austin, TX',
  },
  {
    text: 'Two years of swirl marks gone in a single visit. The paint correction made my black sedan look better than the day I bought it. I won’t go anywhere else.',
    name: 'Priya Shah',
    city: 'San Diego, CA',
  },
  {
    text: 'They come to my office, detail the truck in the lot, and I drive home gleaming. The interior deep clean got out stains I thought were permanent. 10/10.',
    name: 'Marcus Trent',
    city: 'Denver, CO',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-brand-grey py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Chip>Reviews</Chip>
          </div>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">What Our Customers Say</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <Reveal key={r.name} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-card bg-white p-7 shadow-card">
                <div>
                  <div className="text-lg tracking-wide text-brand-blue">★★★★★</div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-slate-700">“{r.text}”</blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white">
                    {r.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.city}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
