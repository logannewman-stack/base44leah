import { motion, useScroll, useSpring } from 'framer-motion'
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

const TAIL = 22 // number of points in the comet trail

/**
 * Neon comet cursor: a bright head trailing a tapering blue→purple ribbon that
 * lags and whips behind the pointer.
 */
export function CursorGlow() {
  const [fine, setFine] = useState(true)
  const [pts, setPts] = useState<{ x: number; y: number }[]>(() => Array.from({ length: TAIL }, () => ({ x: -100, y: -100 })))
  const mouse = useRef({ x: -100, y: -100 })

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches)
    const move = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('pointermove', move)
    let raf = 0
    const loop = () => {
      setPts((prev) => {
        const head = prev[0]
        const next = {
          x: head.x + (mouse.current.x - head.x) * 0.45,
          y: head.y + (mouse.current.y - head.y) * 0.45,
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
  }, [])

  if (!fine) return null

  return (
    <svg className="pointer-events-none fixed inset-0 z-[55] h-full w-full" aria-hidden style={{ mixBlendMode: 'screen' }}>
      <defs>
        <linearGradient id="cometgrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5fd6ff" />
          <stop offset="55%" stopColor="#6aa8ff" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      {pts.map((p, i) => {
        if (i === 0) return null
        const prev = pts[i - 1]
        const f = 1 - i / TAIL
        return (
          <line
            key={i}
            x1={prev.x}
            y1={prev.y}
            x2={p.x}
            y2={p.y}
            stroke="url(#cometgrad)"
            strokeWidth={Math.max(1, f * 7)}
            strokeLinecap="round"
            opacity={f * 0.9}
          />
        )
      })}
      {/* glowing head */}
      <circle cx={pts[0].x} cy={pts[0].y} r={5} fill="#aee9ff" style={{ filter: 'drop-shadow(0 0 8px #38bdf8) drop-shadow(0 0 16px #8b5cf6)' }} />
    </svg>
  )
}
