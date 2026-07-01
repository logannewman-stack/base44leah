/**
 * Single source of truth for all salon content.
 * Edit business details, services, pricing, hours and images here.
 * Image paths point to /public/images — swap the files or paths to use your own photos.
 */

export const salon = {
  name: 'Layla Sleiter',
  fullName: 'Layla Sleiter Salon Studio',
  monogram: 'LS',
  owner: 'Layla Sleiter',
  tagline: 'Extensions, color & couture hair',
  city: 'Des Moines, Iowa',
  phoneDisplay: '(515) 555-0147',
  phoneHref: 'tel:+15155550147',
  email: 'hello@laylasleiter.com',
  addressLine1: '400 Locust Street, Suite 120',
  addressLine2: 'Des Moines, IA 50309',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  hours: [
    { day: 'Tuesday – Friday', time: '9:00 AM – 7:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 4:00 PM' },
    { day: 'Sunday – Monday', time: 'Closed' },
  ],
}

/**
 * IMAGE SLOTS + DROP-IN GUIDE
 * ---------------------------------------------------------------------------
 * Each slot below shows a labelled placeholder. To use a real photo, drop the
 * file into /public/images with the filename shown, then change the extension
 * here from `.svg` to your file's (e.g. `.jpg`). Recommended photo → slot:
 *
 *   hero              → Layla in the salon (black suit, standing)        [tall 2:3]
 *   portrait          → Layla headshot / owner photo                     [tall 4:5]
 *   extensions        → extensions being installed (side profile)        [tall 4:5]
 *   extensionsDetail  → close-up of the weft / hand-tied row             [tall 4:5]
 *   beforeAfter       → before/after transformation (side-by-side)       [square 1:1]
 *   color             → color / balayage result                          [tall 4:5]
 *   haircut           → stylist cutting / combing a client               [tall 4:5]
 *   nails             → manicure                                         [square 1:1]
 *   pedicure          → pedicure                                         [square 1:1]
 *   interior          → wide shot of the salon space                     [wide 16:9]
 * ---------------------------------------------------------------------------
 */
export const images = {
  hero: '/images/hero.svg',
  portrait: '/images/portrait.svg',
  interior: '/images/interior.svg',
  extensions: '/images/extensions.svg',
  extensionsDetail: '/images/extensions-detail.svg',
  beforeAfter: '/images/before-after.svg',
  color: '/images/color.svg',
  haircut: '/images/haircut.svg',
  nails: '/images/nails.svg',
  pedicure: '/images/pedicure.svg',
}

export type Service = {
  title: string
  blurb: string
  image: string
  points: string[]
}

export const services: Service[] = [
  {
    title: 'Hair Extensions',
    blurb:
      'Our specialty. Hand-tied, weft and tape-in extensions applied for a flawless, undetectable blend — length and fullness that move like your own.',
    image: images.extensions,
    points: ['Hand-tied & weft installs', 'Custom color-matched', 'Move-ins & maintenance'],
  },
  {
    title: 'Color & Balayage',
    blurb:
      'Dimensional balayage, all-over color, vivids and lived-in blondes — painted by hand for depth that grows out beautifully.',
    image: images.color,
    points: ['Balayage & foilyage', 'Full & partial highlights', 'Corrective color'],
  },
  {
    title: 'Precision Cuts',
    blurb:
      'Tailored cuts and blowouts designed around your face, texture and lifestyle — finished with a style you can recreate at home.',
    image: images.haircut,
    points: ['Womens & mens cuts', 'Dry & texture cutting', 'Blowout styling'],
  },
  {
    title: 'Manicures',
    blurb:
      'Clean, meticulous nail care — classic and gel manicures with a polished, long-lasting finish in a calm, elevated space.',
    image: images.nails,
    points: ['Classic & gel manicures', 'Nail art on request', 'Strengthening treatments'],
  },
  {
    title: 'Pedicures',
    blurb:
      'A restorative spa pedicure from soak to polish — softened, refreshed and finished to perfection.',
    image: images.pedicure,
    points: ['Spa & gel pedicures', 'Callus therapy', 'Warm-towel finish'],
  },
  {
    title: 'The Full Experience',
    blurb:
      'Hair, nails and toes in one seamless visit. Tell us the occasion and we will build the perfect package around you.',
    image: images.interior,
    points: ['Bridal & event styling', 'Head-to-toe packages', 'Complimentary consult'],
  },
]

export type PriceItem = { name: string; price: string; note?: string }
export type PriceGroup = { category: string; items: PriceItem[] }

export const pricing: PriceGroup[] = [
  {
    category: 'Hair Extensions',
    items: [
      { name: 'Extension Consultation', price: 'Complimentary' },
      { name: 'Hand-Tied Install', price: 'from $250', note: 'hair not included' },
      { name: 'Tape-In Install', price: 'from $180' },
      { name: 'Move-Up / Maintenance', price: 'from $150' },
    ],
  },
  {
    category: 'Color',
    items: [
      { name: 'Balayage', price: 'from $185' },
      { name: 'Full Highlight', price: 'from $160' },
      { name: 'Partial Highlight', price: 'from $115' },
      { name: 'All-Over Color', price: 'from $95' },
    ],
  },
  {
    category: 'Cuts & Styling',
    items: [
      { name: "Women's Cut & Style", price: 'from $65' },
      { name: "Men's Cut", price: 'from $40' },
      { name: 'Blowout', price: 'from $50' },
      { name: 'Special Event Style', price: 'from $85' },
    ],
  },
  {
    category: 'Nails',
    items: [
      { name: 'Classic Manicure', price: '$35' },
      { name: 'Gel Manicure', price: '$50' },
      { name: 'Classic Pedicure', price: '$50' },
      { name: 'Spa Pedicure', price: '$70' },
    ],
  },
]

export type Testimonial = { quote: string; name: string; detail: string }

export const testimonials: Testimonial[] = [
  {
    quote:
      'Layla is a true extension artist. My hand-tied wefts are completely undetectable and my blonde has never looked more expensive. Worth every mile of the drive.',
    name: 'Kayla M.',
    detail: 'Extensions & Balayage',
  },
  {
    quote:
      'The most relaxing, polished salon experience in Des Moines. From the consultation to the finished look, everything felt intentional and luxurious.',
    name: 'Brooke T.',
    detail: 'Color & Cut',
  },
  {
    quote:
      'I came in for a full refresh before my wedding — hair, nails and toes — and left feeling like the best version of myself. Layla is incredibly talented.',
    name: 'Sydney R.',
    detail: 'Bridal Package',
  },
]

export const stats = [
  { value: '10+', label: 'Years behind the chair' },
  { value: '4.9★', label: 'Average client rating' },
  { value: '2,000+', label: 'Happy clients styled' },
  { value: '100%', label: 'Custom color-matched' },
]
