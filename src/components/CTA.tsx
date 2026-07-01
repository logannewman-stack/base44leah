import { Depth3D, MagneticButton } from './ui'

export default function CTA() {
  return (
    <section id="contact" className="relative overflow-x-clip py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Depth3D power={0.9}>
          <div className="glow-border relative overflow-hidden rounded-[2.5rem] glass-strong px-8 py-20 text-center sm:px-16">
            <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
            <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-black/[0.03] blur-[100px]" />
            <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-black/[0.03] blur-[100px]" />

            <h2 className="relative font-display text-[2.4rem] font-bold leading-[1.06] tracking-[-0.035em] sm:text-[3.5rem]">
              Let's build your <span className="gradient-text">growth engine.</span>
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl text-[1.07rem] leading-[1.6] text-neutral-500">
              Tell us about your business and we'll map out exactly which services will move the
              needle — no pressure, no jargon, just a clear plan.
            </p>
            <div className="relative mt-9 flex flex-col justify-center gap-4 sm:flex-row sm:flex-wrap">
              <MagneticButton href="#contact" className="w-full sm:w-auto">
                Speak with a representative
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </MagneticButton>
              <MagneticButton href="#services" variant="ghost" className="w-full sm:w-auto">
                See what we offer
              </MagneticButton>
            </div>
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[0.82rem] font-medium text-neutral-500">
              {['Free strategy call', 'No commitment', 'Reply within minutes'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-cyber-blue" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </Depth3D>
      </div>
    </section>
  )
}
