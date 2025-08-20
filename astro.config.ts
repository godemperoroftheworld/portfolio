import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";
import svgLoader from "vite-svg-loader";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vercel from "@astrojs/vercel";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || "http://localhost:4321",
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en-CA",
          fr: "fr-CA",
        },
      },
    }),
    vue({ devtools: true, appEntrypoint: "/src/pages/_app" }),
    robotsTxt(),
  ],
  vite: {
    plugins: [tailwindcss(), svgLoader(), vueJsx()],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  adapter: vercel(),
});
