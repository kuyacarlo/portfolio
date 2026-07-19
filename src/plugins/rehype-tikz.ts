// rehype plugin: transforms fenced ```tikz blocks into <script type="text/tikz">
// so that TikZJax can pick them up and render them client-side.
//
// Input markdown:
//   ```tikz
//   \begin{tikzpicture}
//     \draw (0,0) to[R] (2,0);
//   \end{tikzpicture}
//   ```
//
// Output HTML:
//   <script type="text/tikz">\begin{tikzpicture}...</script>

export function rehypeTikz() {
  return (tree: any) => {
    walk(tree, null, null);
  };
}

function walk(node: any, parent: any, index: number | null) {
  if (
    node.type === 'element' &&
    node.tagName === 'pre' &&
    node.children?.[0]?.type === 'element' &&
    node.children[0].tagName === 'code'
  ) {
    const code = node.children[0];
    const classes: string[] = code.properties?.className ?? [];
    if (classes.includes('language-tikz')) {
      const src = code.children?.[0]?.value ?? '';
      // replace the <pre><code> node in-place with <script type="text/tikz">
      if (parent && index !== null) {
        parent.children[index] = {
          type: 'element',
          tagName: 'script',
          properties: { type: 'text/tikz' },
          children: [{ type: 'text', value: src }],
        };
        return; // no need to recurse into replaced node
      }
    }
  }

  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      walk(node.children[i], node, i);
    }
  }
}
