import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: '/src/Components',
      assets: '/src/assets',
      contexts: '/src/Contexts',
      shared: '/src/shared',
      utilities: '/src/Utilities',
      styles: '/src/Styles',
      artists: '/src/Components/Artists',
      utils: '/src/Components/Utils',
    },
  },
  assetsInclude: [
    '**/*.png',
    '**/*.PNG',
    '**/*.avi',
    '**/*.jpg',
    '**/*.JPG',
    '**/*.jpeg',
    '**/*.JPEG',
  ],
  build: {
    outDir: 'dist',
  },
});
