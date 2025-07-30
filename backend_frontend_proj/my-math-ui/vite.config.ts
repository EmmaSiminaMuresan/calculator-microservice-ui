import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // opțional, poţi schimba portul de dev (ex. 3000)
    port: 3000,
    proxy: {
      // orice cerere către /pow, /fibonacci/*, /factorial/* să meargă la backend-ul de pe 8000
      '/pow': 'http://127.0.0.1:8000',
      '/fibonacci': 'http://127.0.0.1:8000',
      '/factorial': 'http://127.0.0.1:8000',
    },
  },
})
