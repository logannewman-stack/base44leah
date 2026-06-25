/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Pure black / white with a single gold accent — ShowCar luxury palette
        gold: {
          DEFAULT: '#f5c518',
          400: '#ffd633',
          500: '#f5c518',
          600: '#d4a900',
        },
        ink: {
          950: '#000000',
          900: '#070707',
          800: '#0e0e0e',
          700: '#161616',
          600: '#1f1f1f',
        },
      },
      fontFamily: {
        // Heavy condensed display for ALL-CAPS headings, Inter for body
        display: ['Anton', 'Oswald', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        wider2: '0.12em',
        widest2: '0.28em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        fadeUp: 'fadeUp 0.7s ease forwards',
      },
    },
  },
  plugins: [],
}
