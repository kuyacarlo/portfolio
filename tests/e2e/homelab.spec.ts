import { readdirSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import homelab from '../../src/data/homelab.json' with { type: 'json' };

const noteSlugs = new Set(readdirSync('src/content/notes').map((file) => file.replace(/\.mdx?$/, '')));
const withNote = homelab.incidents.filter((incident) => noteSlugs.has(incident.slug));
const withoutNote = homelab.incidents.filter((incident) => !noteSlugs.has(incident.slug));

test.describe('/homelab', () => {
  test('links only to the forge and to notes that exist', async ({ page }) => {
    await page.goto('/homelab');
    const hrefs = await page.locator('main a').evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? ''));
    for (const href of hrefs) {
      if (href.startsWith('/notes/')) expect(noteSlugs.has(href.slice('/notes/'.length))).toBe(true);
      else expect(new URL(href).host).toBe('forge.kuyacarlo.dev');
    }
  });

  test('every linked note resolves', async ({ page }) => {
    for (const incident of withNote) {
      const response = await page.goto(`/notes/${incident.slug}`);
      expect(response?.status()).toBe(200);
    }
  });

  test('incidents without a note render without a link', async ({ page }) => {
    await page.goto('/homelab');
    const main = page.locator('main');
    for (const incident of withoutNote) {
      await expect(main.locator(`a[href="/notes/${incident.slug}"]`)).toHaveCount(0);
      await expect(main.getByText(incident.title, { exact: true }).locator('visible=true')).toHaveCount(1);
    }
    await expect(main.getByText(/browse notes/i)).toHaveCount(0);
  });

  test('has no numbered eyebrows or layer names beside the badges', async ({ page }) => {
    await page.goto('/homelab');
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/0\d\s+—/);
    for (const name of ['network', 'server', 'app']) {
      await expect(page.locator('main').getByText(new RegExp(`^\\s*${name}\\s*$`, 'i'))).toHaveCount(0);
    }
  });

  test('publishes no hostnames, ports or IPs beyond the forge', async ({ page }) => {
    await page.goto('/homelab');
    const text = await page.locator('main').innerText();
    expect(text).not.toMatch(/\b\d{1,3}(\.\d{1,3}){3}\b/);
    expect(text).not.toMatch(/:\d{2,5}\b/);
    const hosts = text.match(/\b[a-z0-9-]+(\.[a-z0-9-]+)*\.(dev|lan|local|home|internal|com|net|io)\b/gi) ?? [];
    expect(hosts.filter((host) => host !== 'forge.kuyacarlo.dev')).toEqual([]);
  });
});
