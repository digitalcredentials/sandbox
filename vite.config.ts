import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use the same base as package.json homepage for GitHub Pages
export default defineConfig({
  base: '/sandbox/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@digitalcredentials/dcc-context', 'dcc-context'],
    include: ['react-ace'],
  },
  resolve: {
    alias: {
      'ace-builds/webpack-resolver': 'ace-builds',
    },
  },
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },
});
