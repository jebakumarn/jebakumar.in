// @ts-check
import { defineConfig } from 'astro/config';

// Static site published to GitHub Pages at the custom domain jebakumar.in.
// `site` is used for canonical URLs / sitemap generation.
export default defineConfig({
  site: 'https://jebakumar.in',
  output: 'static',
  build: {
    // Emit clean directory-style URLs (about/ instead of about.html).
    format: 'directory',
  },
});
