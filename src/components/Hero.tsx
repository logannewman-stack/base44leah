import { booking } from './useBooking'
import { VideoPlayer } from './VideoPlayer'

const stats = [
  { v: '600+', l: 'Cars detailed' },
  { v: '5.0', l: 'Star rating' },
  { v: '100%', l: 'Mobile service' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pb-24">
      {/* soft brand glow, not neon */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[34rem] w-[34rem] rounded-full bg-brand-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[30rem] w-[30rem] rounded-full bg-brand-500/10 blur-[150px]" />

      <div className="relative mx-auto grid max-w-site items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-riseIn">
          <p className="eyebrow">Mobile auto detailing · we come to you</p>
          <h1 className="mt-5 font-display text-[2.7rem] font-extrabold leading-[0.98] tracking-tightest text-white sm:text-6xl lg:text-[4.4rem]">
            A showroom finish,
            <br />
            in your own <span className="text-brand-400">driveway.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Sud Buds brings the full studio to you — wheel restoration, a snow-foam hand wash,
            paint correction, ceramic coating and a deep interior clean. Watch the real work
            below, then grab a slot.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={() => booking.open()} className="btn-primary px-7 py-3.5 text-base">
              Book your detail
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <a href="#work" className="btn-ghost px-7 py-3.5 text-base">
              Watch our work
            </a>
          </div>

          <div className="mt-10 flex max-w-md items-center gap-8">
            {stats.map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl font-extrabold text-white">{s.v}</p>
                <p className="mt-0.5 text-xs uppercase tracking-wider text-white/45">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* featured reel — a real, playable video, front and center */}
        <div className="animate-riseIn [animation-delay:120ms]">
          <div className="relative">
            <span className="absolute -inset-3 -z-10 rounded-[1.6rem] bg-brand-600/10 blur-2xl" />
            <VideoPlayer id="CQo1gb21ilg" label="Watch a full Sud Buds detail" className="shadow-2xl" />
          </div>
          <p className="mt-3 text-center text-sm text-white/45">▶ Tap to play — real footage, sound on</p>
        </div>
      </div>
    </section>
  )
}
