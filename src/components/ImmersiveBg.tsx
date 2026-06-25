import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/** Shared, lerped scroll progress (0..1) + pointer, read inside the render loop. */
const state = { scrollTarget: 0, scroll: 0, mx: 0.5, my: 0.5 }
function updateScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  state.scrollTarget = max > 0 ? window.scrollY / max : 0
}
function updatePointer(e: PointerEvent) {
  state.mx = e.clientX / window.innerWidth
  state.my = e.clientY / window.innerHeight
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// Flowing, domain-warped iridescent aurora — a living holographic field.
const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform float uAspect;
  uniform vec2  uMouse;

  float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<6;i++){ v += a*noise(p); p = p*2.0 + 7.3; a *= 0.5; }
    return v;
  }
  // on-brand chrome-blue stops (ice → electric → azure → deep)
  const vec3 BASE   = vec3(0.012, 0.018, 0.045);  // near-black navy
  const vec3 BLUE   = vec3(0.145, 0.388, 0.922);  // electric blue
  const vec3 VIOLET = vec3(0.055, 0.647, 0.914);  // azure
  const vec3 MAGENTA= vec3(0.114, 0.306, 0.835);  // deep azure
  const vec3 CYAN   = vec3(0.220, 0.741, 0.973);  // ice blue

  void main(){
    vec2 uv = vUv;
    vec2 p = vec2((uv.x-0.5)*uAspect, uv.y-0.5) * 2.6;
    float t = uTime*0.035 + uScroll*2.4;

    // domain warping for organic flowing veins
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2,1.3) - t*0.8));
    vec2 r = vec2(fbm(p + 3.5*q + vec2(1.7,9.2) + 0.15*t), fbm(p + 3.5*q + vec2(8.3,2.8) - 0.12*t));
    float f = fbm(p + 4.0*r);
    float n = smoothstep(0.25, 0.95, f);

    // deep field that only blooms colour in the dense "veins" (kept dark/moody)
    vec3 col = BASE;
    col = mix(col, BLUE,    smoothstep(0.42, 0.70, f) * 0.7);
    col = mix(col, VIOLET,  smoothstep(0.62, 0.86, f) * 0.7);
    col = mix(col, MAGENTA, smoothstep(0.80, 0.97, f) * 0.6);
    col += CYAN * pow(smoothstep(0.88, 1.0, r.y), 2.0) * 0.32;   // iridescent glints
    col += (BLUE+VIOLET)*0.5 * pow(n, 4.0) * 0.18;               // soft inner bloom

    // pointer breathes a little light into the field
    float m = smoothstep(0.8, 0.0, distance(uv, uMouse));
    col += mix(CYAN, MAGENTA, uMouse.x) * m * 0.14;

    // strong moody vignette keeps foreground text legible
    float vig = smoothstep(1.25, 0.45, length(uv-0.5));
    col *= mix(0.28, 0.92, vig);
    col *= 0.62; // overall exposure — darker

    gl_FragColor = vec4(col, 1.0);
  }
`

function AuroraPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uAspect: { value: 1 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (!mat.current) return
    state.scroll += (state.scrollTarget - state.scroll) * Math.min(1, delta * 3)
    uniforms.uTime.value += delta
    uniforms.uScroll.value = state.scroll
    uniforms.uAspect.value = size.width / size.height
    // ease pointer
    const mu = uniforms.uMouse.value
    mu.x += (state.mx - mu.x) * Math.min(1, delta * 5)
    mu.y += (1 - state.my - mu.y) * Math.min(1, delta * 5)
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} depthTest={false} depthWrite={false} />
    </mesh>
  )
}

function Setup() {
  const ref = useRef(false)
  if (!ref.current && typeof window !== 'undefined') {
    ref.current = true
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)
    window.addEventListener('pointermove', updatePointer, { passive: true })
  }
  return <AuroraPlane />
}

export default function ImmersiveBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-ink-900">
      <Canvas dpr={[1, 2]} gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }} frameloop="always">
        <Setup />
      </Canvas>
    </div>
  )
}
