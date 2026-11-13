import { expect, test } from '@playwright/test';
import { routes } from './routes';

// HANDOFF §4: focus is a 2px outline everywhere (paper on inverted surfaces).
// Tab through each page and require a visible outline on every stop.
for (const route of routes) {
  test(`every tab stop on ${route} shows a focus outline`, async ({ page }) => {
    await page.goto(route);
    const missing: string[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < 60; i += 1) {
      await page.keyboard.press('Tab');
      const stop = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el || el === document.body || el.tagName === 'IFRAME') return null;
        const style = getComputedStyle(el);
        const id = `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ')[0] : ''} "${(el.textContent ?? '').trim().slice(0, 24)}"`;
        const visible = el.getBoundingClientRect().width > 0;
        // The outline sits outside the element (offset 2px), or inside it when the
        // offset is negative; compare against whatever is behind it there.
        const behind = (start: Element | null) => {
          for (let node = start; node; node = node.parentElement) {
            const bg = getComputedStyle(node).backgroundColor;
            if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') return bg;
          }
          return 'rgb(255, 255, 255)';
        };
        const inside = parseFloat(style.outlineOffset) < 0;
        const ground = behind(inside ? el : el.parentElement);
        const ok = style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2 && style.outlineColor !== ground;
        return { id, ok: ok || !visible };
      });
      if (!stop) break;
      if (seen.has(stop.id)) break;
      seen.add(stop.id);
      if (!stop.ok) missing.push(stop.id);
    }
    expect(seen.size).toBeGreaterThan(1);
    expect(missing).toEqual([]);
  });
}
