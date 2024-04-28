import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";


import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: 'https://babal.io',
  integrations: [react(), tailwind({
    applyBaseStyles: false
  }), mdx(), db()],
  output: "hybrid",
  adapter: vercel(),
});
