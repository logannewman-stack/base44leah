/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep, neutral automotive blacks — the studio backdrop
        ink: {
          950: '#08090c',
          900: '#0c0e13',
          850: '#11141b',
          800: '#171b24',
          700: '#222734',
        },
        // One confident accent: clean water-blue. Used as solid fills, never neon.
        brand: {
          50: '#eef4ff',
          100: '#dbe7ff',
          300: '#90b4ff',
          400: '#5b8dfb',
          500: '#2f74f0',
          600: '#1f5ad6',
          700: '#1947ad',
        },
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        site: '1200px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        riseIn: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        riseIn: 'riseIn 0.7s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}
