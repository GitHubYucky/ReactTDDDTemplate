// vite.config.ts
import { defineConfig } from 'vite'; // ← ここを修正！
import react from '@vitejs/plugin-react';

// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api": { target: "http://localhost:3000", changeOrigin: true } }
  },
  base: process.env.VITE_BASE || "/ReactTDDDTemplate/",
});
