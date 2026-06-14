import { defineAction } from "astro:actions"
import { z } from "astro:schema";
import { db, Comment, sql, eq } from "astro:db";

export const server = {
  like: defineAction({
    input: z.object({ id: z.number() }),
    handler: async ({ id }) => {
      await db
        .update(Comment)
        .set({ likes: sql`${Comment.likes} + 1` })
        .where(eq(Comment.id, id));
    },
  }),
  comment: defineAction({
    input: z.object({
      postSlug: z.string(),
      parentId: z.number().optional(),
      name: z.string().min(1),
      body: z.string().min(1),
    }),
    handler: async ({ postSlug, parentId, name, body }) => {
      await db.insert(Comment).values({
        postSlug,
        parentId: parentId ?? null,
        name,
        body,
        likes: 0,
        createdAt: new Date(),
      });
    },
  }),
};
