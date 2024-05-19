import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    },
  },
  assetsInclude: ['**/*.png', '**/*.PNG', '**/*.avi'],
});
