// src/lib/cms.ts
//
// CMS adapter — swap the active source by un/commenting the right block.
// Currently reads from Astro content collections (local markdown).
// Wire to Supabase, Neon, or Cloudflare D1/KV when you're ready.
//
// ─── SCHEMA (target for all sources) ────────────────────────────────────────
//   slug    TEXT  PK
//   title   TEXT  NOT NULL
//   date    DATE  NOT NULL  (YYYY-MM-DD)
//   tags    TEXT[]
//   desc    TEXT            (short blurb for listings)
//   body    TEXT            (markdown body — omit in listing queries)
//   draft   BOOLEAN DEFAULT false
//   hide    BOOLEAN DEFAULT false  (same effect as draft — prefer hide)
// ────────────────────────────────────────────────────────────────────────────

export interface Post {
  slug:  string;
  title: string;
  date:  string;
  tags:  string[];
  desc?: string;
}

function isPublicNote(e: { data: { draft?: boolean; hide?: boolean } }) {
  return !e.data.draft && !e.data.hide;
}

// ── SOURCE: Astro Content Collections (default — local markdown) ─────────────
import { getCollection } from 'astro:content';

export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('notes', isPublicNote);
  return entries
    .map((e: any) => ({
      slug:  e.id.replace(/\.md$/, ''),
      title: e.data.title,
      date:  e.data.date,
      tags:  e.data.tags,
      desc:  e.data.desc,
    }))
    .sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── SOURCE: Supabase ─────────────────────────────────────────────────────────
// npm install @supabase/supabase-js
// Add to .env: PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY
//
// import { createClient } from '@supabase/supabase-js';
// const sb = createClient(
//   import.meta.env.PUBLIC_SUPABASE_URL,
//   import.meta.env.PUBLIC_SUPABASE_ANON_KEY
// );
//
// export async function getPosts(): Promise<Post[]> {
//   const { data, error } = await sb
//     .from('notes')
//     .select('slug, title, date, tags, desc')
//     .eq('draft', false)
//     .order('date', { ascending: false });
//   if (error) throw error;
//   return data ?? [];
// }
//
// SQL to create the table:
// CREATE TABLE notes (
//   slug  TEXT PRIMARY KEY,
//   title TEXT NOT NULL,
//   date  DATE NOT NULL,
//   tags  TEXT[] DEFAULT '{}',
//   desc  TEXT,
//   body  TEXT,
//   draft BOOLEAN DEFAULT false
// );


// ── SOURCE: Neon (serverless Postgres) ───────────────────────────────────────
// npm install @neondatabase/serverless
// Add to .env: DATABASE_URL (postgres connection string)
//
// import { neon } from '@neondatabase/serverless';
// const sql = neon(import.meta.env.DATABASE_URL);
//
// export async function getPosts(): Promise<Post[]> {
//   const rows = await sql`
//     SELECT slug, title, date::text, tags, desc
//     FROM notes
//     WHERE draft = false
//     ORDER BY date DESC
//   `;
//   return rows as Post[];
// }


// ── SOURCE: Cloudflare D1 (via Pages Function) ───────────────────────────────
// Use in a CF Pages Function / middleware, pass data as props to Astro page.
// Astro config: output: 'server', adapter: cloudflare()
//
// // functions/api/posts.ts
// export async function onRequest({ env }: EventContext<Env, any, any>) {
//   const { results } = await env.DB.prepare(
//     'SELECT slug,title,date,tags,desc FROM notes WHERE draft=0 ORDER BY date DESC'
//   ).all();
//   return Response.json(results);
// }
//
// // In your Astro page (SSR mode):
// const posts = await fetch('/api/posts').then(r => r.json());


// ── SOURCE: Cloudflare KV ────────────────────────────────────────────────────
// Store posts as JSON blobs keyed by slug. Index stored under key "index".
//
// // In CF Pages Function:
// const index = JSON.parse(await env.NOTES_KV.get('index') ?? '[]');
// // Each entry: { slug, title, date, tags, desc }
// return Response.json(index);
