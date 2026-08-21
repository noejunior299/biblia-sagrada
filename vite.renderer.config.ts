import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: process.env.NODE_ENV !== 'production',
  },
  server: {
    port: 5180,
    strictPort: true,
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
