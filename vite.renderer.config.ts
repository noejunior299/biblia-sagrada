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
    rollupOptions: {
      output: {
        manualChunks: {
          radix: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-select', '@radix-ui/react-slot', '@radix-ui/react-switch', '@radix-ui/react-tabs'],
          lucide: ['lucide-react'],
        },
      },
    },
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
