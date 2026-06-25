/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep wet-charcoal base — like a freshly-clayed black hood under studio light
        ink: {
          900: '#04070b',
          800: '#070c14',
          700: '#0b1320',
        },
        // Soap-bubble iridescence + water + chrome — the detailing palette
        cyber: {
          cyan: '#34e0e8', // clean water / pressure-washer spray
          blue: '#2a8fff', // deep ceramic gloss
          violet: '#7b6cff', // thin-film bubble sheen
          magenta: '#e23bd2', // bubble rainbow edge
        },
        foam: {
          50: '#f3fbff',
          100: '#e3f4ff',
          200: '#c7e6fb',
        },
        chrome: {
          light: '#dfe9f2',
          mid: '#9fb2c4',
          dark: '#4a5a6b',
        },
        aqua: '#34e0e8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(52,224,232,0.55)',
        'glow-violet': '0 0 70px -10px rgba(123,108,255,0.55)',
        chrome: '0 10px 40px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
        drip: {
          '0%': { transform: 'translateY(-10%)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateY(120%)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        pulseRing: 'pulseRing 2.6s ease-out infinite',
        spinSlow: 'spinSlow 14s linear infinite',
        drip: 'drip 3.4s ease-in infinite',
      },
    },
  },
  plugins: [],
}
