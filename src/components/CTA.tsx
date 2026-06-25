import { Photo } from './Photo'
import { contactModal } from './useContactModal'
import { IMAGES } from '../images'

export default function CTA() {
  const open = (e: React.MouseEvent) => {
    e.preventDefault()
    contactModal.open()
  }
  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Photo
          src={IMAGES.cta}
          alt="A pristine, freshly detailed car"
          gradient="from-brand-ink to-slate-900"
          className="rounded-[2.5rem]"
        >
          <div className="absolute inset-0 bg-brand-ink/75" />
          <div className="relative px-6 py-20 text-center sm:px-12 sm:py-24">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-sky">Book in 60 seconds</p>
            <h2 className="mx-auto mt-5 max-w-2xl display text-4xl text-white sm:text-5xl">
              Ready for the showroom treatment?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
              Tell us your vehicle and pick a time — we bring the shine to you. Upfront pricing, fully
              insured, satisfaction guaranteed.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                onClick={open}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-8 py-4 text-base font-semibold text-white shadow-blue transition-colors hover:bg-brand-blueDark"
              >
                Book my detail
              </a>
              <a
                href="#contact"
                onClick={open}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white hover:text-brand-ink"
              >
                Request a free quote
              </a>
            </div>
          </div>
        </Photo>
      </div>
    </section>
  )
}
