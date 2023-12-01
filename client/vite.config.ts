import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      "video.js$": "video.js/dist/video.cjs.js",
      "hls.js$": "hls.js/dist/hls.cjs.js",
    },
  },
});
