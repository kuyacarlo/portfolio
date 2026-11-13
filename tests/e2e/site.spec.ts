import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { navRoutes, routes } from './routes';

const isPhone = (name: string) => name === 'phone';

for (const route of routes) {
  test.describe(`route ${route}`, () => {
    test('renders one h1, a main target and a skip link first', async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('main#main')).toHaveCount(1);
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toHaveClass(/skip-link/);
    });

    test('has no horizontal page scroll', async ({ page }) => {
      await page.goto(route);
      await page.waitForLoadState('load');
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(scrollWidth).toBe(innerWidth);
    });

    test('has no serious or critical axe violations', async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).exclude('iframe').analyze();
      const blocking = results.violations
        .filter((v) => v.impact === 'serious' || v.impact === 'critical')
        .map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`);
      expect(blocking).toEqual([]);
    });
  });
}

test('every nav link resolves and marks the current page', async ({ page }, info) => {
  for (const route of navRoutes) {
    await page.goto('/');
    if (isPhone(info.project.name)) await page.getByRole('button', { name: 'Menu' }).click();
    const nav = page.getByRole('navigation', { name: isPhone(info.project.name) ? 'Main mobile' : 'Main' });
    await nav.locator(`a[href="${route}"]`).click();
    await expect(page).toHaveURL(new RegExp(`${route}$`));
    const current = page.locator(`a[href="${route}"][aria-current="page"]`);
    await expect(current.first()).toBeAttached();
  }
});

test('unknown paths render the 404 page', async ({ page }) => {
  const response = await page.goto('/no-such-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('never committed');
});

test.describe('phone only', () => {
  test.beforeEach(({}, info) => test.skip(!isPhone(info.project.name), 'phone layout'));

  test('menu opens, closes and closes on Esc with focus back on the button', async ({ page }) => {
    await page.goto('/');
    const button = page.locator('.menu-toggle');
    const menu = page.locator('#mobile-menu');
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(button).toHaveText(/close/i);
    await expect(menu).toBeVisible();
    await button.click();
    await expect(menu).toBeHidden();
    await button.click();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(button).toBeFocused();
    await expect(button).toHaveText(/menu/i);
  });

  test('show all expands and collapses projects and competitions', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('.phone-project-card:visible');
    await expect(cards).toHaveCount(4);
    const projects = page.locator('[data-expand-projects]');
    await projects.click();
    await expect(projects).toHaveAttribute('aria-expanded', 'true');
    await expect(projects).toHaveText('SHOW FEWER');
    expect(await cards.count()).toBeGreaterThan(4);
    await projects.click();
    await expect(cards).toHaveCount(4);

    const results = page.locator('.phone-result-card:visible');
    await expect(results).toHaveCount(2);
    await page.locator('[data-expand-competitions]').click();
    expect(await results.count()).toBeGreaterThan(2);
  });
});

test('notes filter mirrors the layer in the URL and shows the empty state', async ({ page }) => {
  await page.goto('/notes');
  const items = page.locator('.note-list-item:visible');
  const total = await items.count();
  expect(total).toBeGreaterThan(0);
  await page.getByRole('button', { name: '04', exact: true }).click();
  await expect(page).toHaveURL(/\?layer=4$/);
  await expect(page.getByRole('button', { name: '04', exact: true })).toHaveAttribute('aria-pressed', 'true');
  for (const layers of await items.evaluateAll((els) => els.map((el) => (el as HTMLElement).dataset.noteLayers ?? ''))) {
    expect(layers.split(',')).toContain('4');
  }
  await page.goto('/notes?layer=1');
  const empty = page.getByText('Nothing at this layer yet.');
  if ((await items.count()) === 0) await expect(empty).toBeVisible();
  else await expect(empty).toBeHidden();
});
