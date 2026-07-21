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
    const dataLang = node.properties?.dataLanguage ?? code.properties?.dataLanguage ?? '';
    const isTikz = classes.includes('language-tikz') || dataLang === 'tikz';
    
    // Check if it's plaintext but contains tikz environment (since Shiki might fallback to plaintext)
    let src = '';
    const extractText = (n: any): string => {
      if (n.type === 'text') return n.value || '';
      if (n.children) return n.children.map(extractText).join('');
      return '';
    };
    
    if (isTikz || classes.includes('language-plaintext') || dataLang === 'plaintext') {
      src = extractText(code);
      const hasTikzEnv = src.includes('\\begin{tikzpicture}');
      
      if (isTikz || hasTikzEnv) {
        // replace the <pre> node in-place with <script type="text/tikz">
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
  }

  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      walk(node.children[i], node, i);
    }
  }
}
