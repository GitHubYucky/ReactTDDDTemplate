import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/ReactTDDDTemplate/",
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true
        // rewrite は不要（/api をサーバでそのまま受ける前提）
      }
    }
  }
});
