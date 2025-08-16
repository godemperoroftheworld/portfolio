import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const profile = defineCollection({
  loader: file("src/content/profile.yml"),
  schema: z.object({
    picture: z.string(),
    facts: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    traits: z.array(
      z.object({
        label: z.string(),
        value: z.array(z.string()),
      })
    ),
  }),
});

export const collections = {
  profile,
};
