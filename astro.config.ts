import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";
import svgLoader from "vite-svg-loader";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), vue({ devtools: true })],
  vite: {
    plugins: [tailwindcss(), svgLoader()],
  },
});
