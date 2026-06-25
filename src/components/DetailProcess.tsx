import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

/**
 * DetailProcess — the cinematic centerpiece, now driven by REAL detailing video.
 *
 * Each stage is a full-bleed background video clip of actual detailing work
 * (wheels → snow-foam → dry-down → interior vacuum), pulled from YouTube so it
 * streams in every visitor's browser with no file-size limits. The active stage
 * is chosen by scroll; the clip auto-plays muted and looped behind the copy,
 * over a real video still that always loads instantly. A "Watch the full clip"
 * button opens the source on YouTube.
 *
 * To swap any clip, just change its `videoId` below (the 11-char YouTube id).
 */

const STAGES = [
  {
    key: 'wheels',
    no: '01',
    tag: 'Wheels & rims',
    videoId: '9K6aH9Y7Zk0',
    title: 'Faces, barrels & calipers — restored.',
    body:
      'Wheels come off the dirt first. We hit the face, the barrel, the lug seats and the brake calipers with pH-balanced iron remover and soft detail brushes until every spoke throws light like the day it left the showroom.',
    specs: ['Iron decontamination', 'Barrel-deep cleaning', 'Tire dressed & sealed'],
    accent: 'from-chrome-light to-chrome-mid',
  },
  {
    key: 'foam',
    no: '02',
    tag: 'Foam bath',
    videoId: 'HqUEirOEyaw',
    title: 'A thick snow-foam blanket lifts the grime.',
    body:
      'A clinging layer of pH-neutral snow foam encapsulates road film and grit, then rinses free — so nothing is ever dragged across your clear coat. Two-bucket hand wash, plush wash mitts, scratch-free every time.',
    specs: ['pH-neutral snow foam', 'Two-bucket hand wash', 'Grit-guard rinse'],
    accent: 'from-cyber-cyan to-cyber-blue',
  },
  {
    key: 'dry',
    no: '03',
    tag: 'Streak-free dry',
    videoId: 'OYpS3OhRYqc',
    title: 'Beaded, sheeted and dried to glass.',
    body:
      'Filtered water beads up and sheets off a freshly-sealed surface. We follow with plush microfiber and warm forced air into every shut-line and emblem — zero water spots, zero swirls, just a mirror finish.',
    specs: ['Spot-free filtered rinse', 'Forced-air dry', 'Sealant & gloss boost'],
    accent: 'from-cyber-blue to-cyber-violet',
  },
  {
    key: 'vacuum',
    no: '04',
    tag: 'Interior detail',
    videoId: 'JwVZkKvb73s',
    title: 'Every fiber vacuumed, every surface revived.',
    body:
      'Inside, we extract the dust, sand and pet hair buried deep in the carpet and seats, steam the touch-points, and dress every surface to a clean satin finish. You step into a cabin that smells and feels brand new.',
    specs: ['Deep carpet extraction', 'Steam-cleaned touch-points', 'UV-safe surface dressing'],
    accent: 'from-cyber-violet to-cyber-magenta',
  },
]

const N = STAGES.length

function ytEmbed(id: string) {
  const p = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: id,
    controls: '0',
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
    disablekb: '1',
    fs: '0',
    iv_load_policy: '3',
  })
  return `https://www.youtube-nocookie.com/embed/${id}?${p.toString()}`
}

/** A YouTube clip that covers the whole stage like a background video, sitting
 *  over its own still so something real is always on screen. Only the active
 *  stage mounts the iframe (one player at a time) for performance. */
function StageMedia({ stage, active }: { stage: (typeof STAGES)[number]; active: boolean }) {
  // 0 = try maxres still, 1 = fall back to hq still, 2 = still unavailable → gradient
  const [level, setLevel] = useState(0)
  const accentGrad: Record<string, string> = {
    wheels: 'radial-gradient(120% 100% at 70% 30%, #2a3340, #0a0e16 72%)',
    foam: 'radial-gradient(120% 100% at 60% 25%, #0c2a3f, #060b14 72%)',
    dry: 'radial-gradient(120% 100% at 65% 30%, #14213f, #060912 72%)',
    vacuum: 'radial-gradient(120% 100% at 60% 35%, #241338, #07060e 72%)',
  }
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* branded gradient base — guarantees the stage never looks broken */}
      <div className="absolute inset-0" style={{ background: accentGrad[stage.key] }} />
      {/* real video still — always visible, instant */}
      {level < 2 && (
        <img
          src={`https://i.ytimg.com/vi/${stage.videoId}/${level === 0 ? 'maxresdefault' : 'hqdefault'}.jpg`}
          alt={`${stage.tag} detailing`}
          onError={() => setLevel((l) => l + 1)}
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-110 object-cover"
          loading="lazy"
        />
      )}
      {/* auto-playing clip layered on top, cropped to cover */}
      {active && (
        <iframe
          title={`${stage.tag} — Sud Buds detailing`}
          src={ytEmbed(stage.videoId)}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          tabIndex={-1}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
          style={{ width: '100vw', height: '56.25vw', minWidth: '177.78vh', minHeight: '100vh' }}
        />
      )}
    </motion.div>
  )
}

