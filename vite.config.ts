import { defineConfig } from 'vite';
import path from 'node:path';

const rootPath = __dirname;

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(rootPath, './src'),
      '@CRE': path.resolve(rootPath, './src/engine'),
      '@assets': path.resolve(rootPath, './src/assets'),
    },
  },
});
