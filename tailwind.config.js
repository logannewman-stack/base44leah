/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm neutral luxury palette — cream, bone, warm white, ink black
        cream: {
          50: '#FCFAF6',
          100: '#F8F4EC',
          200: '#F1EBDF',
          300: '#E7DECF',
        },
        bone: '#F5F1E8',
        ink: {
          900: '#141210',
          800: '#1E1B18',
          700: '#2A2622',
          600: '#3A352F',
        },
        taupe: {
          400: '#B7AE9F',
          500: '#9A9081',
          600: '#7C7366',
        },
        champagne: {
          400: '#CBB489',
          500: '#B79A6B',
          600: '#9E8253',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.28em',
      },
      boxShadow: {
        soft: '0 20px 60px -25px rgba(30,27,24,0.35)',
        card: '0 30px 80px -40px rgba(30,27,24,0.45)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        fadeUp: 'fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
      },
    },
  },
  plugins: [],
}
