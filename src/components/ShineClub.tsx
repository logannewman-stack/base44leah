import { Reveal } from './ui'
import { contactModal } from './useContactModal'

export default function Feature() {
  return (
    <section className="bg-brand-grey py-28">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-blueDark">Detail on Demand</p>
        <h2 className="mt-6 text-4xl font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-brand-ink sm:text-6xl">
          Mobile Detailing,
          <br />
          Done Right.
        </h2>
        <div className="mx-auto mt-8 h-1 w-20 rounded-full bg-brand-blue" />
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-700">
          Skip the drop-off, the waiting room, and the drive-thru wash. We bring a complete
          professional detailing setup to your door — pro-grade products, certified detailers, and a
          100% satisfaction guarantee — and leave your vehicle looking flawless.
        </p>
        <div className="mt-9 flex justify-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              contactModal.open()
            }}
            className="btn-primary px-8 py-4 text-base uppercase tracking-[0.12em]"
          >
            Get a Free Quote
          </a>
        </div>
      </Reveal>
    </section>
  )
}
