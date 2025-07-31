import type { Site } from "./types";

export const SITE: Site = {
  website: import.meta.env.SITE_URL, // replace this with your deployed domain
  author: "Tenzin Pelletier",
  desc: "Software Developer, lifelong dungeon master, and film nerd.",
  title: "Tenzin Pelletier",
  ogImage: "astropaper-og.jpg",
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};
