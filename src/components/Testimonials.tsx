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
    <section id="results" className="relative overflow-x-clip py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Depth3D className="mx-auto max-w-2xl text-center" power={0.7}>
          <div className="flex justify-center">
            <Eyebrow>Results</Eyebrow>
          </div>
          <h2 className="mt-6 font-display text-[2.15rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem] lg:text-[3rem]">
            Businesses that stopped <span className="gradient-text">missing calls.</span>
          </h2>
        </Depth3D>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <Depth3D key={q.name} className="h-full">
              <motion.figure
                whileHover={{ y: -6 }}
                className="glass flex h-full flex-col justify-between rounded-[1.75rem] p-8"
              >
                <div>
                  <div className="text-[0.9rem] tracking-[0.15em] text-cyber-blue">★★★★★</div>
                  <blockquote className="mt-5 text-[1.02rem] leading-relaxed text-neutral-700">“{q.quote}”</blockquote>
                </div>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 font-display font-bold text-white">
                    {q.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div>
                    <p className="font-semibold tracking-[-0.01em] text-neutral-900">{q.name}</p>
                    <p className="text-sm text-neutral-500">{q.role}</p>
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
