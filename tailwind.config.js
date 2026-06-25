/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light, airy palette — white space, near-black text, sky-blue accent
        brand: {
          blue: '#0ea5e9', // primary accent
          blueDark: '#0369a1', // hover / strong CTA
          sky: '#38bdf8', // light accent
          tint: '#e0f2fe', // soft fills
          ink: '#0a0a0a', // near-black text
          grey: '#f8f9fa', // section alternation
        },
      },
      fontFamily: {
        // Clean modern sans throughout (SaaS/agency feel)
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        soft: '0 18px 50px -20px rgba(2,32,71,0.18)',
        card: '0 6px 24px -10px rgba(2,32,71,0.12)',
        blue: '0 16px 40px -16px rgba(14,165,233,0.45)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease forwards',
      },
    },
  },
  plugins: [],
}
