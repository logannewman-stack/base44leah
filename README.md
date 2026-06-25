# Detail on Demand — Marketing Site

A modern, immersive marketing website for **Detail on Demand**, a premium mobile auto
detailing service that brings ceramic coatings, paint correction, and showroom-shine
detailing right to your driveway — booked in 60 seconds.

Built to feel premium and alive: a GPU-rendered aurora background, scroll-driven
storytelling, parallax depth, and motion throughout.

## Tech stack

- **React + Vite + TypeScript** — fast, typed SPA
- **Tailwind CSS** — design system (chrome-blue palette, glassmorphism)
- **Framer Motion** — scroll-linked animation, reveals, magnetic buttons
- **Three.js / @react-three/fiber** — live WebGL aurora field (code-split & lazy-loaded)

## Key experiences

- **Live WebGL background** — a flowing, chrome-blue aurora field that reacts to the pointer
- **Hero** — parallax headline with an animated "mobile detail booked" card
- **Services** — a sticky 3D helix walking through Ceramic, Correction, PPF, Interior & Mobile
- **Why us** — a vertical 3D wheel of reasons drivers choose us
- **Packages** — three transparent-priced mobile detailing tiers
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
    ImmersiveBg.tsx         # WebGL aurora field (lazy-loaded)
    Effects.tsx             # scroll progress bar + cursor glow
    Navbar.tsx  Hero.tsx  Marquee.tsx  Stats.tsx
    ServicesHelix.tsx  Features.tsx  Pricing.tsx
    Testimonials.tsx  CTA.tsx  Footer.tsx
    ContactModal.tsx        # booking modal (embedded form)
    ui.tsx                  # shared Reveal / MagneticButton / Eyebrow
```

> Copy, pricing, and the booking-form embed are illustrative starting points — swap in your
> real packages, service area, and booking link before going live.
