import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/psy-mi/',
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  preview: {
    port: 5173
  },
  build: {
    // Оптимизация для быстрой сборки
    minify: 'esbuild',
    target: 'es2015',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['antd'],
        },
      },
    },
    // Увеличиваем размер чанков для уменьшения их количества
    chunkSizeWarningLimit: 1000,
  },
});


