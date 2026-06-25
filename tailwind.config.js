/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0ea5e9', // sky-500 accent
          blueDark: '#0369a1', // sky-700 — hover / strong CTA / heading accent
          sky: '#38bdf8', // sky-400 light accent
          badge: '#e0f4ff', // hero/eyebrow pill bg
          tint: '#e0f4ff',
          ink: '#0a0a0a', // near-black text (high contrast)
          grey: '#f0f7ff', // light blue-tinted section alternation
          line: '#e0f0ff', // hairline dividers
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        soft: '0 18px 50px -20px rgba(2,32,71,0.20)',
        card: '0 6px 24px -10px rgba(2,32,71,0.12)',
        blue: '0 14px 32px -12px rgba(14,165,233,0.5)',
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
