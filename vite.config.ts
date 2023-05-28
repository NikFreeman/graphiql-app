import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    eslint(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
});
