import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const isPhone = (name: string) => name === 'phone';

// One test per note file, so math, Mermaid, tables and long code are all covered.
const slugs = readdirSync(fileURLToPath(new URL('../../src/content/notes', import.meta.url)))
  .filter((file) => file.endsWith('.md'))
  .map((file) => file.replace(/\.md$/, ''));

for (const slug of slugs) {
  test(`note ${slug} renders without page scroll or blocking axe violations`, async ({ page }) => {
    test.setTimeout(60_000); // axe over long notes with math and diagrams
    const response = await page.goto(`/notes/${slug}`);
    expect(response?.status()).toBe(200);
    await page.waitForLoadState('load');
    await expect(page.locator('h1')).toHaveCount(1);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBe(innerWidth);
    const results = await new AxeBuilder({ page }).exclude('iframe').analyze();
    const blocking = results.violations
      .filter((v) => v.impact === 'serious' || v.impact === 'critical')
      .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
    expect(blocking).toEqual([]);
  });
}

test('layer filter buttons are toggles and back/forward restores the filter', async ({ page }) => {
  await page.goto('/notes');
  const all = page.getByRole('button', { name: 'all', exact: true });
  await expect(all).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-layer-filter]')).toHaveCount(7);
  await page.getByRole('button', { name: '04', exact: true }).click();
  await expect(all).toHaveAttribute('aria-pressed', 'false');
  await page.goBack();
  await expect(page).toHaveURL(/\/notes$/);
  await expect(all).toHaveAttribute('aria-pressed', 'true');
});

test('note page: breadcrumb, tag row, contents from h2s, prev/next and edit link', async ({ page }, info) => {
  await page.goto('/notes/disk-full-with-free-space');
  await expect(page.locator('.note-crumb a[href="/notes"]')).toHaveText('notes');
  const tags = page.locator('.note-tags .tag');
  await expect(tags.nth(1)).toHaveText(/^\d+ min read$/);
  await expect(page.locator('.note-tags .tag-inverted')).toHaveText('04 server');

  const h2s = await page.locator('.note-prose h2').allTextContents();
  const toc = page.locator('nav[aria-label="On this page"] a');
  await expect(toc).toHaveCount(h2s.length);
  if (isPhone(info.project.name)) await expect(toc.first()).toBeHidden();
  else await expect(toc.first()).toBeVisible();

  const cells = page.locator('nav[aria-label="More notes"] a');
  await expect(cells).toHaveCount(2);

  const pre = page.locator('.note-prose pre').first();
  await expect(pre).toHaveCSS('background-color', 'rgb(242, 242, 242)');
  await expect(pre.locator('span').first()).toHaveCSS('color', 'rgb(0, 0, 0)');

  await expect(page.locator('.site-footer a', { hasText: 'edit on GitHub' })).toHaveAttribute(
    'href',
    /github\.com\/kuyacarlo\/portfolio\/edit\/main\/src\/content\/notes\/disk-full-with-free-space\.md$/,
  );
});
