import { Button, Reveal } from './ui'

export default function ShineClub() {
  return (
    <section className="bg-white py-28 text-black">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest2 text-black/50">
          Detail on Demand Membership
        </p>
        <h2 className="mt-6 h-display text-6xl text-black sm:text-7xl lg:text-8xl">
          The Shine Club
        </h2>
        <div className="mx-auto mt-8 h-px w-24 bg-black" />
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg">
          Keep your vehicle showroom-ready all year long. Members get priority booking, recurring
          maintenance details delivered right to their door, and exclusive pricing on ceramic
          coatings and paint correction — all for one simple monthly rate. Never wash your own car
          again.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="#contact" variant="gold" className="px-9 py-4">
            Join the Shine Club
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
