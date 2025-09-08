import { db, User, Comment, Novel } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values([
    { username: "alice", email: "alice@example.com" },
    { username: "bob", email: "bob@example.com" },
    { username: "charlie", email: "charlie@example.com" }
  ]);

  await db.insert(Novel).values([
    { id: 1, name: "some_name", authorId: 2 },
    { name: "another", authorId: 1 }
  ]);

  await db.insert(Comment).values([
    {
      id: 77,
      authorId: 1,
      text: "This novel was so beautiful, it was as if some occult hand had penned it.\n\n*Bravo*, writer.",
      targetType: "novel",
      targetId: 1
    },
    {
      id: 99,
      authorId: 2,
      text: "Deep!",
      targetType: "novel",
      targetId: 1,
      parentId: 77
    },
    {
      authorId: 3,
      text: "what",
      targetType: "novel",
      targetId: 1,
      parentId: 77
    }
  ]);
}
