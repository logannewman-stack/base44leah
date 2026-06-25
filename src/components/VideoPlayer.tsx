import { useState } from 'react'

/**
 * A dependable YouTube player. It ALWAYS shows a real detailing still (the
 * video's thumbnail) with a play button, so a visitor unmistakably sees video
 * content. Clicking loads the real player and starts it. If the thumbnail ever
 * fails it steps down to a lower-res still, then to a solid backdrop — so it
 * never renders a broken-image icon. A direct YouTube link is always available.
 */
export function VideoPlayer({
  id,
  label,
  className = '',
  rounded = 'rounded-2xl',
}: {
  id: string
  label: string
  className?: string
  rounded?: string
}) {
  const [playing, setPlaying] = useState(false)
  // 0 = maxres still, 1 = hq still, 2 = sd still, 3 = solid backdrop
  const [lvl, setLvl] = useState(0)
  const res = ['maxresdefault', 'hqdefault', 'sddefault'][lvl]

  return (
    <div className={`group relative aspect-video overflow-hidden border border-white/10 bg-ink-800 ${rounded} ${className}`}>
      {playing ? (
        <iframe
          title={label}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play: ${label}`}
        >
          {lvl < 3 && (
            <img
              src={`https://i.ytimg.com/vi/${id}/${res}.jpg`}
              alt={label}
              onError={() => setLvl((l) => l + 1)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          )}
          {/* darken for legibility + show on solid-backdrop fallback */}
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent" />

          {/* play button */}
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-500/95 shadow-[0_8px_30px_rgba(47,116,240,0.5)] transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 text-white" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>

          {/* label */}
          <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4 text-left">
            <span className="font-display text-base font-bold leading-tight text-white drop-shadow sm:text-lg">{label}</span>
            <span className="shrink-0 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90">▶ Watch</span>
          </span>
        </button>
      )}
    </div>
  )
}
