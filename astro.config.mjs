import { defineConfig } from "astro/config";

import { SITE_URL } from "./src/consts";

import mdx from "@astrojs/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeBetterTooltips from "./src/utils/rehype-better-tooltips";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

import yaml from 'vite-plugin-yaml2';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeBetterTooltips]
  },
  adapters: [
    vercel({
      imageService: true,
      isr: {
        expiration: 60 * 60 * 24
      },
      webAnalytics: {
        enabled: true
      }
    })
  ],
  vite: {
    plugins: [yaml()]
  }
});
