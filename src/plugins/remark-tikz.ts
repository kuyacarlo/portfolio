/**
 * remark plugin: render ```tikz / ```circuitikz fences to inline SVG at build time
 * via node-tikzjax (WASM). No client TikZJax required.
 *
 * Runs at the remark (mdast) level — BEFORE Shiki highlights code — because
 * Astro 7 runs Shiki before user rehype plugins, which would neutralize the
 * fence language and make it undetectable. Converting the code node to an
 * `html` node here means Shiki never sees the fence.
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

export function remarkTikz() {
  return async (tree: any) => {
    const targets: Target[] = [];
    collect(tree, null, -1, targets);
    if (!targets.length) return;

    await mkdir(CACHE_DIR, { recursive: true });

    for (const t of targets) {
      const prepared = prepareTikzSource(t.src, t.wantsCircuit);
      const key = createHash("sha1").update(prepared).digest("hex").slice(0, 16);
      const cacheFile = path.join(CACHE_DIR, `${key}.svg`);

      let html = "";
      try {
        const svg = fixSourceMinus(await cachedSvg(cacheFile, prepared, t.wantsCircuit));
        html =
          `<div class="tikz-figure"><img src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}" ` +
          `alt="TikZ / CircuiTikZ diagram" loading="lazy" decoding="async"></div>`;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.warn("[remark-tikz] render failed:", msg);
        html = `<pre class="tikz-error">CircuiTikZ failed to render at build time.\n${escapeHtml(msg)}</pre>`;
      }

      t.parent.children[t.index] = { type: "html", value: html };
    }
  };
}

async function cachedSvg(
  cacheFile: string,
  prepared: string,
  wantsCircuit: boolean,
): Promise<string> {
  try {
    return await readFile(cacheFile, "utf8");
  } catch {
    const svg = await tex2svg(prepared, {
      showConsole: false,
      texPackages: wantsCircuit ? { circuitikz: "" } : {},
      embedFontCss: false,
    });
    await writeFile(cacheFile, svg, "utf8");
    return svg;
  }
}

function collect(node: any, parent: any, index: number, out: Target[]) {
  if (node?.type === "code" && node.lang) {
    const lang = String(node.lang).toLowerCase();
    if (TIKZ_LANGS.has(lang)) {
      const src = (node.value || "").replace(/\u00a0/g, " ");
      out.push({
        parent,
        index,
        src,
        wantsCircuit:
          lang === "circuitikz" ||
          lang === "circuit-tikz" ||
          CIRCUIT_HINT.test(src),
      });
      return;
    }
  }
  if (node?.children && Array.isArray(node.children)) {
    for (let i = 0; i < node.children.length; i++) {
      collect(node.children[i], node, i, out);
    }
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * circuitikz typesets a voltage source's minus as a cmsy10 glyph ("¡") that
 * TikZJax renders off-baseline (misaligned next to the source's "+"). Replace
 * those standalone minus glyphs with a drawn dash at the glyph's center so it
 * aligns with the "+" mark. Labels (multi-glyph text runs) are left alone.
 */
function fixSourceMinus(svg: string): string {
  return svg.replace(
    /<text([^>]*font-family="cmsy10"[^>]*)>¡<\/text>/g,
    (_m, attrs: string) => {
      let cx = 0;
      let cy = 0;
      const rot = /transform="rotate\([\d.]+ ([-\d.]+) ([-\d.]+)\)"/.exec(attrs);
      const trl = /transform="translate\(([-\d.]+) ([-\d.]+)\)"/.exec(attrs);
      if (rot) {
        cx = parseFloat(rot[1]);
        cy = parseFloat(rot[2]);
      } else if (trl) {
        cx = parseFloat(trl[1]);
        cy = parseFloat(trl[2]);
      } else {
        cx = parseFloat(/x="([-\d.]+)"/.exec(attrs)?.[1] ?? "0");
        cy = parseFloat(/y="([-\d.]+)"/.exec(attrs)?.[1] ?? "0");
      }
      const half = 3;
      return (
        `<path stroke="#000" stroke-width=".6" ` +
        `d="M${(cx - half).toFixed(3)} ${cy.toFixed(3)} h${(half * 2).toFixed(3)}"/>`
      );
    },
  );
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
