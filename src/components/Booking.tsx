import { images, salon } from '../data/salon'
import { Button, Eyebrow, Reveal } from './ui'
import { bookingModal } from './useContactModal'

export default function Booking() {
  return (
    <div id="book" className="relative overflow-hidden bg-ink-900 text-cream-100">
      {/* faint background image */}
      <img
        src={images.interior}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.12]"
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-champagne-500/15 blur-[130px]" />

      <div className="relative mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-20">
        {/* Left: invitation */}
        <Reveal>
          <Eyebrow className="text-champagne-400">Book your visit</Eyebrow>
          <h2 className="h-display mt-5 text-[clamp(2.4rem,5.5vw,4rem)] text-cream-100">
            Ready for hair<br /> you&apos;ll love?
          </h2>
          <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-cream-100/70">
            Reserve your appointment with {salon.owner} and let&apos;s create your next look together.
            New guests are always welcome — a complimentary consultation comes with every booking.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => bookingModal.open()}
              className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-cream-100 px-8 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink-900 transition-colors duration-300 hover:bg-champagne-400"
            >
              Book an Appointment
            </button>
            <Button href={salon.phoneHref} variant="ghost" className="text-cream-100 hover:text-champagne-400">
              Or call {salon.phoneDisplay}
            </Button>
          </div>
        </Reveal>

        {/* Right: details */}
        <Reveal delay={0.12}>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[4px] border border-cream-100/15 bg-cream-100/10 sm:grid-cols-2">
            <InfoCell label="Visit us" lines={[salon.addressLine1, salon.addressLine2]} />
            <InfoCell label="Contact" lines={[salon.phoneDisplay, salon.email]} />
            <div className="bg-ink-800/60 p-7 sm:col-span-2">
              <p className="text-[0.62rem] font-medium uppercase tracking-luxe text-champagne-400">Hours</p>
              <ul className="mt-4 space-y-2.5">
                {salon.hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between text-[0.92rem]">
                    <span className="text-cream-100/70">{h.day}</span>
                    <span className="font-medium text-cream-100">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

function InfoCell({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div className="bg-ink-800/60 p-7">
      <p className="text-[0.62rem] font-medium uppercase tracking-luxe text-champagne-400">{label}</p>
      <div className="mt-4 space-y-1">
        {lines.map((l) => (
          <p key={l} className="text-[0.95rem] text-cream-100/85">
            {l}
          </p>
        ))}
      </div>
    </div>
  )
}
