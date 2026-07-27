// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { rehypeTikz } from './src/plugins/rehype-tikz.ts';

// https://astro.build/config
export default defineConfig({
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMath,           // parses $...$ and $$...$$ into math nodes
      ],
      rehypePlugins: [
        rehypeKatex,          // renders math nodes → KaTeX HTML (server-side)
        rehypeTikz,           // converts ```tikz / ```circuitikz → inline SVG via node-tikzjax
      ],
    }),
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
      // Do not alias tikz/circuitikz → tex; rehype-tikz needs the real lang.
      // Shiki falls back to plaintext for unknown langs.
    },
  },
});
