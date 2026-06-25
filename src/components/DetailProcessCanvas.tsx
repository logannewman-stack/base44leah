import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import type { MotionValue } from 'framer-motion'
import * as THREE from 'three'

/**
 * The WebGL "video" layer for DetailProcess — a single full-bleed plane whose
 * fragment shader renders four procedural detailing scenes (wheels, foam, dry,
 * vacuum) and blends between them on scroll with a soapy diagonal wipe.
 *
 * Kept in its own module so it can be lazy-loaded: three.js never touches the
 * initial bundle, and the section's copy renders instantly while this streams in.
 */

const N = 4

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uStage;   // 0..3 continuous
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
    for(int i=0;i<5;i++){ v += a*noise(p); p = p*2.0 + 7.3; a *= 0.5; }
    return v;
  }

  /* ----- Scene 0 : spinning chrome WHEEL ----- */
  vec3 sceneWheel(vec2 uv, vec2 p, float t){
    vec2 wp = p * 1.18;
    float r = length(wp);
    float ang = atan(wp.y, wp.x);
    float a = ang + t*0.7;             // wheel spin

    vec3 col = vec3(0.018,0.026,0.04);
    col += vec3(0.05,0.07,0.10) * smoothstep(1.5,0.1,r);

    // tire
    float tire = smoothstep(1.04,1.0,r) * smoothstep(0.80,0.84,r);
    float tread = 0.5+0.5*sin(a*70.0);
    vec3 tireCol = mix(vec3(0.028,0.032,0.038), vec3(0.07,0.075,0.082), tread*0.6);
    tireCol += vec3(0.16,0.19,0.23) * pow(max(0.0,cos(ang-2.2)),2.0) * 0.5;
    col = mix(col, tireCol, tire);

    // outer chrome lip
    float lip = smoothstep(0.84,0.82,r)*smoothstep(0.72,0.74,r);
    float metalL = 0.35 + 0.5*(0.5+0.5*sin(ang*1.0));
    float specL = pow(max(0.0,cos(a-0.6)),16.0) + pow(max(0.0,cos(a-3.6)),16.0);
    vec3 chrome = mix(vec3(0.30,0.36,0.44), vec3(0.86,0.93,1.0), metalL) + specL;
    col = mix(col, chrome, lip);

    // brake disc + drilled holes
    float disc = smoothstep(0.74,0.72,r)*smoothstep(0.18,0.20,r);
    float holes = smoothstep(0.5,0.55, 0.5+0.5*sin(a*16.0)) * smoothstep(0.6,0.52,r)*smoothstep(0.32,0.4,r);
    vec3 discCol = vec3(0.085,0.095,0.11) + holes*0.05;
    float cal = smoothstep(0.42,0.30,abs(ang+0.95)) * smoothstep(0.66,0.6,r)*smoothstep(0.5,0.56,r);
    discCol = mix(discCol, vec3(0.62,0.06,0.05), cal);
    col = mix(col, discCol, disc);

    // five chrome spokes
    float spoke = smoothstep(0.55,0.95, cos(a*5.0));
    spoke *= smoothstep(0.745,0.72,r) * smoothstep(0.15,0.2,r);
    float metalS = 0.4 + 0.55*(0.5+0.5*sin(a*2.0+1.0));
    float specS = pow(max(0.0,cos(a-0.6)),9.0);
    vec3 spokeCol = mix(vec3(0.26,0.31,0.39), vec3(0.92,0.96,1.0), metalS) + specS;
    col = mix(col, spokeCol, spoke);

    // centre hub cap
    float hub = smoothstep(0.18,0.16,r);
    float dome = 1.0 - smoothstep(0.0,0.17,r);
    vec3 hubCol = mix(vec3(0.4,0.46,0.56), vec3(1.0), pow(dome,1.4)) + pow(max(0.0,cos(a-0.6)),7.0)*0.4;
    col = mix(col, hubCol, hub);

    // sweeping detail-brush gleam + droplet sparkle
    col += pow(max(0.0,cos(a - t*1.6)),40.0) * 0.18 * vec3(0.9,0.97,1.0) * smoothstep(0.82,0.15,r);
    float spk = hash(floor(uv*vec2(uAspect,1.0)*46.0));
    col += step(0.95,spk) * pow(0.5+0.5*sin(t*3.5+spk*40.0),36.0) * vec3(0.85,0.95,1.0) * smoothstep(0.82,0.1,r);
    return col;
  }

  /* ----- Scene 1 : snow FOAM bath ----- */
  vec3 sceneFoam(vec2 uv, vec2 p, float t){
    vec2 fp = vec2(uv.x*uAspect, uv.y);
    vec3 paint = vec3(0.02,0.04,0.07) + vec3(0.05,0.09,0.15)*smoothstep(0.0,1.1,uv.y);
    paint += vec3(0.10,0.16,0.24)*pow(max(0.0,sin((uv.x*2.0-uv.y*1.4)*3.1416 + t*0.3)),6.0)*0.3;

    float churn = fbm(fp*3.0 + vec2(0.0,-t*0.28) + fbm(fp*2.0 + t*0.1));
    float foamLine = 0.60 + 0.10*sin(uv.x*9.0 + t*0.8);
    float foam = smoothstep(foamLine+0.20, foamLine-0.06, uv.y);
    foam = clamp(foam + (churn-0.5)*0.7, 0.0, 1.0);
    float drips = fbm(vec2(uv.x*uAspect*7.0, uv.y*2.2 - t*0.55));
    float tend = smoothstep(0.6,0.9,drips) * smoothstep(foamLine+0.05, foamLine-0.42, uv.y);
    foam = max(foam, tend);

    float bub = fbm(fp*13.0 + t*0.35);
    vec3 foamCol = mix(vec3(0.80,0.86,0.93), vec3(1.0), bub);
    vec3 irid = 0.5+0.5*cos(6.2831*(bub*2.2 + vec3(0.0,0.33,0.66)) + t*0.6);
    foamCol += irid * smoothstep(0.0,0.16,abs(bub-0.5)) * 0.16;
    float sp = hash(floor(fp*60.0));
    foamCol += step(0.97,sp)*pow(0.5+0.5*sin(t*5.0+sp*60.0),30.0)*0.6;

    vec3 col = mix(paint, foamCol, foam);
    col += vec3(0.16,0.2,0.26)*smoothstep(0.05,0.0,abs(uv.y-foamLine))*0.5;
    return col;
  }

  /* ----- Scene 2 : streak-free DRY (water beading + towel wipe) ----- */
  vec3 sceneDry(vec2 uv, vec2 p, float t){
    vec2 gp = vec2(uv.x*uAspect, uv.y);
    vec3 base = vec3(0.014,0.03,0.06);
    base += vec3(0.07,0.13,0.22) * pow(smoothstep(1.1,0.0,length(p*vec2(0.75,1.0))),1.4);
    base += vec3(0.12,0.18,0.30) * pow(max(0.0,sin((uv.x+uv.y)*4.0+0.4)),8.0)*0.22;
    float flake = hash(floor(uv*vec2(uAspect,1.0)*300.0));
    base += step(0.985,flake)*(0.35+0.4*sin(t*4.0+flake*50.0))*vec3(0.55,0.78,1.0);

    float wipePos = fract(t*0.11);
    float wx = uv.x*0.72 + uv.y*0.28;
    float dried = step(wx, wipePos);
    float towel = smoothstep(0.05,0.0,abs(wx-wipePos));

    float beads = 0.0; vec3 beadCol = vec3(0.0);
    for(int i=0;i<3;i++){
      float fi = float(i);
      vec2 cell = gp*(6.0+fi*3.0);
      cell.y += t*(0.32+fi*0.18);
      vec2 id = floor(cell); vec2 f = fract(cell)-0.5;
      float rnd = hash(id+fi*11.0);
      float rad = 0.16+0.18*rnd;
      float d = length(f);
      float drop = smoothstep(rad, rad-0.05, d);
      float sx = smoothstep(rad,0.0,length(f-vec2(-0.11,0.12)));
      beadCol += drop*(vec3(0.45,0.66,0.95)*0.3 + sx*vec3(1.0));
      beads = max(beads, drop);
    }
    vec3 col = base + beadCol*(1.0-dried);
    col += towel*vec3(0.9,0.95,1.0)*0.22;
    col += dried*vec3(0.045,0.07,0.10);
    return col;
  }

  /* ----- Scene 3 : interior VACUUM ----- */
  vec3 sceneVac(vec2 uv, vec2 p, float t){
    vec2 up = vec2(uv.x*uAspect, uv.y);
    float weave = (0.5+0.5*sin(up.x*180.0))*(0.5+0.5*sin(up.y*180.0));
    float grain = fbm(up*8.0);
    vec3 base = mix(vec3(0.02,0.025,0.034), vec3(0.06,0.07,0.092), grain);
    base += weave*0.018;

    vec2 noz = vec2(0.5*uAspect + 0.30*uAspect*sin(t*0.6), 0.44 + 0.16*cos(t*0.8));
    float dn = distance(up, noz);

    float swath = smoothstep(0.16,0.0,abs(up.x-noz.x)) * smoothstep(noz.y+0.06, noz.y-0.6, up.y);
    base += swath*vec3(0.05,0.07,0.095);
    base += swath*(0.5+0.5*sin(up.y*60.0))*0.018;

    float dust = 0.0;
    for(int i=0;i<24;i++){
      float fi = float(i);
      float seed = hash(vec2(fi,3.0));
      float life = fract(t*0.25 + seed);
      float ang = seed*6.2831 + life*8.0;
      float rad = (1.0-life)*0.4*(0.45+seed);
      vec2 ppos = noz + vec2(cos(ang),sin(ang))*rad;
      float d = distance(up, ppos);
      float sz = mix(0.012,0.0025,life);
      dust += smoothstep(sz,0.0,d)*(1.0-life)*1.2;
    }
    vec3 col = base + dust*vec3(0.86,0.82,0.68);
    col += smoothstep(0.11,0.0,dn)*vec3(0.16,0.26,0.42)*0.55;
    col = mix(col, vec3(0.02,0.03,0.05), smoothstep(0.05,0.032,dn));
    return col;
  }

  vec3 sceneByIndex(int idx, vec2 uv, vec2 p, float t){
    if(idx <= 0) return sceneWheel(uv,p,t);
    if(idx == 1) return sceneFoam(uv,p,t);
    if(idx == 2) return sceneDry(uv,p,t);
    return sceneVac(uv,p,t);
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = vec2((uv.x-0.5)*uAspect, uv.y-0.5)*2.0;
    float t = uTime;

    float stage = clamp(uStage, 0.0, 3.0);
    int i = int(floor(stage));
    float f = fract(stage);

    vec3 col = sceneByIndex(i, uv, p, t);
    if(f > 0.30){
      vec3 nxt = sceneByIndex(i+1, uv, p, t);
      if(f > 0.70){
        col = nxt;
      } else {
        float edgeN = fbm(vec2(uv.x*uAspect, uv.y)*5.0 + stage*3.0)*0.12;
        float diag = uv.x*0.7 + (1.0-uv.y)*0.3 + edgeN;
        float prog = smoothstep(0.30,0.70,f);
        float m = smoothstep(prog-0.12, prog+0.12, diag);
        col = mix(nxt, col, m);
        float edge = clamp(1.0 - abs(diag-prog)/0.12, 0.0, 1.0);
        col += edge*edge*vec3(0.6,0.82,1.0)*0.22;
      }
    }

    col += mix(vec3(0.16,0.85,0.92), vec3(0.55,0.46,0.96), uMouse.x)
           * smoothstep(0.6,0.0,distance(uv,uMouse)) * 0.06;

    float vig = smoothstep(1.3,0.35,length(uv-0.5));
    col *= mix(0.30,1.0,vig);
    col += (hash(uv*vec2(uAspect,1.0)*900.0 + fract(t))-0.5)*0.025;
    col = pow(col, vec3(0.92));
    gl_FragColor = vec4(col, 1.0);
  }
