import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Preserve min/max media queries and vh fallbacks in production CSS.
  build: { cssTarget: 'safari15' },
})
