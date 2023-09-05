import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
    },
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
        "/questions": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
        "/questions/test": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
        "/requests/": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