function StageCopy({ stage }: { stage: (typeof STAGES)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -22, filter: 'blur(10px)' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-xl"
    >
      <span className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cyber-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-glow" />
        Step {stage.no} · {stage.tag}
      </span>
      <h3 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
        {stage.title}
      </h3>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85 drop-shadow-[0_1px_14px_rgba(0,0,0,0.9)]">{stage.body}</p>
      <ul className="mt-7 flex flex-wrap gap-2.5">
        {stage.specs.map((s) => (
          <li key={s} className={`rounded-full bg-gradient-to-r ${stage.accent} p-px`}>
            <span className="flex items-center gap-2 rounded-full bg-ink-900/80 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-cyber-cyan" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
              {s}
            </span>
          </li>
        ))}
      </ul>
      <a
        href={`https://www.youtube.com/watch?v=${stage.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 inline-flex items-center gap-2.5 rounded-full glass-strong px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-rose-600">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        Watch the full clip
      </a>
    </motion.div>
  )
}

export default function DetailProcess() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))))
  })
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section ref={ref} id="process" className="relative" style={{ height: `${N * 115}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink-900">
        {/* real detailing video per stage */}
        <div className="absolute inset-0">
          {STAGES.map((s, i) => (
            <StageMedia key={s.key} stage={s} active={active === i} />
          ))}
        </div>

        {/* legibility scrims */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/40 to-ink-900/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/85 via-transparent to-ink-900/65" />

        {/* giant ghost stage number */}
        <motion.span
          style={{ y: ghostY }}
          className="pointer-events-none absolute right-2 top-10 select-none font-display text-[28vw] font-bold leading-none text-white/[0.05] sm:text-[22vw] lg:right-10"
        >
          {STAGES[active].no}
        </motion.span>

        {/* section eyebrow */}
        <div className="absolute left-6 top-[11vh] z-10 sm:left-10 lg:left-16">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyber-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-glow" />
            The Sud Buds process · real footage
          </span>
          <h2 className="mt-3 max-w-md font-display text-2xl font-bold text-white/90 sm:text-3xl">
            Four obsessive stages. <span className="gradient-text">One flawless finish.</span>
          </h2>
        </div>

        {/* per-stage copy */}
        <div className="absolute inset-x-0 bottom-[11vh] z-10 px-6 sm:left-10 sm:right-auto sm:px-0 lg:left-16">
          <AnimatePresence mode="wait">
            <StageCopy key={STAGES[active].key} stage={STAGES[active]} />
          </AnimatePresence>
        </div>

        {/* stage rail */}
        <div className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
          {STAGES.map((s, i) => (
            <button
              key={s.key}
              onClick={() => {
                const el = ref.current
                if (!el) return
                const top = el.offsetTop + (el.offsetHeight - window.innerHeight) * (i / (N - 1))
                window.scrollTo({ top, behavior: 'smooth' })
              }}
              className="group flex items-center gap-3"
              aria-label={`Go to ${s.tag}`}
            >
              <span className={`text-right font-display text-xs font-semibold uppercase tracking-widest transition-colors ${active === i ? 'text-white' : 'text-white/35 group-hover:text-white/60'}`}>
                {s.tag}
              </span>
              <span className={`h-2.5 w-2.5 rounded-full transition-all ${active === i ? 'bg-gradient-to-br from-cyber-cyan to-cyber-violet shadow-glow' : 'bg-white/20 group-hover:bg-white/40'}`} />
            </button>
          ))}
        </div>

        {/* progress dashes */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {STAGES.map((s, i) => (
            <span key={s.key} className={`h-1 rounded-full transition-all duration-300 ${active === i ? 'w-8 bg-gradient-to-r from-cyber-cyan to-cyber-violet' : 'w-3 bg-white/25'}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
