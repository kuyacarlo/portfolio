/**
 * remark plugin: record which renderers a note actually needs, so the note
 * page only loads KaTeX CSS, TikZ fonts or Mermaid when the Markdown uses them.
 * Read the flags from `remarkPluginFrontmatter` after `render(entry)`.
 * Must run after remark-math (math nodes exist) and before remark-tikz
 * (which turns tikz fences into html).
 */
type Node = { type: string; lang?: string | null; children?: Node[] };

const TIKZ = new Set(['tikz', 'circuitikz', 'circuit-tikz']);

export function remarkNoteFeatures() {
  return (tree: Node, file: { data: { astro?: { frontmatter?: Record<string, unknown> } } }) => {
    let hasMath = false;
    let hasTikz = false;
    let hasMermaid = false;
    const walk = (node: Node) => {
      if (node.type === 'math' || node.type === 'inlineMath') hasMath = true;
      if (node.type === 'code' && node.lang) {
        const lang = node.lang.toLowerCase();
        if (TIKZ.has(lang)) hasTikz = true;
        if (lang === 'mermaid') hasMermaid = true;
      }
      node.children?.forEach(walk);
    };
    walk(tree);
    file.data.astro ??= {};
    file.data.astro.frontmatter ??= {};
    Object.assign(file.data.astro.frontmatter, { hasMath, hasTikz, hasMermaid });
  };
}
