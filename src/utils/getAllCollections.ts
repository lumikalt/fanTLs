import { getCollection } from "astro:content";
import { collectionNames } from "@content/config";

export default async function getAllCollections() {
  const collections = await Promise.all(
    // @ts-expect-error: Dynamic collection names are safe here
    collectionNames.map(name => getCollection(name))
  );
  return collections.flat();
}
