import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for animations to settle
    await page.waitForTimeout(1000);
  });

  test('hero section displays correctly', async ({ page }) => {
    // Check main heading is visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Check profile image loads
    const profileImage = page.locator('img[alt="Azande Porter"]');
    await expect(profileImage).toBeVisible();
    
    // Check CTA buttons are visible
    await expect(page.getByRole('link', { name: /View Experience/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /LinkedIn/i }).first()).toBeVisible();
  });

  test('navigation is functional', async ({ page, isMobile }) => {
    if (isMobile) {
      // Mobile: check hamburger menu
      const menuButton = page.getByRole('button', { name: /Toggle menu/i });
      await expect(menuButton).toBeVisible();
      await menuButton.click();
      await page.waitForTimeout(300);
    } else {
      // Desktop: check nav links directly visible
      await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Skills/i })).toBeVisible();
      await expect(page.getByRole('link', { name: /Experience/i })).toBeVisible();
    }
  });

  test('skills section renders all cards', async ({ page }) => {
    // Navigate to skills section
    await page.click('text=Skills');
    await page.waitForTimeout(500);

    // Check all skill cards are present
    await expect(page.getByText('Backend Systems')).toBeVisible();
    await expect(page.getByText('Cloud Infrastructure')).toBeVisible();
    await expect(page.getByText('DevOps Tools')).toBeVisible();
  });

  test('experience section renders timeline', async ({ page }) => {
    await page.click('text=Experience');
    await page.waitForTimeout(500);

    // Check experience items
    await expect(page.getByText('LexisNexis Risk Solutions')).toBeVisible();
    await expect(page.getByText('SAS')).toBeVisible();
    await expect(page.getByText('TIAA')).toBeVisible();
  });

  test('no horizontal overflow on any viewport', async ({ page }) => {
    const viewportWidth = page.viewportSize()?.width || 0;
    
    // Check body doesn't overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  });

  test('text is readable (no cut-off)', async ({ page }) => {
    // Check hero text isn't truncated
    const heroText = page.locator('h1');
    const boundingBox = await heroText.boundingBox();
    expect(boundingBox).not.toBeNull();
    
    if (boundingBox) {
      const viewportWidth = page.viewportSize()?.width || 0;
      expect(boundingBox.x).toBeGreaterThanOrEqual(0);
      expect(boundingBox.x + boundingBox.width).toBeLessThanOrEqual(viewportWidth + 20);
    }
  });

  test('buttons are tap-friendly on mobile', async ({ page, isMobile }) => {
    if (isMobile) {
      const buttons = page.locator('a, button').filter({ hasText: /.+/ });
      const count = await buttons.count();
      
      for (let i = 0; i < Math.min(count, 10); i++) {
        const button = buttons.nth(i);
        const box = await button.boundingBox();
        if (box) {
          // Minimum touch target: 44x44 (Apple HIG) or close
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

  test('footer is visible and functional', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    await expect(page.getByText(/© 2026 Azande Porter/i)).toBeVisible();
    
    const backToTop = page.getByRole('button', { name: /Back to top/i });
    await expect(backToTop).toBeVisible();
    
    await backToTop.click();
    await page.waitForTimeout(500);
    
    // Should scroll back to top
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });
});

test.describe('Edge Cases', () => {
  test('handles rapid scrolling', async ({ page }) => {
    await page.goto('/');
    
    // Rapid scroll
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(100);
    }
    
    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
  });

  test('handles window resize', async ({ page }) => {
    await page.goto('/');
    
    // Start at desktop
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(300);
    
    // Resize to tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
    
    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);
    
    // Content should still be visible
    await expect(page.locator('h1')).toBeVisible();
  });

  test('links have correct targets', async ({ page }) => {
    await page.goto('/');
    
    // External links should open in new tab
    const linkedInLinks = page.locator('a[href*="linkedin"]');
    const count = await linkedInLinks.count();
    
    for (let i = 0; i < count; i++) {
      const link = linkedInLinks.nth(i);
      const target = await link.getAttribute('target');
      const rel = await link.getAttribute('rel');
      
      expect(target).toBe('_blank');
      expect(rel).toContain('noopener');
    }
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
      expect(alt?.length).toBeGreaterThan(0);
    }
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Filter out known benign errors
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('404')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Accessibility', () => {
  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Should have exactly one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // h2s should come after h1
    const h2s = page.locator('h2');
    expect(await h2s.count()).toBeGreaterThan(0);
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Something should be focused
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});

