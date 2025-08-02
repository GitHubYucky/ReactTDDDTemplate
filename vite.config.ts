// vite.config.ts
import { defineConfig } from 'vitest/config'; // ← ここを修正！
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});
