import { VideoPlayer } from './VideoPlayer'

// Real detailing clips on YouTube — they stream in every visitor's browser.
// To swap one, just change its 11-character id.
const clips = [
  { id: '9K6aH9Y7Zk0', label: 'Wheels & rims — deep clean' },
  { id: 'HqUEirOEyaw', label: 'Snow-foam cannon wash' },
  { id: 'OYpS3OhRYqc', label: 'Streak-free dry-down' },
  { id: 'JwVZkKvb73s', label: 'Interior vacuum & extraction' },
  { id: 'Kg-Ma7Ki3io', label: 'Thick foam bath in 4K' },
  { id: 'odMibxdBdzY', label: 'Interior deep-clean transformation' },
]

export default function VideoReel() {
  return (
    <section id="work" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">See the work</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-5xl">
              Real details. <span className="text-brand-400">Real footage.</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/65">
              No stock photos, no gimmicks — just the satisfying process, start to finish.
              Tap any clip to play.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clips.map((c) => (
            <VideoPlayer key={c.id} id={c.id} label={c.label} />
          ))}
        </div>
      </div>
    </section>
  )
}
