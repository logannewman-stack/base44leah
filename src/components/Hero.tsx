import { Button } from './ui'

/**
 * Stylized top-down luxury car illustration used as a placeholder for a real
 * dark-studio hero photo. Swap the whole <CarTopDown/> for an <img> when you
 * have professional photography.
 */
function CarTopDown() {
  return (
    <svg viewBox="0 0 300 560" className="h-full w-auto" aria-hidden>
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a2a" />
          <stop offset="0.5" stopColor="#141414" />
          <stop offset="1" stopColor="#080808" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b4654" />
          <stop offset="0.5" stopColor="#11161c" />
          <stop offset="1" stopColor="#0a0d11" />
        </linearGradient>
        <radialGradient id="ground" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f5c518" stopOpacity="0.18" />
          <stop offset="1" stopColor="#f5c518" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft gold ground glow */}
      <ellipse cx="150" cy="290" rx="150" ry="250" fill="url(#ground)" />

      {/* wheels */}
      {[
        [50, 118],
        [228, 118],
        [50, 372],
        [228, 372],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="22" height="66" rx="9" fill="#000" stroke="#2c2c2c" strokeWidth="1.5" />
      ))}

      {/* mirrors */}
      <path d="M74 188 q-16 4 -18 16 q14 2 20 -4 z" fill="#161616" />
      <path d="M226 188 q16 4 18 16 q-14 2 -20 -4 z" fill="#161616" />

      {/* body */}
      <path
        d="M150 18 C95 26 78 70 76 142 C74 212 72 252 72 340 C72 432 82 502 110 536 C126 554 174 554 190 536 C218 502 228 432 228 340 C226 252 226 212 224 142 C222 70 205 26 150 18 Z"
        fill="url(#body)"
        stroke="#f5c518"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      {/* hood + roof highlight stripe */}
      <path d="M150 26 C120 32 108 64 106 120 L194 120 C192 64 180 32 150 26 Z" fill="#ffffff" fillOpacity="0.04" />

      {/* cabin glass */}
      <path
        d="M150 150 C122 152 108 172 108 212 C108 300 108 332 113 360 C118 386 182 386 187 360 C192 332 192 300 192 212 C192 172 178 152 150 150 Z"
        fill="url(#glass)"
        stroke="#000"
        strokeWidth="2"
      />
      {/* windshield reflection */}
      <path d="M150 156 C128 158 118 176 117 206 L183 206 C182 176 172 158 150 156 Z" fill="#ffffff" fillOpacity="0.08" />

      {/* rear deck line */}
      <path d="M112 470 L188 470" stroke="#000" strokeWidth="2" opacity="0.6" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section id="top" className="studio-vignette relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      {/* car illustration, centered behind the headline */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[78vh] max-h-[760px] opacity-90 drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]">
          <CarTopDown />
        </div>
      </div>

      {/* dark scrim so the headline stays crisp over the car */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_42%,rgba(0,0,0,0.65),transparent)]" />

      {/* foreground content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest2 text-gold">
          Mobile Detailing · Ceramic Coatings
        </p>

        <h1 className="mt-6 h-display text-6xl text-white sm:text-7xl lg:text-8xl">
          Showroom shine,
          <br />
          <span className="text-gold">on demand.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          Premium mobile detailing, ceramic coatings, and paint correction — delivered straight to
          your driveway. Book in 60 seconds. We bring the shine to you.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href="#contact" variant="gold" className="px-9 py-4">
            Book my detail
          </Button>
          <Button href="#services" variant="outline" className="px-9 py-4">
            View services
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider2 text-white/55">
          <span className="text-gold">★★★★★</span>
          <span>4.9 / 5 · 500+ reviews</span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span>2,000+ cars detailed</span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span>Fully insured &amp; mobile</span>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </div>
    </section>
  )
}
