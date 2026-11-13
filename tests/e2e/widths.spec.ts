import { expect, test } from '@playwright/test';
import { routes } from './routes';

// HANDOFF §3: 768–1023 keeps the desktop layout and wraps side-by-side regions.
// Nothing may scroll sideways anywhere in that band, nor at the phone/tablet edges.
const widths = [360, 767, 768, 900, 1023, 1024, 1280];

test.describe('in-between widths', () => {
  test.beforeEach(({}, info) => test.skip(info.project.name !== 'desktop', 'one pass is enough'));

  for (const width of widths) {
    test(`no horizontal page scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      const overflowing: string[] = [];
      for (const route of [...routes, '/notes/syntax-reference', '/no-such-page']) {
        await page.goto(route);
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        if (scrollWidth > width) overflowing.push(`${route} (${scrollWidth})`);
      }
      expect(overflowing).toEqual([]);
    });
  }
});
