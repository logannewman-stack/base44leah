import { Eyebrow, Reveal } from './ui'

const grads = [
  'from-zinc-700 to-black',
  'from-amber-900/40 to-black',
  'from-neutral-700 to-black',
  'from-zinc-800 to-black',
  'from-stone-700 to-black',
  'from-neutral-800 to-black',
  'from-amber-800/40 to-black',
  'from-zinc-700 to-black',
]

function PlayIcon() {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-black/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
      <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 text-white" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  )
}

export default function Instagram() {
  return (
    <section id="gallery" className="bg-black py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Eyebrow>The Gallery</Eyebrow>
            <h2 className="mt-4 h-display text-5xl text-white sm:text-6xl">
              Follow the <span className="text-gold">shine</span>
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-7 py-3.5"
          >
            @detailondemand
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {grads.map((g, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex aspect-square items-center justify-center overflow-hidden border border-white/10 bg-gradient-to-br ${g}`}
            >
              <PlayIcon />
              <span className="absolute inset-0 bg-gold/0 transition-colors duration-300 group-hover:bg-gold/10" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
