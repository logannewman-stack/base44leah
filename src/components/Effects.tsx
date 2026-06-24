import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

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

type Ripple = { id: number; x: number; y: number; hue: 'blue' | 'purple' }

/**
 * Neon "echo" cursor: a tight glowing core follows the pointer, and as it moves
 * it emits expanding blue/purple rings that wash outward and fade — a sonar-like
 * echo rather than a static glow.
 */
export function CursorGlow() {
  const [fine, setFine] = useState(true)
  const [ripples, setRipples] = useState<Ripple[]>([])

  const cx = useMotionValue(-200)
  const cy = useMotionValue(-200)
  const sx = useSpring(cx, { stiffness: 600, damping: 30, mass: 0.4 })
  const sy = useSpring(cy, { stiffness: 600, damping: 30, mass: 0.4 })

  const idRef = useRef(0)
  const lastSpawn = useRef(0)
  const toggle = useRef(false)

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches)
    let frame = 0
    const move = (e: PointerEvent) => {
      cx.set(e.clientX)
      cy.set(e.clientY)
      const now = e.timeStamp
      if (now - lastSpawn.current > 95) {
        lastSpawn.current = now
        toggle.current = !toggle.current
        const r: Ripple = {
          id: idRef.current++,
          x: e.clientX,
          y: e.clientY,
          hue: toggle.current ? 'blue' : 'purple',
        }
        // keep the array small
        setRipples((prev) => [...prev.slice(-8), r])
      }
      cancelAnimationFrame(frame)
    }
    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [cx, cy])

  if (!fine) return null

  const ring = (hue: Ripple['hue']) =>
    hue === 'blue'
      ? '0 0 24px 2px rgba(34,211,238,0.55), inset 0 0 18px rgba(34,211,238,0.35)'
      : '0 0 24px 2px rgba(168,85,247,0.55), inset 0 0 18px rgba(168,85,247,0.35)'

  return (
    <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden" aria-hidden>
      {/* expanding echo rings */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full"
            initial={{ width: 26, height: 26, x: r.x - 13, y: r.y - 13, opacity: 0.7 }}
            animate={{ width: 320, height: 320, x: r.x - 160, y: r.y - 160, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            onAnimationComplete={() => setRipples((prev) => prev.filter((p) => p.id !== r.id))}
            style={{
              border: `1.5px solid ${r.hue === 'blue' ? 'rgba(34,211,238,0.6)' : 'rgba(168,85,247,0.6)'}`,
              boxShadow: ring(r.hue),
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </AnimatePresence>

      {/* neon core */}
      <motion.span
        className="absolute h-4 w-4 rounded-full"
        style={{
          x: sx,
          y: sy,
          marginLeft: -8,
          marginTop: -8,
          background: 'radial-gradient(circle, rgba(120,210,255,0.95), rgba(168,85,247,0.5) 60%, transparent 72%)',
          boxShadow: '0 0 18px 4px rgba(56,140,255,0.7), 0 0 30px 8px rgba(168,85,247,0.4)',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}
