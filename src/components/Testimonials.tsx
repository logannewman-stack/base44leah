import { motion } from 'framer-motion'
import { Depth3D, Eyebrow } from './ui'

const quotes = [
  {
    quote:
      'Booked Sunday night, and my car was spotless in my own driveway by Monday lunch. Months later the ceramic coating still beads water like day one. Unreal.',
    name: 'Jordan M.',
    role: 'Tesla Model 3 owner',
  },
  {
    quote:
      'Two years of swirl marks and scratches — gone in a single visit. It honestly looks better than the day I drove it off the lot. Worth every penny.',
    name: 'Priya S.',
    role: 'BMW X5 owner',
  },
  {
    quote:
      'I never have to leave the house and the truck comes back showroom-clean every single time. They handle our whole family’s cars now.',
    name: 'Mike T.',
    role: 'Ford F-150 owner',
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
            Drivers who'll never go back to <span className="gradient-text">a drive-thru wash.</span>
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
