import { describe, expect, it } from 'vitest';
import { coverageLabel, featuredOnPhone, filterByLayer } from '../../src/lib/layers';
import projectContent from '../../src/data/projects.json';

const notes = [
  { slug: 'a', layers: [4] },
  { slug: 'b', layers: [4, 5] },
  { slug: 'c', layers: [1, 2] },
];

describe('filterByLayer', () => {
  it('returns every note for all', () => {
    expect(filterByLayer(notes, 'all')).toHaveLength(3);
    expect(filterByLayer(notes, null)).toHaveLength(3);
  });

  it('returns only notes at the selected layer', () => {
    expect(filterByLayer(notes, '4').map((n) => n.slug)).toEqual(['a', 'b']);
    expect(filterByLayer(notes, 2).map((n) => n.slug)).toEqual(['c']);
  });

  it('returns nothing for an empty layer, which drives the empty state', () => {
    expect(filterByLayer(notes, '6')).toEqual([]);
  });
});

describe('coverageLabel', () => {
  it('names the layers in stack order', () => {
    expect(coverageLabel([5, 4])).toBe('Layers: server, app');
    expect(coverageLabel([1, 2, 3, 4, 5, 6])).toBe('Layers: silicon, firmware, network, server, app, people');
  });

  it('ignores unknown layers', () => {
    expect(coverageLabel([4, 9])).toBe('Layers: server');
  });
});

describe('featuredOnPhone', () => {
  it('keeps exactly the featured projects, in order', () => {
    const featured = featuredOnPhone(projectContent.projects);
    const expected = projectContent.projects.filter((p) => p.featuredOnPhone).map((p) => p.name);
    expect(featured.map((p) => p.name)).toEqual(expected);
    expect(featured).toHaveLength(4);
  });
});
