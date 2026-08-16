import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Automatically use /RVS-INTERIORS/ base for GitHub Pages production build, or / for local dev
  base: process.env.NODE_ENV === 'production' ? '/RVS-INTERIORS/' : '/',
  server: {
    port: 3000,
    open: false
  }
});
