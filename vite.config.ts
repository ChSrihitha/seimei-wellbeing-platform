import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/seimei-wellbeing-platform/',
  plugins: [react(), tailwindcss()],

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})