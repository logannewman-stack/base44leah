import { motion } from 'framer-motion'
import { useIsMobile } from './useIsMobile'

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
  const isMobile = useIsMobile()
  return (
    <section className="relative border-y border-black/[0.06] py-8">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-neutral-500">
        Powering front desks across every industry
      </p>
      {isMobile ? (
        // Mobile: static wrapped list — no animation, no continuous main-thread work.
        <div className="mx-auto flex max-w-md flex-wrap justify-center gap-x-5 gap-y-2 px-6">
          {items.map((item) => (
            <span key={item} className="whitespace-nowrap font-display text-[0.95rem] font-medium text-neutral-500">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
          <motion.div
            className="flex shrink-0 items-center gap-12 pr-12"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[...items, ...items].map((item, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-display text-xl font-medium text-neutral-500 transition-colors hover:text-neutral-800"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  )
}
