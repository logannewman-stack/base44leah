/**
 * Central image map — the exact Unsplash photos specified for the build.
 *
 * These load directly in the browser / on your deploy. To swap any photo,
 * paste a different Unsplash URL here; the <Photo> component falls back to a
 * clean gradient if a URL ever fails, so the layout never breaks.
 */

const u = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`

export const IMAGES = {
  // Hero — close-up glossy black luxury car
  hero: u('1619405399517-d7fce0f13302', 1400),

  // Before / after
  before: u('1558618666-fcd25c85cd64', 900),
  after: u('1610647752706-3bb12232b3ab', 900),

  // "Our Work" gallery (masonry)
  gallery: [
    u('1607860108855-64acf2078ed9', 800),
    u('1520340356584-f9917d1eea6f', 800),
    u('1619642751034-765dfdf7c58e', 800),
    u('1542362567-b07e54358753', 800),
    u('1555215695-3004980ad54e', 800),
    u('1503376780353-7e6692767b70', 800),
  ],
}
