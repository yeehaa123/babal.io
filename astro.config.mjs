import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel/serverless";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [react(), tailwind({
    applyBaseStyles: false,
  }), mdx(), svelte()],
  output: "hybrid",
  adapter: vercel()
});
