const reviews = [
  {
    quote: 'My black truck was covered in swirl marks. They corrected the paint and ceramic coated it — water just rolls right off now and it looks better than new.',
    name: 'Marcus Delgado',
    car: 'Ram 1500 · Ceramic',
  },
  {
    quote: 'They detailed my car in my office parking lot while I worked. Wheels spotless, interior smelled brand new. Unreal convenience and quality.',
    name: 'Priya Nair',
    car: 'Audi Q5 · Full Detail',
  },
  {
    quote: 'Three kids and a dog — the back seat was a disaster. The deep extraction pulled out things I forgot I lost. Cabin feels showroom fresh again.',
    name: 'Jenna Holt',
    car: 'Honda Pilot · Interior',
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="relative scroll-mt-24 border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <p className="eyebrow">Reviews</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl">
          Drivers who never <span className="text-brand-400">looked back.</span>
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="card flex flex-col justify-between p-7">
              <div>
                <div className="text-brand-400">★★★★★</div>
                <blockquote className="mt-4 text-white/80">“{r.quote}”</blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 font-display font-bold text-white">
                  {r.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
                <div>
                  <p className="font-semibold text-white">{r.name}</p>
                  <p className="text-sm text-white/50">{r.car}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
