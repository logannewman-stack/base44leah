import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Thin gradient bar at the very top tracking scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-violet"
    />
  )
}

/** A soft light that follows the cursor — reinforces the "inside the screen" feel. */
export function CursorGlow() {
  const [pos, setPos] = useState({ x: -300, y: -300 })
  const [fine, setFine] = useState(true)

  useEffect(() => {
    setFine(window.matchMedia('(pointer: fine)').matches)
    const move = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])

  if (!fine) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[55] h-72 w-72 rounded-full"
      animate={{ x: pos.x - 144, y: pos.y - 144 }}
      transition={{ type: 'spring', stiffness: 120, damping: 22, mass: 0.4 }}
      style={{
        background: 'radial-gradient(circle, rgba(34,211,238,0.14), transparent 65%)',
        mixBlendMode: 'screen',
      }}
    />
  )
}
