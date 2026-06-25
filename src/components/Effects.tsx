import { motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
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

const TAIL = 26 // number of points in the comet trail

/**
 * Luxe cursor: a soft aura lights and lifts the space around the pointer, while
 * a thick, glowing blue→violet ribbon (soft outer glow + bright core) trails the
 * head with a smooth lag.
 */
export function CursorGlow() {
  const [fine, setFine] = useState(true)
  const [pts, setPts] = useState<{ x: number; y: number }[]>(() => Array.from({ length: TAIL }, () => ({ x: -200, y: -200 })))
  const mouse = useRef({ x: -200, y: -200 })

  // soft aura that lags behind for the "space moving around the cursor" feel
  const mvx = useMotionValue(-200)
  const mvy = useMotionValue(-200)
  const auraX = useSpring(mvx, { stiffness: 110, damping: 18, mass: 0.5 })
  const auraY = useSpring(mvy, { stiffness: 110, damping: 18, mass: 0.5 })

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches)
    const move = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      mvx.set(e.clientX)
      mvy.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    let raf = 0
    const loop = () => {
      setPts((prev) => {
        const head = prev[0]
        const next = {
          x: head.x + (mouse.current.x - head.x) * 0.42,
          y: head.y + (mouse.current.y - head.y) * 0.42,
        }
        return [next, ...prev.slice(0, TAIL - 1)]
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf)
    }
  }, [mvx, mvy])

  if (!fine) return null

  return (
    <>
      {/* aura — bends the light of the nearby space toward the cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[53] rounded-full"
        style={{
          x: auraX,
          y: auraY,
          width: 460,
          height: 460,
          marginLeft: -230,
          marginTop: -230,
          background: 'radial-gradient(circle, rgba(99,102,241,0.20), rgba(34,211,238,0.10) 38%, transparent 68%)',
          filter: 'blur(26px)',
          mixBlendMode: 'screen',
        }}
      />
      <svg className="pointer-events-none fixed inset-0 z-[55] h-full w-full" aria-hidden style={{ mixBlendMode: 'screen' }}>
        <defs>
          <linearGradient id="cometgrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c7f3ff" />
            <stop offset="45%" stopColor="#5fb8ff" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <filter id="cometglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* thick soft outer glow */}
        <g filter="url(#cometglow)" opacity="0.55">
          {pts.map((p, i) => {
            if (i === 0) return null
            const prev = pts[i - 1]
            const f = 1 - i / TAIL
            return <line key={`g${i}`} x1={prev.x} y1={prev.y} x2={p.x} y2={p.y} stroke="url(#cometgrad)" strokeWidth={Math.max(2, f * 16)} strokeLinecap="round" />
          })}
        </g>

        {/* bright crisp core */}
        {pts.map((p, i) => {
          if (i === 0) return null
          const prev = pts[i - 1]
          const f = 1 - i / TAIL
          return <line key={`c${i}`} x1={prev.x} y1={prev.y} x2={p.x} y2={p.y} stroke="url(#cometgrad)" strokeWidth={Math.max(1, f * 6)} strokeLinecap="round" opacity={f} />
        })}

        {/* glowing glass head */}
        <circle cx={pts[0].x} cy={pts[0].y} r={9} fill="url(#cometgrad)" opacity={0.35} style={{ filter: 'blur(3px)' }} />
        <circle cx={pts[0].x} cy={pts[0].y} r={4.5} fill="#eaffff" style={{ filter: 'drop-shadow(0 0 6px #5fb8ff) drop-shadow(0 0 14px #2563eb)' }} />
      </svg>
    </>
  )
}
