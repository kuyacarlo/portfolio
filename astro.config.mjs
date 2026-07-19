// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { rehypeTikz } from './src/plugins/rehype-tikz.ts';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkMath,           // parses $...$ and $$...$$ into math nodes
    ],
    rehypePlugins: [
      rehypeKatex,          // renders math nodes → KaTeX HTML (server-side)
      rehypeTikz,           // converts ```tikz blocks → <script type="text/tikz">
    ],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
