import { contactModal } from './useContactModal'

export default function CTA() {
  const open = (e: React.MouseEvent) => {
    e.preventDefault()
    contactModal.open()
  }
  return (
    <section id="contact" className="bg-brand-blue">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
        <h2 className="display text-4xl text-white sm:text-5xl">Ready for a Showroom Shine?</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/90">
          Book online in 60 seconds — we handle the rest. Pick a time, and we bring the shine to you.
        </p>
        <div className="mt-9 flex justify-center">
          <a
            href="#contact"
            onClick={open}
            className="inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 text-base font-bold text-brand-blueDark shadow-soft transition-transform duration-200 hover:scale-[1.03]"
          >
            Book My Detail Now
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/85">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white" /> Next available: Tomorrow
          </span>
          <span className="hidden h-4 w-px bg-white/30 sm:block" />
          <span>★ 4.9/5 from 500+ reviews</span>
          <span className="hidden h-4 w-px bg-white/30 sm:block" />
          <span>Fully insured &amp; licensed</span>
        </div>
      </div>
    </section>
  )
}
