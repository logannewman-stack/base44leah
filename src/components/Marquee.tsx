import { motion } from 'framer-motion'

const items = [
  'Dental Practices',
  'Law Firms',
  'Med Spas',
  'Home Services',
  'Real Estate',
  'Auto Detailing',
  'Salons',
  'Clinics',
  'Contractors',
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <section className="relative border-y border-black/[0.06] py-8">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-neutral-500">
        Powering front desks across every industry
      </p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
        <motion.div
          className="flex shrink-0 items-center gap-12 pr-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {row.map((item, i) => (
            <span
              key={i}
              className="whitespace-nowrap font-display text-xl font-medium text-neutral-500 transition-colors hover:text-neutral-800"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
