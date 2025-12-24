import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        extension: './extension.html',
        embed: './src/embed.ts'
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'embed') {
            return 'assets/embed.js';
          }
          return 'assets/[name]-[hash].js';
        }
      }
    }
  },
  server: {
    proxy: {
      '/webflow': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
