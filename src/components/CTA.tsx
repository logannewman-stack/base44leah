import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton, Reveal } from './ui'

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])

  return (
    <section id="contact" ref={ref} className="relative py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          style={{ scale }}
          className="glow-border relative overflow-hidden rounded-[2.5rem] glass-strong px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyber-cyan/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyber-violet/20 blur-[100px]" />

          <Reveal>
            <h2 className="relative font-display text-4xl font-bold leading-tight sm:text-6xl">
              Let's build your <span className="gradient-text">growth engine.</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/65">
              Tell us about your business and we'll map out exactly which services will move the
              needle — no pressure, no jargon, just a clear plan.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              <MagneticButton href="#contact">
                Speak with a representative
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </MagneticButton>
              <MagneticButton href="#services" variant="ghost">
                See what we offer
              </MagneticButton>
            </div>
            <p className="relative mt-6 text-sm text-white/40">Fully managed · Tailored to your business</p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  )
}
