import layers from '../data/layers.json';

export type Layer = { n: number; name: string };

export const layerName = (n: number): string => layers.find((layer) => layer.n === n)?.name ?? '';

/** Accessible label for a CoverageStrip, built from layer names. */
export const coverageLabel = (values: number[]): string =>
  `Layers: ${[...values].sort((a, b) => a - b).map(layerName).filter(Boolean).join(', ')}`;

/** Notes that match a layer filter. `all` (or no layer) returns every note. */
export function filterByLayer<T extends { layers: number[] }>(items: T[], layer: string | number | null | undefined): T[] {
  if (layer === null || layer === undefined || layer === 'all') return items;
  const n = Number(layer);
  return items.filter((item) => item.layers.includes(n));
}

/** Projects the home page features: the desktop table and the phone list before "Show all". */
export const featuredProjects = <T extends { featured?: boolean }>(projects: T[]): T[] =>
  projects.filter((project) => project.featured === true);

export { layers };
