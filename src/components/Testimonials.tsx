import { Chip, Reveal } from './ui'

const reviews = [
  { text: 'Booked Sunday night and my car was spotless in my own driveway by Monday lunch. Months later the ceramic coating still beads water like day one. Unreal.', name: 'Jordan M.', car: 'Tesla Model 3' },
  { text: 'Two years of swirl marks and scratches — gone in a single visit. It honestly looks better than the day I drove it off the lot. Worth every penny.', name: 'Priya S.', car: 'BMW X5' },
  { text: 'I never have to leave the house and the truck comes back showroom-clean every single time. They handle our whole family’s cars now.', name: 'Mike T.', car: 'Ford F-150' },
  { text: 'Professional, on time, and the interior looked and smelled brand new. The steam clean got out stains I thought were permanent.', name: 'Alyssa R.', car: 'Audi Q7' },
  { text: 'The ceramic coating package is worth every dollar. Rain just sheets right off and washing it takes me ten minutes now.', name: 'Devon K.', car: 'Corvette C8' },
  { text: 'Easiest booking I’ve ever done — 60 seconds online, clear price, no surprises. The finish on my black paint is absolutely flawless.', name: 'Sophia L.', car: 'Mercedes C300' },
]

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Chip>Reviews</Chip>
          </div>
          <h2 className="mt-5 display text-4xl text-brand-ink sm:text-5xl">
            Loved by <span className="text-brand-blue">500+ drivers.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Reveal key={r.name} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-card">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-base tracking-wide text-amber-400">★★★★★</div>
                    <GoogleG />
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-slate-700">“{r.text}”</blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                    {r.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-ink">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.car}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex items-center justify-center gap-3">
          <GoogleG />
          <p className="text-sm font-medium text-slate-600">
            <span className="font-display text-xl font-bold text-brand-ink">4.9</span> / 5 ·
            <span className="ml-1 text-amber-400">★★★★★</span>
            <span className="ml-2 text-slate-400">based on 500+ Google reviews</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
