/**
 * rehype plugin: render ```tikz / ```circuitikz fences to inline SVG at build time
 * via node-tikzjax (WASM). No client TikZJax required.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tikzjax from "node-tikzjax";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const cjs = require("node-tikzjax");
const tex2svg: (source: string, options?: Record<string, unknown>) => Promise<string> =
  typeof cjs === "function"
    ? cjs
    : typeof cjs?.default === "function"
      ? cjs.default
      : typeof (tikzjax as any) === "function"
        ? (tikzjax as any)
        : (tikzjax as any).default;

const TIKZ_LANGS = new Set(["tikz", "circuitikz", "circuit-tikz"]);
const CIRCUIT_HINT =
  /\\begin\{circuitikz\}|\\usepackage\{circuitikz\}|to\[(?:R|C|L|V|D|sV|isource|short)\b|node\[ground\]/;

const CACHE_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../.astro/tikz-cache",
);

type Target = {
  parent: any;
  index: number;
  src: string;
  wantsCircuit: boolean;
};

export function rehypeTikz() {
  return async (tree: any) => {
    const targets: Target[] = [];
    collect(tree, null, null, targets);
    if (!targets.length) return;

    await mkdir(CACHE_DIR, { recursive: true });

    for (const t of targets) {
      const prepared = prepareTikzSource(t.src, t.wantsCircuit);
      const key = createHash("sha1").update(prepared).digest("hex").slice(0, 16);
      const cacheFile = path.join(CACHE_DIR, `${key}.svg`);

      let svg = "";
      try {
        svg = await readFile(cacheFile, "utf8");
      } catch {
        try {
          svg = await tex2svg(prepared, {
            showConsole: false,
            texPackages: t.wantsCircuit ? { circuitikz: "" } : {},
            embedFontCss: false,
          });
          await writeFile(cacheFile, svg, "utf8");
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.warn("[rehype-tikz] render failed:", msg);
          t.parent.children[t.index] = {
            type: "element",
            tagName: "pre",
            properties: { className: ["tikz-error"] },
            children: [
              {
                type: "text",
                value: `CircuiTikZ failed to render at build time.\n${msg}`,
              },
            ],
          };
          continue;
        }
      }

      t.parent.children[t.index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["tikz-figure"] },
        children: [
          {
            type: "element",
            tagName: "img",
            properties: {
              src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
              alt: "TikZ / CircuiTikZ diagram",
              loading: "lazy",
              decoding: "async",
            },
            children: [],
          },
        ],
      };
    }
  };
}

function collect(node: any, parent: any, index: number | null, out: Target[]) {
  if (
    node.type === "element" &&
    node.tagName === "pre" &&
    node.children?.[0]?.type === "element" &&
    node.children[0].tagName === "code"
  ) {
    const code = node.children[0];
    const classes: string[] = (code.properties?.className ?? []).map(String);
    const dataLang = String(
      node.properties?.dataLanguage ?? code.properties?.dataLanguage ?? "",
    ).toLowerCase();
    const langs = new Set<string>([
      dataLang,
      ...classes.map((c) => c.replace(/^language-/, "").toLowerCase()),
    ]);

    const src = extractText(code).replace(/\u00a0/g, " ");
    // Only explicit tikz / circuitikz fences render. ```tex stays as source.
    // Read lang from the fence meta before Shiki rewrites classes.
    const isTikzLang = [...TIKZ_LANGS].some((l) => langs.has(l));

    if (isTikzLang && parent && index !== null) {
      out.push({
        parent,
        index,
        src,
        wantsCircuit:
          langs.has("circuitikz") ||
          langs.has("circuit-tikz") ||
          CIRCUIT_HINT.test(src),
      });
      return;
    }
  }

  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      collect(node.children[i], node, i, out);
    }
  }
}

function extractText(n: any): string {
  if (n.type === "text") return n.value || "";
  if (n.children) return n.children.map(extractText).join("");
  return "";
}

function prepareTikzSource(raw: string, wantsCircuit: boolean): string {
  let src = raw
    .replace(/\u00a0/g, " ")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  // Strip packages / document wrappers so we can normalize once.
  // Order matters: remove usepackage BEFORE begin{document}, otherwise
  // stripping only \end{document} leaves a half-open document.
  src = src.replace(/\\usepackage(\[[^\]]*\])?\{circuitikz\}\s*/g, "");
  src = src
    .replace(/\\begin\{document\}\s*/gi, "")
    .replace(/\\end\{document\}/gi, "")
    .trim();

  if (wantsCircuit) {
    if (
      !src.includes("\\begin{circuitikz}") &&
      src.includes("\\begin{tikzpicture}") &&
      CIRCUIT_HINT.test(src)
    ) {
      src = src
        .replace("\\begin{tikzpicture}", "\\begin{circuitikz}[american]")
        .replace("\\end{tikzpicture}", "\\end{circuitikz}");
    }
  }

  return `\\begin{document}\n${src}\n\\end{document}`;
}
