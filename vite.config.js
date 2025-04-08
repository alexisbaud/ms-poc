import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Écouter sur toutes les interfaces réseau
    port: 3001,      // Utiliser le port 3001
    strictPort: true // Ne pas chercher d'autre port si 3001 est occupé
  }
})
