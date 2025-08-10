// vite.config.ts
import { defineConfig } from 'vite'; // ← ここを修正！
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  }
});
