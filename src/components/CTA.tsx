import { booking } from './useBooking'

export default function CTA() {
  return (
    <section id="book" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-850 px-7 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-600/20 blur-[110px]" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-brand-500/15 blur-[110px]" />

          <h2 className="relative font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
            Ready for that <span className="text-brand-400">showroom shine?</span>
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg text-white/65">
            Tell us your vehicle and what you're after — we'll recommend the perfect detail and
            get you on the schedule. We come to you, gear and water included.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <button onClick={() => booking.open()} className="btn-primary px-7 py-3.5 text-base">
              Book your detail
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <a href="#pricing" className="btn-ghost px-7 py-3.5 text-base">
              View packages
            </a>
          </div>
          <p className="relative mt-6 text-sm text-white/40">Fully insured · Mobile · Satisfaction guaranteed</p>
        </div>
      </div>
    </section>
  )
}
