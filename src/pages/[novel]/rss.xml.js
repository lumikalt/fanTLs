import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../../consts";
import { getNovels } from "@utils/validateNovels";

const novels = getNovels();

// Add this function:
export async function getStaticPaths() {
  return Object.keys(novels).map(novelKey => ({
    params: { novel: novelKey }
  }));
}

export async function GET({ params, site }) {
  const novelKey = params.novel;
  const novel = novels[novelKey];
  if (!novel) return new Response("Not found", { status: 404 });

  const posts = await getCollection(novel.path);

  return rss({
    title: `${SITE_TITLE} - ${novel.name}`,
    description: novel.description || SITE_DESCRIPTION,
    site,
    items: posts.map(post => ({
      ...post.data,
      link: `/${post.collection}/${post.slug}/`
    }))
  });
}
