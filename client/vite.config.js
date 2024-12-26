import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.jsx'], // Files to lint
    }),
  ],
});
