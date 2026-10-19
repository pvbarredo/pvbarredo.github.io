import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// pvbarredo.github.io is a user/org GitHub Pages site, served from the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
