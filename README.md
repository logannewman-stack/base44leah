# Sud Buds Detailing — Marketing Site

A clean, fast marketing website for **Sud Buds Detailing**, a mobile auto
detailing service that brings the showroom to your driveway.

The site is built around **real detailing video** — a featured reel in the hero
and a "See the work" gallery of clips (wheels, snow-foam wash, dry-down, interior
vacuum) embedded from YouTube so they stream in every visitor's browser. Each
player shows a real still with a play button and starts on click.

## Tech stack

- **React + Vite + TypeScript** — fast, typed SPA
- **Tailwind CSS** — dark automotive design system (one clean blue accent, no
  glassmorphism, solid surfaces, big Archivo display type)

## Sections

- **Hero** — bold headline + a featured, playable detailing reel
- **See the work** — a gallery of real detailing video clips
- **Services** — wheels, foam wash, paint correction, ceramic, interior, add-ons
- **Process** — four simple steps
- **Pricing** — Express Shine / Full Detail / Showroom Ceramic
- **Reviews** and a booking call-to-action

## Develop

```bash
npm install
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Swapping the videos

Video clip ids live in two places — `src/components/Hero.tsx` (the featured
reel) and `src/components/VideoReel.tsx` (the gallery). Each is an 11-character
YouTube id; change it and the clip changes. To use your own footage, upload it
to YouTube (unlisted is fine) and drop in the ids.

> The "Book your detail" modal embeds a placeholder form — swap `FORM_SRC` in
> `src/components/BookingModal.tsx` for your real booking link.
