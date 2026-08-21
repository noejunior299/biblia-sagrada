import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    target: 'es2022',
    rollupOptions: {
      external: [
        'sqlite3',
        'electron',
        'fs',
        'path',
        'os',
        'crypto',
        'events',
        'stream',
        'util',
        'url'
      ],
      output: {
        format: 'cjs',
      },
    },
    commonjsOptions: {
      ignoreDynamicRequires: true,
    },
  },
  optimizeDeps: {
    exclude: ['sqlite3'],
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});
