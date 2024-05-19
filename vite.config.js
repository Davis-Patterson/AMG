import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/Components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@contexts': path.resolve(__dirname, 'src/Contexts'),
      '@utilities': path.resolve(__dirname, 'src/Utilities'),
      '@styles': path.resolve(__dirname, 'src/Styles'),
      '@artists': path.resolve(__dirname, 'src/components/Artists'),
    },
  },
  assetsInclude: ['**/*.png', '**/*.PNG', '**/*.avi'],
});
