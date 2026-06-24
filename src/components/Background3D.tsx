import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Shared, lerped scroll progress (0..1) read inside the render loop. */
const scrollState = { target: 0, current: 0 }

function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrollState.target = max > 0 ? window.scrollY / max : 0
}

/**
 * A neon spiral tunnel: two helical strands of points wound around a tube that
 * recedes into the distance. As you scroll, the whole tube rotates and flies
 * toward the camera — the sensation of spiralling downward through the screen.
 */
function SpiralTunnel() {
  const group = useRef<THREE.Group>(null)
  const COUNT = 1400
  const TURNS = 9
  const DEPTH = 60
  const RADIUS = 3.2

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const blue = new THREE.Color('#38bdf8')
    const violet = new THREE.Color('#a855f7')
    for (let i = 0; i < COUNT; i++) {
      const t = i / COUNT
      const strand = i % 2 // two interleaved strands -> double helix tube
      const angle = t * TURNS * Math.PI * 2 + strand * Math.PI
      // gentle radius pulse so the tube breathes
      const r = RADIUS * (0.85 + 0.15 * Math.sin(t * Math.PI * 6))
      positions[i * 3] = Math.cos(angle) * r
      positions[i * 3 + 1] = Math.sin(angle) * r
      positions[i * 3 + 2] = -t * DEPTH
      const c = blue.clone().lerp(violet, (Math.sin(t * Math.PI * 3) + 1) / 2)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  useFrame((_, delta) => {
    if (!group.current) return
    // smooth the scroll value
    scrollState.current += (scrollState.target - scrollState.current) * Math.min(1, delta * 4)
    const p = scrollState.current
    // rotate around the view axis (the spiral) + idle drift
    group.current.rotation.z = p * Math.PI * 2 * 3 + performance.now() * 0.00004
    // fly down the tube as you scroll (move tube toward camera)
    group.current.position.z = p * (DEPTH - 14)
  })

  const rings = useMemo(() => {
    const blue = new THREE.Color('#22d3ee')
    const violet = new THREE.Color('#a855f7')
    return Array.from({ length: 16 }, (_, i) => ({
      z: -i * (DEPTH / 16),
      color: blue.clone().lerp(violet, (i % 8) / 8).getStyle(),
      r: RADIUS * (0.85 + 0.15 * Math.sin(i)),
    }))
  }, [])

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.085}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* glowing tunnel rings to fly through */}
      {rings.map((ring, i) => (
        <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, i * 0.4]}>
          <torusGeometry args={[ring.r, 0.018, 8, 64]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.5}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Soft ambient star dust for extra depth behind the tunnel. */
function Dust({ count = 1600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 26
      arr[i * 3 + 2] = -Math.random() * 50
    }
    return arr
  }, [count])
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.01
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#5fd6ff" size={0.03} transparent opacity={0.5} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function Scene() {
  // wire scroll listener once
  const ref = useRef(false)
  if (!ref.current && typeof window !== 'undefined') {
    ref.current = true
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
  }
  return (
    <>
      <Dust />
      <SpiralTunnel />
    </>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Scene />
      </Canvas>
      {/* Color wash + vignette so the tunnel melts into the page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(4,6,15,0.45)_80%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.16),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.18),_transparent_55%)]" />
    </div>
  )
}
