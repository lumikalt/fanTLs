import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getNovels } from "@utils/validateNovels";

const novels = getNovels();

export async function GET(context) {
  // Collect all posts from all novels
  const allNovelKeys = Object.keys(novels);
  const allPosts = (
    await Promise.all(
      allNovelKeys.map(async (key) => {
        const novel = novels[key];
        // Use the 'path' property from the YAML
        return getCollection(novel.path);
      })
    )
  ).flat();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: allPosts.map(post => ({
      ...post.data,
      link: `/${post.collection}/${post.slug}/`
    }))
  });
}
