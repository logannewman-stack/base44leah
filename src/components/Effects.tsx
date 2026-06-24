import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Thin gradient bar at the very top tracking scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-violet shadow-[0_0_14px_rgba(59,130,246,0.9)]"
    />
  )
}

/**
 * A neon blue→purple cursor glow built from several layers that each follow the
 * pointer with progressively softer springs, producing a trailing "comet" lag.
 */
const TRAIL = [
  { size: 360, stiffness: 220, color: 'rgba(56,140,255,0.30)', blur: 0 },
  { size: 320, stiffness: 130, color: 'rgba(80,120,255,0.24)', blur: 0 },
  { size: 280, stiffness: 80, color: 'rgba(139,92,246,0.22)', blur: 0 },
  { size: 220, stiffness: 48, color: 'rgba(168,85,247,0.18)', blur: 0 },
  { size: 150, stiffness: 28, color: 'rgba(192,90,255,0.16)', blur: 0 },
]

function TrailLayer({
  mx,
  my,
  layer,
}: {
  mx: ReturnType<typeof useMotionValue<number>>
  my: ReturnType<typeof useMotionValue<number>>
  layer: (typeof TRAIL)[number]
}) {
  const cfg = { stiffness: layer.stiffness, damping: 24, mass: 0.6 }
  const x = useSpring(mx, cfg)
  const y = useSpring(my, cfg)
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 rounded-full"
      style={{
        x,
        y,
        width: layer.size,
        height: layer.size,
        marginLeft: -layer.size / 2,
        marginTop: -layer.size / 2,
        background: `radial-gradient(circle, ${layer.color}, transparent 68%)`,
        mixBlendMode: 'screen',
      }}
    />
  )
}

export function CursorGlow() {
  const [fine, setFine] = useState(true)
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches)
    const move = (e: PointerEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [mx, my])

  if (!fine) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]">
      {TRAIL.map((layer, i) => (
        <TrailLayer key={i} mx={mx} my={my} layer={layer} />
      ))}
    </div>
  )
}
