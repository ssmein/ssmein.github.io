import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    watch: {
      // Preview bundles are built into the project root; watching them means a
      // rebuild deletes a watched directory and takes the dev server down.
      ignored: ['**/dist/**', '**/dist-preview/**'],
    },
  },
});
