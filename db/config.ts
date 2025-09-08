import { column, defineDb, defineTable, NOW } from "astro:db";

const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true, unique: true }),
    username: column.text(),
    email: column.text(),
    createdAt: column.date({ default: NOW })
  }
});

const Comment = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true, unique: true }),
    authorId: column.number({ references: () => User.columns.id }),

    targetType: column.text({ enum: ["user", "novel", "chapter"] }),
    targetId: column.number(),

    // for replies - set targetType and targetId to the same as the parent, and the parentId here
    parentId: column.number({
      optional: true,
      references: () => Comment.columns.id
    }),

    text: column.text(),
    createdAt: column.date({ default: NOW })
  }
});

// Novels table
const Novel = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true, unique: true }),
    name: column.text(),
    authorId: column.number({
      references: () => User.columns.id,
      optional: true
    }),
    createdAt: column.date({ default: NOW })
  }
});

const Chapter = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true, unique: true }),
    novelId: column.number({ references: () => Novel.columns.id }),
    authorId: column.number({
      optional: true,
      references: () => User.columns.id
    }),
    createdAt: column.date({ default: NOW }),
    chapter: column.number()
  }
});

export default defineDb({
  tables: { User, Comment, Novel, Chapter }
});
