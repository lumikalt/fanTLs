import path from "path";
import { z, defineCollection } from "astro:content";

// Find all directories in src/content (each is a collection)
const glob = import.meta.glob('./**');

// Get unique directory names (collections)
export const collectionNames = Array.from(
  new Set(Object.keys(glob).map((filepath) => path.basename(path.dirname(filepath))))
);

// Shared schema for all collections
const schema = z.object({
  name: z.string(),
  author: z.string().optional(),
  chapter: z.number().positive().or(z.literal(0)),
  date: z.string().or(z.date()).transform(val => new Date(val)),
});

// Build the collections object automatically
export const collections = collectionNames.reduce((acc, name) => {
  acc[name] = defineCollection({ schema });
  return acc;
}, {} as Record<string, ReturnType<typeof defineCollection>>);
