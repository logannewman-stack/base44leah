import { Reveal } from './ui'

const reviews = [
  {
    text: 'I was skeptical about mobile detailing but Detail on Demand blew me away. My 2022 BMW looks better than it did when I drove it off the lot. Worth every penny.',
    name: 'Marcus T.',
    city: 'Dallas, TX',
  },
  {
    text: "Booked online in under a minute. They showed up exactly on time, worked for 3 hours straight, and I genuinely couldn't believe how clean my SUV was. Five stars isn't enough.",
    name: 'Jennifer R.',
    city: 'Plano, TX',
  },
  {
    text: "Got the ceramic coating package. It's been 8 months and water still beads off perfectly. The paint looks showroom new. Best investment I've made for my car.",
    name: 'Derek M.',
    city: 'Frisco, TX',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">What Our Customers Say</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <Reveal key={r.name} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                <div className="text-lg tracking-wide text-brand-blue">★★★★★</div>
                <blockquote className="mt-4 flex-1 text-[18px] italic leading-relaxed text-gray-700">“{r.text}”</blockquote>
                <figcaption className="mt-6">
                  <p className="text-base font-bold text-brand-ink">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.city}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
