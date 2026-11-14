import { describe, expect, it } from 'vitest';
import { projectLinks } from '../../src/lib/project-links';

describe('projectLinks', () => {
  it('opens live first and keeps source beside it', () => {
    const { primary, rest } = projectLinks({ source: 's', live: 'l' });
    expect(primary?.label).toBe('live');
    expect(rest.map((link) => link.label)).toEqual(['source']);
  });

  it('never repeats the primary link', () => {
    expect(projectLinks({ internal: '/homelab' })).toEqual({
      primary: { label: 'homelab', href: '/homelab', external: false },
      rest: [],
    });
    expect(projectLinks({ source: 's' }).rest).toEqual([]);
  });

  it('returns no primary when a project has no links', () => {
    expect(projectLinks({})).toEqual({ primary: null, rest: [] });
  });
});
