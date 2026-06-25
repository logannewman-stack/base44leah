import { contactModal } from './useContactModal'

export default function CTA() {
  const open = (e: React.MouseEvent) => {
    e.preventDefault()
    contactModal.open()
  }
  return (
    <section id="contact" className="bg-gradient-to-r from-brand-blueDark to-brand-blue">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
        <h2 className="text-4xl font-extrabold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
          Your Car Won't Detail Itself.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
          Join 2,000+ happy customers. Book online in 60 seconds — we handle everything else.
        </p>
        <div className="mt-9 flex justify-center">
          <a
            href="#contact"
            onClick={open}
            className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-semibold text-brand-blueDark shadow-lg transition-transform duration-200 hover:scale-[1.03]"
          >
            Book My Detail Now
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
        <p className="mt-6 text-sm text-white/80">Next available: Tomorrow · No credit card required to book</p>
      </div>
    </section>
  )
}
