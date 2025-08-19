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

/* HISTORY */
const stepSchema = z.object({
  label: z.string(),
  description: z.string(),
  coordinate: z
    .string()
    .transform(s => JSON.parse(s))
    .pipe(
      z.object({
        type: z.literal("Point"),
        coordinates: z.tuple([z.number(), z.number()]), // [lng, lat]
      })
    ),
  icon: z.string(),
  startDate: z
    .string()
    .transform(s => new Date(s))
    .pipe(z.date()),
  endDate: z
    .string()
    .transform(s => (s ? new Date(s) : undefined))
    .pipe(z.date().optional()),
});
const history = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    events: z.array(stepSchema),
    scroller: z.string(),
  }),
});

/* CONTACT */
const projectSchema = z.object({
  title: z.string(),
  icon: z.string(),
  description: z.string(),
  url: z.string().optional(),
  links: z.array(reference("links")),
});
const inventory = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    projects: z.array(projectSchema),
    scroller: z.string(),
  }),
});

export const collections = {
  scroller,
  stats,
  links,
  profile,
  sheet,
  history,
  inventory,
};
