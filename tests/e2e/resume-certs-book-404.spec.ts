import { expect, test } from '@playwright/test';
import certData from '../../src/data/certs.json' with { type: 'json' };
import resume from '../../src/data/resume.json' with { type: 'json' };

const isPhone = (name: string) => name === 'phone';

test('resume: phone shows at most 2 bullets per entry until "more" is pressed', async ({ page }, info) => {
  test.skip(!isPhone(info.project.name), 'phone layout');
  await page.goto('/resume');
  const entries = page.locator('[data-resume-entry]');
  await expect(entries).toHaveCount(resume.experience.length);
  for (let i = 0; i < resume.experience.length; i += 1) {
    const entry = entries.nth(i);
    const total = resume.experience[i].bullets.length;
    await expect(entry.locator('li:visible')).toHaveCount(Math.min(total, 2));
    const more = entry.getByRole('button', { name: 'more' });
    if (total <= 2) {
      await expect(more).toHaveCount(0);
      continue;
    }
    await expect(more).toHaveAttribute('aria-expanded', 'false');
    await more.click();
    await expect(entry.getByRole('button', { name: 'less' })).toHaveAttribute('aria-expanded', 'true');
    await expect(entry.locator('li:visible')).toHaveCount(total);
    await entry.getByRole('button', { name: 'less' }).click();
    await expect(entry.locator('li:visible')).toHaveCount(2);
  }
});

test('resume: desktop shows every bullet and no toggle', async ({ page }, info) => {
  test.skip(isPhone(info.project.name), 'desktop layout');
  await page.goto('/resume');
  const bullets = resume.experience.reduce((sum, entry) => sum + entry.bullets.length, 0);
  await expect(page.locator('[data-resume-entry] li:visible')).toHaveCount(bullets);
  await expect(page.locator('[data-resume-more]:visible')).toHaveCount(0);
});

test('certs: only certs with a verify link render, with no placeholder cards', async ({ page }) => {
  await page.goto('/certs');
  const verified = (certData.certs as { verifyUrl?: string }[]).filter((cert) => cert.verifyUrl);
  await expect(page.locator('.cert-card')).toHaveCount(verified.length);
  await expect(page.getByText('[Certificate name]')).toHaveCount(0);
});

test('book: keeps the Cal.com embed and the email fallback, with no invented slots', async ({ page }) => {
  await page.goto('/book');
  await expect(page.locator('iframe[src*="cal.com"]')).toHaveCount(1);
  await expect(page.locator('footer a[href^="mailto:"]')).toHaveCount(1);
  await expect(page.getByText('[day]')).toHaveCount(0);
});

test('404: the missing-step mark is a labelled image', async ({ page }) => {
  await page.goto('/no-such-page');
  await expect(page.getByRole('img', { name: /fourth step missing/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home', exact: true })).toBeVisible();
});
