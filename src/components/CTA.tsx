import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton, Reveal } from './ui'

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])

  return (
    <section id="cta" ref={ref} className="relative py-28">
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
              Never miss another <span className="gradient-text">customer.</span>
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/65">
              Turn on your AI front desk today. It’s answering calls and booking jobs before
              your coffee gets cold.
            </p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-4">
              <MagneticButton href="#pricing">
                Start your free trial
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </MagneticButton>
              <MagneticButton href="#how" variant="ghost">
                Book a live demo
              </MagneticButton>
            </div>
            <p className="relative mt-6 text-sm text-white/40">No credit card · Live in 10 minutes</p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  )
}
