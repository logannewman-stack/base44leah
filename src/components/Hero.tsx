import { motion } from 'framer-motion'
import { images, salon } from '../data/salon'
import { Button } from './ui'

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-cream-100 pt-[70px]">
      {/* soft warm glow accents */}
      <div className="pointer-events-none absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full bg-champagne-400/15 blur-[130px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-cream-300/50 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-12 px-6 pb-16 pt-14 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow"
          >
            <span className="h-px w-8 bg-champagne-500" />
            {salon.city}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
            className="h-display mt-6 text-[clamp(2.9rem,7vw,5.4rem)]"
          >
            Hair worth
            <br />
            <span className="italic text-champagne-600">falling</span> for.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease }}
            className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-ink-700/80"
          >
            A refined salon studio led by {salon.owner}, specializing in seamless extensions,
            hand-painted color and precision cuts — plus manicures and pedicures — in the heart of
            Des Moines.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="#book" variant="solid">
              Book an Appointment
            </Button>
            <Button href="#services" variant="outline">
              Explore Services
            </Button>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="mt-11 flex items-center gap-6"
          >
            <div className="flex items-center gap-1 text-champagne-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} />
              ))}
            </div>
            <div className="h-8 w-px bg-ink-900/15" />
            <p className="text-sm leading-tight text-ink-700/80">
              <span className="font-medium text-ink-900">Loved by 2,000+ clients</span>
              <br />
              across Central Iowa
            </p>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-t-[220px] rounded-b-[24px] border border-ink-900/10 shadow-card">
            <img
              src={images.hero}
              alt="Layla Sleiter styling a client's hair in her Des Moines salon studio"
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/15 to-transparent" />
          </div>

          {/* floating specialty card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="absolute -bottom-6 -left-4 flex items-center gap-3 rounded-[4px] border border-ink-900/10 bg-cream-50/95 px-5 py-4 shadow-soft backdrop-blur-sm sm:-left-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 font-display text-base font-semibold text-cream-100">
              {salon.monogram}
            </span>
            <div className="leading-tight">
              <p className="text-[0.62rem] font-medium uppercase tracking-luxe text-champagne-600">Specialty</p>
              <p className="font-display text-lg font-semibold text-ink-900">Hair Extensions</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Star() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6 2.2 9l6.8-.8L12 2z" />
    </svg>
  )
}
