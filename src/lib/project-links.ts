export type ProjectLinks = { source?: string; live?: string; internal?: string };
export type ProjectLink = { label: 'live' | 'homelab' | 'source'; href: string; external: boolean };

/**
 * One rule for every project link on the site: the name opens the work itself
 * (live, else the homelab page, else source); the rest sit beside it, never repeating it.
 */
export function projectLinks(links: ProjectLinks): { primary: ProjectLink | null; rest: ProjectLink[] } {
  const all: ProjectLink[] = [];
  if (links.live) all.push({ label: 'live', href: links.live, external: true });
  if (links.internal) all.push({ label: 'homelab', href: links.internal, external: false });
  if (links.source) all.push({ label: 'source', href: links.source, external: true });
  const [primary = null, ...rest] = all;
  return { primary, rest };
}
