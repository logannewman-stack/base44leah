/**
 * Central image map — exact Unsplash photos from the spec.
 * Loads directly in the browser / on deploy. The <Photo> component falls back
 * to a clean gradient if a URL ever fails, so the layout never breaks.
 */

const x = (url: string) => `${url}&auto=format&fit=crop`

export const IMAGES = {
  // Hero — man detailing a car with professional equipment
  hero: x('https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1200&q=85'),

  // Service cards (each matched to the service)
  services: {
    exterior: x('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'),
    full: x('https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80'),
    ceramic: x('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80'),
    correction: x('https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&q=80'),
    interior: x('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80'),
    fleet: x('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80'),
  },

  // Before / after
  before: x('https://images.unsplash.com/photo-1518987048-93e29699e79a?w=700&q=80'),
  after: x('https://images.unsplash.com/photo-1502877338535-766e1452684a?w=700&q=80'),

  // Small circular previews under each "How it works" step
  steps: [
    x('https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&q=80'),
    x('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80'),
    x('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=200&q=80'),
  ],

  // "Our Work" gallery (3x2)
  gallery: [
    x('https://images.unsplash.com/photo-1547744152-14d985cb937f?w=600&q=80'),
    x('https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=600&q=80'),
    x('https://images.unsplash.com/photo-1600661653561-629509216228?w=600&q=80'),
    x('https://images.unsplash.com/photo-1539799139339-50c5fe1e2b1b?w=600&q=80'),
    x('https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600&q=80'),
    x('https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&q=80'),
  ],
}
