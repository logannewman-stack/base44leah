import { Reveal } from './ui'
import { Photo } from './Photo'
import { IMAGES } from '../images'

const steps = [
  { n: 1, t: 'Book in 60 Seconds', d: 'Choose your service and pick a time that works for you. No phone calls required.', img: IMAGES.steps[0] },
  { n: 2, t: 'We Come to You', d: "Our certified detailers arrive with everything they need — you don't lift a finger.", img: IMAGES.steps[1] },
  { n: 3, t: 'Drive Away Gleaming', d: 'Leave with a showroom-clean car and a smile. Satisfaction guaranteed or we come back.', img: IMAGES.steps[2] },
]

export default function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="h-section">Simple. Easy. Done.</h2>
        </Reveal>

        <div className="relative mt-16 grid gap-12 md:grid-cols-3">
          {/* dashed connecting line */}
          <div className="pointer-events-none absolute left-[17%] right-[17%] top-8 hidden border-t-2 border-dashed border-sky-200 md:block" />
          {steps.map((s) => (
            <Reveal key={s.n} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-brand-badge text-2xl font-extrabold text-brand-blue ring-8 ring-white">
                {s.n}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-brand-ink">{s.t}</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-gray-700">{s.d}</p>
              <Photo src={s.img} alt={s.t} className="mt-6 h-20 w-20 rounded-full ring-4 ring-brand-grey" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
