// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkTikz } from './src/plugins/remark-tikz.ts';
import { remarkNoteFeatures } from './src/plugins/remark-note-features.ts';
import { rehypeScrollableMath, rehypeTaskListLabels } from './src/plugins/rehype-note-a11y.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://kuyacarlo.dev',
  markdown: {
    processor: unified({
      remarkPlugins: [
        remarkMath,           // parses $...$ and $$...$$ into math nodes
        remarkNoteFeatures,   // flags hasMath / hasTikz / hasMermaid for the note page
        remarkTikz,           // ```tikz / ```circuitikz → SVG (mdast, BEFORE Shiki)
      ],
      rehypePlugins: [
        rehypeKatex,          // renders math nodes → KaTeX HTML (server-side)
        rehypeTaskListLabels, // names GFM task-list checkboxes
        rehypeScrollableMath, // display math that scrolls is keyboard-focusable
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
