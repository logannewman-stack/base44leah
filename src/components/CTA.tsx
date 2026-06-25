import { contactModal } from './useContactModal'

export default function CTA() {
  const open = (e: React.MouseEvent) => {
    e.preventDefault()
    contactModal.open()
  }
  return (
    <section id="contact" className="bg-gold py-24 text-black">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest2 text-black/60">Book in 60 seconds</p>
        <h2 className="mt-6 h-display text-5xl text-black sm:text-7xl">
          Ready for the showroom treatment?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-black/75">
          Tell us your vehicle and pick a time — we bring the shine to you. Upfront pricing, fully
          insured, and a finish you'll be proud to park anywhere.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={open}
            className="inline-flex items-center justify-center gap-2 bg-black px-9 py-4 text-sm font-bold uppercase tracking-wider2 text-gold transition-colors hover:bg-ink-800"
          >
            Book my detail
          </a>
          <a
            href="#contact"
            onClick={open}
            className="inline-flex items-center justify-center gap-2 border border-black/40 px-9 py-4 text-sm font-bold uppercase tracking-wider2 text-black transition-colors hover:bg-black hover:text-gold"
          >
            Request a free quote
          </a>
        </div>
      </div>
    </section>
  )
}
