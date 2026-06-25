/**
 * Central image map.
 *
 * These are real Unsplash photo URLs (free to use, hotlink-friendly). They load
 * directly in the browser / on your deploy. If any photo doesn't fit your brand,
 * just paste a different Unsplash URL here — every section reads from this file,
 * and the <Photo> component falls back to a clean gradient if a URL ever fails.
 *
 * To grab your own: open unsplash.com, find a photo, right-click → "Copy image
 * address", and replace the string below.
 */

// Helper to size an Unsplash image consistently.
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMAGES = {
  // Hero — clean, bright luxury car
  hero: u('1552519507-da3b142c6e3d', 1800),

  // Service cards
  ceramic: u('1605559424843-9e4c228bf1c2'),
  correction: u('1607860108855-64acf2078ed9'),
  ppf: u('1503376780353-7e6692767b70'),
  interior: u('1549399542-7e3f8b79c341'),
  wash: u('1520340356584-f9917d1eea6f'),

  // About / why-us split
  detailer: u('1486006920555-c77dcf18193c', 1200),

  // Gallery grid
  gallery: [
    u('1568605117036-5fe5e7bab0b7', 900),
    u('1542362567-b07e54358753', 900),
    u('1494976388531-d1058494cdd8', 900),
    u('1503376780353-7e6692767b70', 900),
    u('1492144534655-ae79c964c9d7', 900),
    u('1552519507-da3b142c6e3d', 900),
    u('1583121274602-3e2820c69888', 900),
    u('1606220838315-056192d5e927', 900),
  ],

  // CTA background
  cta: u('1568605117036-5fe5e7bab0b7', 1800),
}
