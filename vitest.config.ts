import { defineConfig } from 'vitest/config';  // vitest用の設定ファイル

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
  },
});
