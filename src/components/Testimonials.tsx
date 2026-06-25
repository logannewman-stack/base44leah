import { motion } from 'framer-motion'
import { Depth3D, Eyebrow } from './ui'

const quotes = [
  {
    quote:
      'My black truck had swirl marks everywhere. They corrected the paint and ceramic coated it — it looks better than the day I bought it. Water just rolls right off now.',
    name: 'Marcus Delgado',
    role: 'Ram 1500 · Ceramic',
  },
  {
    quote:
      'They came to my office and detailed my car in the parking lot while I worked. The wheels were spotless and the interior smelled brand new. Unreal convenience.',
    name: 'Priya Nair',
    role: 'Audi Q5 · Full Detail',
  },
  {
    quote:
      'Three kids and a dog — the back seat was a disaster. The deep interior extraction pulled out things I forgot I lost. Cabin looks and feels showroom fresh again.',
    name: 'Jenna Holt',
    role: 'Honda Pilot · Interior',
  },
]

export default function Testimonials() {
  return (
    <section id="results" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Depth3D className="mx-auto max-w-2xl text-center" power={0.7}>
          <div className="flex justify-center">
            <Eyebrow>Reviews</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Drivers who never <span className="gradient-text">looked back.</span>
          </h2>
        </Depth3D>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {quotes.map((q) => (
            <Depth3D key={q.name} className="h-full">
              <motion.figure
                whileHover={{ y: -6 }}
                className="glass flex h-full flex-col justify-between rounded-3xl p-7"
              >
                <div>
                  <div className="text-cyber-cyan">★★★★★</div>
                  <blockquote className="mt-4 text-white/80">“{q.quote}”</blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-violet font-display font-bold text-ink-900">
                    {q.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{q.name}</p>
                    <p className="text-sm text-white/50">{q.role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            </Depth3D>
          ))}
        </div>
      </div>
    </section>
  )
}