`

const pointer = { mx: 0.5, my: 0.5 }
function onPointer(e: PointerEvent) {
  pointer.mx = e.clientX / window.innerWidth
  pointer.my = e.clientY / window.innerHeight
}

function ScenePlane({ progress }: { progress: MotionValue<number> }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uStage: { value: 0 },
      uAspect: { value: 1 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [],
  )
  const eased = useRef(0)

  useFrame((_, delta) => {
    // Write through the live material's uniforms (not the prop object, which
    // three may copy) so every frame's values actually reach the shader.
    const u = mat.current?.uniforms
    if (!u) return
    const target = progress.get() * (N - 1)
    eased.current += (target - eased.current) * Math.min(1, delta * 4)
    u.uTime.value += delta
    u.uStage.value = eased.current
    u.uAspect.value = size.width / size.height
    const mu = u.uMouse.value as THREE.Vector2
    mu.x += (pointer.mx - mu.x) * Math.min(1, delta * 5)
    mu.y += (1 - pointer.my - mu.y) * Math.min(1, delta * 5)
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} depthTest={false} depthWrite={false} />
    </mesh>
  )
}

function Setup({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef(false)
  if (!ref.current && typeof window !== 'undefined') {
    ref.current = true
    window.addEventListener('pointermove', onPointer, { passive: true })
  }
  return <ScenePlane progress={progress} />
}

export default function DetailProcessCanvas({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
    >
      <Setup progress={progress} />
    </Canvas>
  )
}
