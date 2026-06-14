import type { InferSelectModel } from "drizzle-orm";
import type { Comment } from "astro:db";

export type CommentType = InferSelectModel<typeof Comment>;
