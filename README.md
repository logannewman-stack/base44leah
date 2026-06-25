# Sud Buds Detailing — Marketing Site

A modern, immersive marketing website for **Sud Buds Detailing**, a mobile auto
detailing service that brings the showroom shine to your driveway.

Built to feel premium and alive: a GPU-rendered water/foam background, a
scroll-driven "detailing video" sequence rendered entirely on the GPU, parallax
depth, and motion throughout. No image or video files — every visual is generated
in real time, so it stays razor-sharp at any resolution and loads instantly.

## Tech stack

- **React + Vite + TypeScript** — fast, typed SPA
- **Tailwind CSS** — design system (wet-charcoal + soap-bubble iridescence + chrome)
- **Framer Motion** — scroll-linked animation, reveals, magnetic buttons
- **Three.js / @react-three/fiber** — live WebGL shaders (code-split & lazy-loaded)

## Key experiences

- **Live WebGL background** — drifting wet glass, soap-suds and rising bubble glints
- **Hero** — parallax headline with a spinning chrome wheel rendered in pure CSS
- **The Process** — a sticky scroll sequence rendering four procedural "detailing
  clips" on the GPU (chrome wheels → snow-foam bath → streak-free dry → interior
  vacuum) that blend with a soapy diagonal wipe, copy floating on top
- **Services** — a 3D helix of detailing specialties that orbits as you scroll
- **Why us** — 3D wheel of benefit cards
- **Packages** — Express Shine, Full Detail, and Showroom Ceramic tiers
- **Cursor glow + scroll progress bar** for an "inside the screen" feel
- Fully responsive, with `prefers-reduced-motion` support

## Develop

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Structure

```
src/
  App.tsx                    # composition of all sections
  index.css                  # Tailwind layers + custom utilities
  components/
    ImmersiveBg.tsx          # WebGL water/foam field (lazy-loaded)
    DetailProcess.tsx        # sticky scroll process section + copy
    DetailProcessCanvas.tsx  # the four-scene WebGL "video" shader (lazy-loaded)
    Effects.tsx              # scroll progress bar + cursor glow
    Navbar.tsx  Hero.tsx  Marquee.tsx  Stats.tsx
    ServicesHelix.tsx  Features.tsx  Pricing.tsx
    Testimonials.tsx  CTA.tsx  Footer.tsx
    ContactModal.tsx  ui.tsx
```

> Copy and pricing are illustrative starting points — swap in your real packages,
> service area, and booking form.
