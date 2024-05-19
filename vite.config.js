import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@utilities': path.resolve(__dirname, 'src/utilities'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@artists': path.resolve(__dirname, 'src/components/Artists'),
    },
  },
  assetsInclude: ['**/*.png', '**/*.PNG', '**/*.avi'],
});
