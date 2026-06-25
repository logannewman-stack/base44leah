import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When building for GitHub Pages the site is served from /<repo>/, so assets
// must be prefixed. Vercel (and local dev) serve from the root, so base is '/'.
// https://vite.dev/config/
export default defineConfig({
  base: process.env.GH_PAGES ? '/base44leah/' : '/',
  plugins: [react()],
})
