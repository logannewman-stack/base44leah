/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light, airy palette: white space, near-black ink, light-blue accent
        brand: {
          blue: '#0ea5e9', // sky-500 — primary accent
          blueDark: '#0284c7', // sky-600 — hover
          sky: '#38bdf8', // sky-400 — light accent
          tint: '#e0f2fe', // sky-100 — soft fills
          ink: '#0b1220', // near-black navy — headings / footer
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px -20px rgba(2,32,71,0.20)',
        card: '0 8px 30px -12px rgba(2,32,71,0.14)',
        blue: '0 16px 40px -16px rgba(14,165,233,0.45)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
