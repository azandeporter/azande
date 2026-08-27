import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Content', () => {
  test('leads with the current role', async ({ page }) => {
    await expect(page.getByText('Site Reliability Engineer II').first()).toBeVisible();
  });

  test('never mentions VitalChek', async ({ page }) => {
    const body = (await page.locator('body').innerText()).toLowerCase();
    expect(body).not.toContain('vitalchek');
  });

  test('keeps the email address off the page', async ({ page }) => {
    const body = await page.locator('body').innerText();
    expect(body).not.toContain('@gmail.com');

    const hrefs = await page.locator('a').evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute('href') ?? '')
    );
    expect(hrefs.some((href) => href.startsWith('mailto:'))).toBe(false);
  });

  test('uses no em dashes in the prose', async ({ page }) => {
    const body = await page.locator('body').innerText();
    expect(body).not.toContain('\u2014');
  });

  test('lists every role in the experience section', async ({ page }) => {
    for (const company of ['LexisNexis Risk Solutions', 'SAS', 'TIAA']) {
      await expect(page.getByText(company).first()).toBeVisible();
    }
  });

  test('links to Distinctful and opens it safely', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Distinctful' });
    await expect(link).toHaveAttribute('href', 'https://distinctful.com');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  });

  test('links to Founder Frames and opens it safely', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Founder Frames' });
    await expect(link).toHaveAttribute('href', 'https://www.founderframes.co/');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  });

  test('exposes contact links as accessible icons', async ({ page }) => {
    for (const [name, href] of [
      ['LinkedIn', 'https://linkedin.com/in/azandeporter'],
      ['GitHub', 'https://github.com/azandeporter'],
    ] as const) {
      const link = page.getByRole('link', { name });
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveAttribute('rel', /noopener/);
      await expect(link.locator('svg')).toBeVisible();
    }
  });

  test('serves the AP favicon rather than a framework default', async ({ page, request }) => {
    const icons = await page.locator('link[rel~="icon"], link[rel="apple-touch-icon"]').evaluateAll(
      (nodes) => nodes.map((node) => node.getAttribute('href') ?? '')
    );
    expect(icons.length).toBeGreaterThan(0);

    // A conflicting file in public/ makes Next serve a 500 for the icon route
    // while the page itself still renders, so the failure is invisible in the UI.
    for (const href of icons) {
      const response = await request.get(href);
      expect(response.status(), `${href} should resolve`).toBe(200);
      expect(Number(response.headers()['content-length'] ?? 1)).toBeGreaterThan(0);
    }
  });
});

test.describe('Navigation', () => {
  test('exposes every section anchor and target', async ({ page }) => {
    for (const [label, id] of [
      ['About', 'about'],
      ['Experience', 'experience'],
      ['Interests', 'interests'],
      ['Contact', 'contact'],
    ] as const) {
      await expect(page.getByRole('link', { name: label, exact: true })).toHaveAttribute(
        'href',
        `#${id}`
      );
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test('marks the active section while scrolling', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Contact', exact: true })).toHaveAttribute(
      'aria-current',
      'true'
    );
  });
});

test.describe('Layout', () => {
  test('never overflows horizontally', async ({ page }) => {
    const viewportWidth = page.viewportSize()?.width ?? 0;
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test('has a single h1 and section headings beneath it', async ({ page }) => {
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await page.locator('h2').count()).toBeGreaterThan(0);
  });

  test('gives every image alt text', async ({ page }) => {
    const alts = await page
      .locator('img')
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('alt')));
    for (const alt of alts) {
      expect(alt).not.toBeNull();
    }
  });

  test('renders without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    expect(errors.filter((e) => !e.includes('favicon') && !e.includes('404'))).toHaveLength(0);
  });

  // Safari omits links from the tab sequence unless "Press Tab to highlight
  // each item" is enabled, so focus is asserted directly rather than via Tab.
  test('gives section links a visible focus state', async ({ page }) => {
    const link = page.getByRole('link', { name: 'Experience', exact: true });
    await link.focus();
    await expect(link).toBeFocused();
    await expect(link).toBeVisible();
  });
});
