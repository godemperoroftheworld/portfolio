import type { APIRoute } from "astro";
import { db, Comment, eq, desc } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
  const comments = await db
    .select()
    .from(Comment)
    .where(eq(Comment.postSlug, params.slug!))
    .orderBy(desc(Comment.createdAt));

  return Response.json(comments);
};
