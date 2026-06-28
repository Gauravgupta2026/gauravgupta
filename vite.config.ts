import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static single-page site. `base: "./"` makes the build use relative asset
// paths so it works on Vercel, Netlify, or any static host / subpath.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
