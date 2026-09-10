import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    allowedHosts: true,

    proxy: {
      "/auth": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/campaigns": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/assets": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/health": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/socket.io": {
        target: "http://localhost:3001",
        ws: true,
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../../shared"),
    },
  },
});
