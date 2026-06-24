import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/** Shared, lerped scroll progress (0..1) read inside the render loop. */
const scrollState = { target: 0, current: 0 }
function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  scrollState.target = max > 0 ? window.scrollY / max : 0
}

const PALETTE = ['#22d3ee', '#3b82f6', '#8b5cf6', '#e23bd2', '#2dd4bf', '#eaf6ff']
const COUNT = 92
const TURNS = 6
const DEPTH = 52
const BASE_R = 3.1
const LOOPS = 1.4 // how many full vortex cycles across the whole page scroll

type ObjData = { phase0: number; offset: number; rMul: number; scale: number; shape: 'ico' | 'oct' | 'ring'; spin: number; color: string }

/**
 * An endless, dominant vortex of glowing multi-colour 3D objects orbiting the
 * central axis. Each object continuously wraps from far to near, so the spiral
 * stays full at every scroll position; scrolling spins it and pulls it toward
 * you — descending through the spiral.
 */
function SpiralObjects() {
  const group = useRef<THREE.Group>(null)
  const shapes: ObjData['shape'][] = ['ico', 'oct', 'ring']

  const objects = useMemo<ObjData[]>(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        phase0: i / COUNT,
        offset: (i % 2) * Math.PI + (i % 3) * 0.4,
        rMul: 0.9 + 0.3 * Math.sin(i * 1.7),
        scale: 0.42 + (i % 5) * 0.1,
        shape: shapes[i % 3],
        spin: 0.15 + (i % 4) * 0.12,
        color: PALETTE[i % PALETTE.length],
      })),
    [],
  )

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    scrollState.current += (scrollState.target - scrollState.current) * Math.min(1, delta * 4)
    const p = scrollState.current
    const idle = performance.now() * 0.00004
    for (let i = 0; i < g.children.length; i++) {
      const m = g.children[i] as THREE.Mesh
      const o = objects[i]
      if (!o) continue
      // phase 0 = right at camera, 1 = far away; scrolling decreases phase => approach
      const phase = THREE.MathUtils.euclideanModulo(o.phase0 - p * LOOPS, 1)
      const angle = phase * TURNS * Math.PI * 2 + o.offset + p * Math.PI * 2 * 1.2 + idle
      const r = BASE_R * o.rMul
      m.position.set(Math.cos(angle) * r, Math.sin(angle) * r, -phase * DEPTH + 6)
      const near = 1 - phase
      m.scale.setScalar(o.scale * (0.8 + near * 2.8))
      m.rotation.x += delta * o.spin
      m.rotation.y += delta * (o.spin * 1.3)
      const mat = m.material as THREE.MeshBasicMaterial
      // always visible (floor of 0.35), brightest mid-distance, eases out as it passes
      mat.opacity = 0.35 + 0.65 * Math.sin(phase * Math.PI)
    }
  })

  return (
    <group ref={group}>
      {objects.map((o, i) => (
        <mesh key={i}>
          {o.shape === 'ico' && <icosahedronGeometry args={[1, 0]} />}
          {o.shape === 'oct' && <octahedronGeometry args={[1, 0]} />}
          {o.shape === 'ring' && <torusGeometry args={[1, 0.3, 12, 32]} />}
          <meshStandardMaterial
            color={o.color}
            emissive={o.color}
            emissiveIntensity={1.3}
            roughness={0.2}
            metalness={0.5}
            flatShading
            transparent
            opacity={0.92}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Slowly rotating multi-colour star dust for depth behind the vortex. */
function AmbientDust({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 12
      const a = Math.random() * Math.PI * 2
      positions[i * 3] = Math.cos(a) * r
      positions[i * 3 + 1] = Math.sin(a) * r
      positions[i * 3 + 2] = -Math.random() * 50
      const c = new THREE.Color(PALETTE[i % PALETTE.length])
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.02
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.65} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function Scene() {
  const ref = useRef(false)
  if (!ref.current && typeof window !== 'undefined') {
    ref.current = true
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
  }
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 8]} intensity={2.4} color="#38bdf8" />
      <pointLight position={[-6, -3, 4]} intensity={2} color="#e23bd2" />
      <pointLight position={[0, 2, 6]} intensity={1.6} color="#8b5cf6" />
      <AmbientDust />
      <SpiralObjects />
    </>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 72 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <Scene />
      </Canvas>
      {/* soft vignette so text stays readable while the spiral stays dominant */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(4,6,15,0.55)_92%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.12),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(226,59,210,0.12),_transparent_55%)]" />
    </div>
  )
}
