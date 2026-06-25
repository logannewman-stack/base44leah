# Detail on Demand — Marketing Site

A premium, luxury marketing website for **Detail on Demand**, a mobile auto-detailing
service offering ceramic coatings, paint correction, and showroom-shine detailing
delivered to your driveway.

The design follows a clean, photographic **black / white / gold** luxury aesthetic
(inspired by high-end detailing brands) — heavy condensed all-caps headings, generous
spacing, and a single gold accent. No WebGL, no particle effects; just crisp layout
and subtle scroll reveals.

## Tech stack

- **React + Vite + TypeScript** — fast, typed SPA
- **Tailwind CSS** — black/white/gold design system, Anton (display) + Inter (body)
- **Framer Motion** — subtle fade-up reveals and the thin scroll-progress bar

## Sections

1. **Navbar** — pure black, centered logo with links split left/right, gold **Book Now**, sticky
2. **Hero** — full-viewport dark studio scene with a stylized top-down luxury car and a bold all-caps headline *(placeholder SVG — swap for real photography)*
3. **Stats** — compact trust strip (cars detailed, rating, booking speed, guarantee)
4. **Services** — horizontal-scroll black cards with gold **Book →** CTAs
5. **The Shine Club** — white feature band (membership)
6. **Ceramic Coatings** — left heading + copy with a photo gallery grid
7. **Packages** — three transparent-priced tiers (gold "Most Popular")
8. **Reviews** — white Google-style review cards with star ratings
9. **Gallery** — Instagram-style grid of video/photo thumbnails
10. **CTA** — full-bleed gold "Request a free quote" band
11. **Footer** — black 4-column (brand + socials / quick links / inquire / services)

## Develop

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Customizing

- **Hero photo:** replace `<CarTopDown/>` in `src/components/Hero.tsx` with an `<img>` of a real dark-studio car photo.
- **Gallery / Ceramics tiles:** the gradient placeholder tiles are ready to swap for real detailing photos.
- **Colors:** the whole palette lives in `tailwind.config.js` (`gold`, `ink`).
- **Booking form:** `ContactModal.tsx` embeds a placeholder form URL — point it at your real booking link.
- Prices, phone, email, social handles, and the 25-mile service area are placeholders — update before launch.
