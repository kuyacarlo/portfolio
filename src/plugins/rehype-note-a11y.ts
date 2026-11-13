/**
 * rehype plugin: GFM task lists render bare disabled checkboxes, which have no
 * accessible name. Name each one after its list item's text, at build time.
 */
type Node = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
};

const text = (node: Node): string =>
  node.type === 'text' ? node.value ?? '' : (node.children ?? []).map(text).join('');

const isTaskItem = (node: Node) => {
  const cls = node.properties?.className;
  return node.tagName === 'li' && Array.isArray(cls) && cls.includes('task-list-item');
};

export function rehypeTaskListLabels() {
  return (tree: Node) => {
    const walk = (node: Node) => {
      if (isTaskItem(node)) {
        const label = text(node).replace(/\s+/g, ' ').trim();
        const visit = (child: Node) => {
          if (child.tagName === 'input' && child.properties?.type === 'checkbox' && label && !child.properties.ariaLabel) {
            child.properties.ariaLabel = label;
          }
          if (!isTaskItem(child)) child.children?.forEach(visit);
        };
        node.children?.forEach(visit);
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}

/**
 * rehype plugin: display math scrolls sideways inside its own box on narrow
 * screens, so keyboard users must be able to focus it to scroll it.
 * Run after rehype-katex.
 */
export function rehypeScrollableMath() {
  return (tree: Node) => {
    const walk = (node: Node) => {
      const cls = node.properties?.className;
      if (node.tagName === 'span' && Array.isArray(cls) && cls.includes('katex-display')) {
        node.properties!.tabIndex = 0;
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
