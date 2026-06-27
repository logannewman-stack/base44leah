/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#04060f',
          800: '#070b18',
          700: '#0b1124',
        },
        cyber: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          violet: '#8b5cf6',
          magenta: '#e23bd2',
        },
      },
      fontFamily: {
        display: ['Sora', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        glow: '0 0 60px -10px rgba(34,211,238,0.55)',
        'glow-violet': '0 0 70px -10px rgba(139,92,246,0.55)',
        card: '0 24px 60px -24px rgba(0,0,0,0.7), inset 0 1px 0 0 rgba(255,255,255,0.06)',
        'card-lift': '0 40px 90px -30px rgba(34,211,238,0.28), 0 24px 60px -24px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.1)',
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
        marqueeUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
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
