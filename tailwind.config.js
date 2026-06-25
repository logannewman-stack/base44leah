/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Obsidian "showroom at night" base
        ink: {
          900: '#05070e',
          800: '#0a0f1c',
          700: '#0f1830',
        },
        // Chrome-blue "ceramic shine" accent family (token names kept for reuse)
        cyber: {
          cyan: '#38bdf8', // ice blue
          blue: '#2563eb', // electric blue
          violet: '#0ea5e9', // azure
          magenta: '#1d4ed8', // deep azure
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(56,189,248,0.55)',
        'glow-violet': '0 0 70px -10px rgba(37,99,235,0.55)',
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
