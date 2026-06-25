import { useState } from 'react'

/** YouTube background-video params: autoplay, muted, looped, no chrome. */
function bgSrc(id: string, start: number) {
  const p = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: id,
    controls: '0',
    modestbranding: '1',
    playsinline: '1',
    disablekb: '1',
    fs: '0',
    iv_load_policy: '3',
    rel: '0',
    start: String(start),
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${p.toString()}`
}

/**
 * A muted, looping YouTube clip cropped to completely cover its container like a
 * background video — no player UI, not interactive. The footage itself becomes
 * the visual.
 */
export function CoverVideo({ id, start = 0, title }: { id: string; start?: number; title: string }) {
  return (
    <iframe
      title={title}
      src={bgSrc(id, start)}
      allow="autoplay; encrypted-media; picture-in-picture"
      tabIndex={-1}
      aria-hidden
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100vw',
        height: '56.25vw', // 16:9
        minWidth: '177.78vh', // 16/9 of viewport height
        minHeight: '100vh',
        transform: 'translate(-50%, -50%)',
        border: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

/**
 * A real video still that covers its container, stepping down resolution on
 * error and finally to a solid backdrop — never a broken-image icon. Used as the
 * poster behind each CoverVideo so a real frame shows instantly and as a fallback.
 */
export function Thumb({ id, className = '' }: { id: string; className?: string }) {
  const [lvl, setLvl] = useState(0)
  if (lvl >= 3) return <div className={`absolute inset-0 bg-ink-800 ${className}`} />
  const res = ['maxresdefault', 'hqdefault', 'sddefault'][lvl]
  return (
    <img
      src={`https://i.ytimg.com/vi/${id}/${res}.jpg`}
      onError={() => setLvl((l) => l + 1)}
      alt=""
      aria-hidden
      loading="lazy"
      className={`absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover ${className}`}
    />
  )
}
