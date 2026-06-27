import { motion } from 'framer-motion'
import { Depth3D, Eyebrow } from './ui'

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
    <section id="results" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Depth3D className="mx-auto max-w-2xl text-center" power={0.7}>
          <div className="flex justify-center">
            <Eyebrow>Results</Eyebrow>
          </div>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tightest text-balance sm:text-5xl">
            Businesses that stopped <span className="gradient-text">missing calls.</span>
          </h2>
        </Depth3D>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {quotes.map((q) => (
            <Depth3D key={q.name} className="h-full">
              <motion.figure
                whileHover={{ y: -6 }}
                className="spotlight glass flex h-full flex-col justify-between rounded-3xl p-7 shadow-card"
              >
                <div>
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-white/15" fill="currentColor">
                    <path d="M7.2 6C4.9 7.4 3.5 9.8 3.5 12.6c0 2.9 1.9 4.9 4.3 4.9 2.1 0 3.7-1.6 3.7-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.9.1-1 .1.3-1.4 1.6-3 3.2-3.9L7.2 6zm9 0c-2.3 1.4-3.7 3.8-3.7 6.6 0 2.9 1.9 4.9 4.3 4.9 2.1 0 3.7-1.6 3.7-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.9.1-1 .1.3-1.4 1.6-3 3.2-3.9L16.2 6z" />
                  </svg>
                  <div className="mt-3 text-cyber-cyan">★★★★★</div>
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
