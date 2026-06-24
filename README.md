# FrontDeskAI — Marketing Site

A modern, immersive marketing website for **FrontDeskAI**, a 24/7 AI receptionist
that answers every call, books appointments, and captures every lead.

Built to feel futuristic and alive: a GPU-rendered particle background, scroll-driven
storytelling, parallax depth, and motion throughout.

## Tech stack

- **React + Vite + TypeScript** — fast, typed SPA
- **Tailwind CSS** — design system (custom cyber palette, glassmorphism)
- **Framer Motion** — scroll-linked animation, reveals, magnetic buttons
- **Three.js / @react-three/fiber / drei** — live WebGL particle field (code-split & lazy-loaded)

## Key experiences

- **Live WebGL background** — drifting particle galaxy + wireframe orb that reacts to the pointer
- **Hero** — parallax headline with an animated live-call mockup and voice waveform
- **How it works** — a sticky scroll sequence following one call from ring to booked job
- **Features** — 3D tilt cards that respond to the cursor
- **Pricing** — animated monthly/annual toggle with spring-counted prices
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
  App.tsx                  # composition of all sections
  index.css                # Tailwind layers + custom utilities
  components/
    Background3D.tsx        # WebGL particle field (lazy-loaded)
    Effects.tsx            # scroll progress bar + cursor glow
    Navbar.tsx  Hero.tsx  Marquee.tsx  Stats.tsx
    HowItWorks.tsx  Features.tsx  Pricing.tsx
    Testimonials.tsx  CTA.tsx  Footer.tsx
    ui.tsx                 # shared Reveal / MagneticButton / Eyebrow
```

> Copy and pricing are illustrative starting points — swap in your real plans, voice, and brand details.
