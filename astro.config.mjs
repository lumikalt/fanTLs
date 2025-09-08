import { defineConfig } from "astro/config";

import { SITE_URL } from "./src/consts";

import mdx from "@astrojs/mdx";
import rehypeBetterTooltips from "./src/utils/rehype-better-tooltips";
import rehypeIdent from "./src/utils/rehype-ident";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

import yaml from 'vite-plugin-yaml2';

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap(), db()],
  markdown: {
    remarkPlugins: [],
    rehypePlugins: [rehypeBetterTooltips, rehypeIdent],
  },
  adapters: [
    vercel({
      imageService: true,
      isr: true,
      webAnalytics: {
        enabled: true
      }
    })
  ],
  vite: {
    plugins: [yaml()]
  }
});
