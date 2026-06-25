import { contactModal } from './useContactModal'
import { Photo } from './Photo'
import { IMAGES } from '../images'

export default function Hero() {
  const open = (e: React.MouseEvent) => {
    e.preventDefault()
    contactModal.open()
  }
  return (
    <section id="top" className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      {/* full-bleed hero photo */}
      <div className="absolute inset-0">
        <Photo src={IMAGES.hero} alt="Professional detailer working on a luxury car" eager className="h-full w-full" gradient="from-slate-800 to-brand-ink">
          {/* legibility overlay (navy → blue tint) */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ink/80 via-brand-ink/55 to-brand-ink/85" />
          <div className="absolute inset-0 bg-brand-blueDark/15" />
        </Photo>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-sky">Mobile Detailing · We Come to You</p>

        <h1 className="mt-6 text-4xl font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-white sm:text-6xl lg:text-7xl">
          Showroom Shine,
          <br />
          <span className="text-brand-sky">Delivered to Your Door.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85">
          Premium mobile detailing, ceramic coatings, and paint correction — brought straight to your
          driveway. Book in 60 seconds and we handle the rest.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={open}
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-9 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-blue transition-colors hover:bg-brand-blueDark"
          >
            Book My Detail
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-9 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-brand-ink"
          >
            View Services
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </div>
    </section>
  )
}
