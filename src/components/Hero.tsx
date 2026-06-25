import { booking } from './useBooking'
import { CoverVideo, Thumb } from './media'

const stats = [
  { v: '600+', l: 'Cars detailed' },
  { v: '5.0', l: 'Star rating' },
  { v: '100%', l: 'Mobile service' },
]

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden">
      {/* full-bleed background footage */}
      <div className="absolute inset-0">
        <Thumb id="Kg-Ma7Ki3io" />
        <CoverVideo id="Kg-Ma7Ki3io" start={20} title="Sud Buds detailing reel" />
      </div>
      {/* legibility grade */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-ink-950/70" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-site px-5 pb-20 pt-32 sm:px-8 sm:pb-24">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-300">Mobile auto detailing · we come to you</p>
        <h1 className="mt-5 max-w-4xl font-display text-[2.9rem] font-extrabold leading-[0.95] tracking-tightest text-white drop-shadow-[0_3px_30px_rgba(0,0,0,0.8)] sm:text-7xl lg:text-[5.2rem]">
          A showroom finish, in your own <span className="text-brand-400">driveway.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)]">
          Wheel restoration, snow-foam hand wash, paint correction and ceramic coating — watch the
          whole process unfold as you scroll, then book your slot.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button onClick={() => booking.open()} className="btn-primary px-7 py-3.5 text-base">
            Book your detail
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <a href="#process" className="btn-ghost px-7 py-3.5 text-base">
            See the process
          </a>
        </div>

        <div className="mt-12 flex max-w-md items-center gap-8 border-t border-white/15 pt-6">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="font-display text-3xl font-extrabold text-white">{s.v}</p>
              <p className="mt-0.5 text-xs uppercase tracking-wider text-white/55">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/55">
        <div className="flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.3em]">
          Scroll
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  )
}
