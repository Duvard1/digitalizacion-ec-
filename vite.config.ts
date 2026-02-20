import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Repo: https://github.com/Duvard1/digitalizacion-ec-
  // En build se usa el subpath de GitHub Pages; en dev se mantiene raiz local.
  base: command === 'build' ? '/digitalizacion-ec-/' : '/',
}))
