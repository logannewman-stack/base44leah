import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const PALETTE = ['#22d3ee', '#3b82f6', '#8b5cf6', '#e23bd2', '#2dd4bf', '#eaf6ff']
const GOLDEN = 2.399963229728653 // golden angle (rad)

type Dot = { x: number; y: number; size: number; color: string; twinkle: number }

/** Build a spiral of dots via a phyllotaxis (sunflower) layout for an even swirl. */
function makeDots(count: number, spread: number): Dot[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = i * GOLDEN
    const radius = Math.sqrt(i / count) * spread // % from centre
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
      size: 4 + (i % 6) * 2.6,
      color: PALETTE[i % PALETTE.length],
      twinkle: 2.5 + (i % 7) * 0.4,
    }
  })
}

const FAR = makeDots(160, 50)
const NEAR = makeDots(120, 50)

function Layer({ dots, rotate, scale, glow }: { dots: Dot[]; rotate: ReturnType<typeof useSpring>; scale: ReturnType<typeof useTransform<number, number>>; glow: number }) {
  return (
    <motion.div
      style={{ rotate, scale }}
      className="absolute left-1/2 top-1/2 h-[100vmax] w-[100vmax] -translate-x-1/2 -translate-y-1/2"
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            marginLeft: -d.size / 2,
            marginTop: -d.size / 2,
            background: d.color,
            boxShadow: `0 0 ${d.size * glow}px ${d.size * 0.6}px ${d.color}`,
          }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: d.twinkle, repeat: Infinity, ease: 'easeInOut', delay: (i % 9) * 0.2 }}
        />
      ))}
    </motion.div>
  )
}

/**
 * A pure-DOM/CSS neon spiral vortex (no WebGL — renders on every browser).
 * Two parallax layers of glowing multi-colour dots laid out in a spiral; as you
 * scroll the whole thing rotates and scales up, so you appear to spiral down
 * into it.
 */
export default function SpiralBg() {
  const { scrollYProgress } = useScroll()
  const farRot = useSpring(useTransform(scrollYProgress, [0, 1], [0, 540]), { stiffness: 40, damping: 22, mass: 0.6 })
  const nearRot = useSpring(useTransform(scrollYProgress, [0, 1], [0, 900]), { stiffness: 35, damping: 22, mass: 0.6 })
  const farScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.7])
  const nearScale = useTransform(scrollYProgress, [0, 1], [1.1, 2.6])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink-900">
      {/* idle slow spin so it's alive even before scrolling */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 160, repeat: Infinity, ease: 'linear' }}
      >
        <Layer dots={FAR} rotate={farRot} scale={farScale} glow={2.4} />
      </motion.div>
      <Layer dots={NEAR} rotate={nearRot} scale={nearScale} glow={3} />

      {/* neon core + light readability vignette */}
      <div className="absolute left-1/2 top-1/2 h-[36vmax] w-[36vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(56,140,255,0.28),_transparent_70%)] blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(4,6,15,0.45)_95%)]" />
    </div>
  )
}
