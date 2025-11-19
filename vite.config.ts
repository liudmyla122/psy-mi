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
  }
});


