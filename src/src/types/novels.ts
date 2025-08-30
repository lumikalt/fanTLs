import { z } from "astro:content";

export const NovelEntrySchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().optional(),
  path: z.string(),
  language: z.string().length(2), // the two-letter language code
  tags: z.array(z.string()).default([])
});

export const NovelsFileSchema = z.record(NovelEntrySchema);
export type NovelsFile = z.infer<typeof NovelsFileSchema>;
