import { motion } from 'framer-motion'
import { Eyebrow, Reveal } from './ui'

const quotes = [
  {
    quote:
      'We were missing 40% of our calls after hours. FrontDeskAI books appointments while we sleep — it paid for itself in the first week.',
    name: 'Dr. Amara Okafor',
    role: 'Brightline Dental',
  },
  {
    quote:
      'Callers genuinely think they’re talking to our receptionist. It’s that natural. Our front desk team finally focuses on patients in the room.',
    name: 'Marcus Reyes',
    role: 'Apex Physical Therapy',
  },
  {
    quote:
      'Every lead now lands in our CRM with a summary. No more sticky notes, no more lost jobs. Our booked revenue is up 38%.',
    name: 'Jenna Holt',
    role: 'Holt Home Services',
  },
]

export default function Testimonials() {
  return (
    <section id="results" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>Results</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Businesses that stopped <span className="gradient-text">missing calls.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.1}>
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
