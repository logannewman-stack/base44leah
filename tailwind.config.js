/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Monochrome light theme. Names kept so existing classes keep working.
        ink: {
          900: '#0a0a0b', // near-black (dark text / dark elements)
          800: '#1c1c1f',
          700: '#3a3a3f',
        },
        cyber: {
          // light, professional blue accents with a soft (not bold) violet
          cyan: '#5b84ff', // light blue (small labels / dots)
          blue: '#4f7cff',
          violet: '#7e8cf5',
          magenta: '#8b87f0', // soft, muted violet
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Layered hairline + soft ambient shadows for a high-end, weightless feel.
        soft: '0 1px 2px rgba(15,15,20,0.04), 0 10px 28px -14px rgba(15,15,20,0.14)',
        glow: '0 1px 2px rgba(15,15,20,0.05), 0 16px 40px -16px rgba(15,15,20,0.18)',
        'glow-violet': '0 2px 6px rgba(15,15,20,0.05), 0 30px 70px -26px rgba(79,124,255,0.22)',
      },
      letterSpacing: {
        tightest: '-0.04em',
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
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        pulseRing: 'pulseRing 2.6s ease-out infinite',
      },
    },
  },
  plugins: [],
}
