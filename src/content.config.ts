import { defineCollection, reference, z } from "astro:content";

/* STAT */
const stats = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    label: z.string(),
    value: z.number(),
  }),
});

/* LINK */
const links = defineCollection({
  type: "content",
  schema: z.object({
    icon: z.string(),
    label: z.string(),
    url: z.string().optional(),
    large: z.boolean().optional(),
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

/* SHEET */
const skillSchema = z.object({
  title: z.string(),
  entries: z.array(
    z.object({
      name: z.string(),
      stat: reference("stats"),
    })
  ),
});
const featuresSchema = z.object({
  title: z.string(),
  entries: z.array(
    z.object({
      name: z.string(),
      stat: reference("stats"),
      description: z.string(),
    })
  ),
});
const proficiencySchema = z.object({
  title: z.string(),
  value: z.array(reference("links")),
  valueTwo: z.array(reference("links")),
});
const sheet = defineCollection({
  type: "data",
  schema: z.object({
    stats: z.object({
      title: z.string(),
    }),
    skills: skillSchema,
    features: featuresSchema,
    proficiencies: proficiencySchema,
    scroller: z.string(),
  }),
});

export const collections = {
  scroller,
  stats,
  links,
  profile,
  sheet,
};
