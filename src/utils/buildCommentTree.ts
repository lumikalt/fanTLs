import type { InferSelectModel } from "astro:db";
import { db, eq, Comment, User } from "astro:db";

type CommentRow = InferSelectModel<typeof Comment>;

export type CommentWithReplies = {
  id: number;
  authorId: number;
  username: string;
  text: string;
  createdAt: Date;
  replies: CommentWithReplies[];
};

export default async function buildCommentTree(
  comments: CommentRow[]
): Promise<CommentWithReplies[]> {
  const map = new Map<number, CommentWithReplies>();
  const roots: CommentWithReplies[] = [];

  // First, enrich comments with usernames
  const enriched = await Promise.all(
    comments.map(async c => {
      const user = await db.select().from(User).where(eq(User.id, c.authorId));

      return {
        ...c,
        username: user[0]!.username,
        replies: [] as CommentWithReplies[]
      };
    })
  );

  // Populate map
  enriched.forEach(c => {
    map.set(c.id, c);
  });

  // Build tree
  enriched.forEach(c => {
    if (c.parentId) {
      map.get(c.parentId)?.replies.push(c);
    } else {
      roots.push(c);
    }
  });

  return roots;
}
