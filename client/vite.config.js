import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // `npm run dev` at the repo root starts the Worker on 8787. This forwards
  // /api/* there so the Vite dev server can use it.
  server: {
    proxy: { "/api": "http://localhost:8787" },
  },
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "StonsCenter",
        short_name: "StonsCenter",
        start_url: "/",
        display: "standalone",
        background_color: "#041e42",
        lang: "en",
        scope: "/",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#041e42",
      },
    }),
  ],
});
