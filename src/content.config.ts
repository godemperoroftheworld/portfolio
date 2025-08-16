import { defineCollection, z } from "astro:content";

/* PROFILE */
const profile = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      picture: image(),
      facts: z.array(
        z.object({
          id: z.string(),
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
      scroller: z.string(),
    }),
});

/* SCROLLER */
const scrollerSchema = z.object({
  target: z.enum([
    "characterSheet",
    "characterHistory",
    "characterInventory",
    "sendARaven",
  ]),
  title: z.string(),
});
const scroller = defineCollection({
  type: "content",
  schema: scrollerSchema,
});

export const collections = {
  profile,
  scroller,
};
