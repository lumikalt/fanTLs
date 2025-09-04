import rawNovels from "@novels.yaml";
import { NovelsFileSchema } from "src/types/novels";


export function getNovels() {
  const parsed = NovelsFileSchema.safeParse(rawNovels);
  if (!parsed.success) {
    console.error("Invalid novels.yaml:", parsed.error.format());
    throw new Error("novels.yaml validation failed");
  }
  return parsed.data;
}
