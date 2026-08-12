// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkTikz } from './src/plugins/remark-tikz.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://kuyacarlo.dev',
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMath,           // parses $...$ and $$...$$ into math nodes
        remarkTikz,           // ```tikz / ```circuitikz → SVG (mdast, BEFORE Shiki)
      ],
      rehypePlugins: [
        rehypeKatex,          // renders math nodes → KaTeX HTML (server-side)
      ],
    }),
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
      // Do not alias tikz/circuitikz → tex; remark-tikz needs the real lang.
      // Shiki falls back to plaintext for unknown langs.
    },
  },
});
