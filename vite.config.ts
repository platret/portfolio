import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { seo } from './scripts/seo.ts'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), seo()],
})
