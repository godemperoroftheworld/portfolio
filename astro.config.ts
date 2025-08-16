import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap(),
    vue({ devtools: true, appEntrypoint: "/src/pages/_app" }),
  ],
  vite: {
    plugins: [tailwindcss(), svgLoader(), vueJsx()],
  },
  output: "server",
});
