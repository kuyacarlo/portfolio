import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// tikz-ssr: 2026-07-27b — drop static /tikz embeds; circuitikz fence only
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date:  z.string(),
    tags:  z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Hide from listings + production routes (same effect as draft). */
    hide:  z.boolean().default(false),
    desc:  z.string().optional(),
  }),
});

export const collections = { notes };
