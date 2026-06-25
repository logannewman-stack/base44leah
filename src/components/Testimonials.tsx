import { Reveal } from './ui'

const reviews = [
  { text: 'I was skeptical about mobile detailing but Detail on Demand blew me away. My 2022 BMW looks better than it did when I drove it off the lot. Worth every penny.', name: 'Marcus T.', city: 'Dallas, TX' },
  { text: "Booked online in under a minute. They showed up exactly on time and I couldn't believe how clean my SUV was. Five stars isn't enough.", name: 'Jennifer R.', city: 'Plano, TX' },
  { text: "Got the ceramic coating package. It's been 8 months and water still beads off perfectly. The paint looks showroom new. Best investment I've made for my car.", name: 'Derek M.', city: 'Frisco, TX' },
]

function GoogleG({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-brand-grey py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-blueDark">Reviews</p>
          <h2 className="mt-4 text-4xl font-extrabold uppercase tracking-[-0.01em] text-brand-ink sm:text-5xl">What Our Customers Say</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <Reveal key={r.name} className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-7 shadow-md">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="text-lg tracking-wide text-amber-400">★★★★★</div>
                    <GoogleG />
                  </div>
                  <blockquote className="mt-4 text-[15px] leading-relaxed text-gray-700">“{r.text}”</blockquote>
                </div>
                <figcaption className="mt-6 border-t border-gray-100 pt-5">
                  <p className="text-sm font-bold text-brand-ink">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.city}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex items-center justify-center gap-3">
          <GoogleG className="h-6 w-6" />
          <p className="text-sm font-medium text-gray-700">
            <span className="font-bold text-brand-ink">4.9</span> of 5 ·
            <span className="ml-1 text-amber-400">★★★★★</span>
            <span className="ml-2 text-gray-500">based on 500+ Google reviews</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
