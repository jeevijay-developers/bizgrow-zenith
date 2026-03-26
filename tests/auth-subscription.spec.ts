import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'http://localhost:8082';

const ACCOUNTS = [
  { name: 'Akhilesh Jain', email: 'akhilesh.demo@bizgrow.in', password: 'Demo@12345' },
  { name: 'Sumitro',       email: 'sumitro.demo@bizgrow.in',  password: 'Demo@12345' },
  { name: 'Vikas Patel',   email: 'vikas.demo@bizgrow.in',    password: 'Demo@12345' },
];

// SPA navigation via sidebar links (React Router pushState — cache persists)
const SPA_TABS = [
  { label: 'Products',       href: '/dashboard/products' },
  { label: 'Orders',         href: '/dashboard/orders' },
  { label: 'POS Billing',    href: '/dashboard/pos' },
  { label: 'Store Settings', href: '/dashboard/store-settings' },
  { label: 'Notifications',  href: '/dashboard/notifications' },
  { label: 'Billing',        href: '/dashboard/billing' },
  { label: 'Dashboard Home', href: '/dashboard' },
];

async function login(page: Page, email: string, password: string) {
  await page.goto(`${BASE_URL}/auth?mode=login`);
  await page.waitForSelector('input[type="email"]', { timeout: 10000 });
  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/dashboard/, { timeout: 15000 });
  await page.waitForLoadState('networkidle');
}

async function hardLogout(page: Page) {
  await page.evaluate(() => {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('sb-') || k.includes('supabase') || k.includes('bizgrow')) {
        localStorage.removeItem(k);
      }
    });
    sessionStorage.clear();
  });
}

/**
 * Read the plan badge from the sidebar specifically.
 * The badge is the span inside the link <a href="/dashboard/billing"> in the sidebar.
 * This avoids false positives from plan card headings on the Billing page itself.
 */
async function waitForPlan(page: Page): Promise<string> {
  try {
    // Sidebar plan badge: <Link to="/dashboard/billing"><span>…Plan</span></Link>
    const planSpan = page
      .locator('a[href="/dashboard/billing"] span')
      .filter({ hasText: /\b(free|starter|pro)\s+plan\b/i })
      .first();
    await planSpan.waitFor({ state: 'visible', timeout: 8000 });
    return (await planSpan.textContent() || '').trim().toLowerCase();
  } catch {
    return 'not-found';
  }
}

// ─── Tests ────────────────────────────────────────────────────────────────────
test.describe('BizGrow360 — Auth & Subscription', () => {
  test.describe.configure({ mode: 'serial' });

  // ── TEST 1: Login → /dashboard (not /join) ──────────────────────────────────
  for (const account of ACCOUNTS) {
    test(`[Login] ${account.name} lands on /dashboard`, async ({ page }) => {
      await login(page, account.email, account.password);
      const url = page.url();
      console.log(`  URL: ${url}`);
      expect(url).toContain('/dashboard');
      expect(url).not.toContain('/join');
      expect(url).not.toContain('/auth');
      await hardLogout(page);
    });
  }

  // ── TEST 2: Subscription plan consistent via SPA navigation ────────────────
  // This is the core flicker test. Uses sidebar clicks (React Router pushState)
  // so React Query cache is preserved — mimics real user navigation.
  test('[Subscription] Plan stays consistent during SPA navigation', async ({ page }) => {
    await login(page, ACCOUNTS[0].email, ACCOUNTS[0].password);

    // Wait for the plan to resolve on the initial page load
    const initialPlan = await waitForPlan(page);
    console.log(`  Initial plan after login: "${initialPlan}"`);
    expect(initialPlan, 'Plan should be visible after login').not.toBe('not-found');

    const results: Record<string, string> = { 'Initial (Dashboard)': initialPlan };

    // Navigate via sidebar links (SPA navigation — cache preserved)
    for (const tab of SPA_TABS) {
      // Click the sidebar link instead of page.goto() to preserve React Query cache
      const link = page.locator(`a[href="${tab.href}"]`).first();
      await link.click();
      await page.waitForURL(new RegExp(tab.href.replace('/', '\\/')), { timeout: 8000 });
      // Small wait for any React Query background refetch to settle
      await page.waitForTimeout(600);

      const plan = await waitForPlan(page);
      results[tab.label] = plan;
      console.log(`  ${tab.label.padEnd(22)} → "${plan}"`);
    }

    // All tabs must show the SAME plan (the original flicker bug: free ↔ pro alternating)
    const visiblePlans = Object.values(results).filter(p => p !== 'not-found');
    const uniquePlans = [...new Set(visiblePlans)];

    if (uniquePlans.length > 1) {
      console.log('\n  ❌ FLICKER DETECTED across tabs:');
      Object.entries(results).forEach(([tab, plan]) => console.log(`     ${tab}: "${plan}"`));
    } else {
      console.log(`\n  ✅ No flicker — all tabs consistently show "${uniquePlans[0]}"`);
    }

    expect(uniquePlans.length,
      `Plan flickered across tabs: ${uniquePlans.join(' ↔ ')}`
    ).toBe(1);

    await hardLogout(page);
  });

  // ── TEST 3: Full page reload doesn't redirect to /join ──────────────────────
  test('[Redirect] Hard reload stays on /dashboard (not /join)', async ({ page }) => {
    await login(page, ACCOUNTS[1].email, ACCOUNTS[1].password);
    await page.waitForTimeout(1000);

    await page.reload({ waitUntil: 'networkidle' });
    // Wait past the 8s grace period to confirm no delayed /join redirect
    await page.waitForTimeout(9000);

    const url = page.url();
    console.log(`  URL after reload + 9s: ${url}`);
    expect(url).toContain('/dashboard');
    expect(url).not.toContain('/join');

    await hardLogout(page);
  });

  // ── TEST 4: Navigating all tabs never redirects to /join ────────────────────
  test('[Redirect] No tab causes /join redirect', async ({ page }) => {
    await login(page, ACCOUNTS[2].email, ACCOUNTS[2].password);
    await page.waitForLoadState('networkidle');

    for (const tab of SPA_TABS) {
      const link = page.locator(`a[href="${tab.href}"]`).first();
      await link.click();
      await page.waitForURL(new RegExp(tab.href.replace('/', '\\/')), { timeout: 8000 });
      await page.waitForTimeout(500);

      const url = page.url();
      console.log(`  ${tab.label.padEnd(22)} → ${url}`);
      expect(url, `"${tab.label}" should not redirect to /join`).not.toContain('/join');
      expect(url, `"${tab.label}" should not redirect to login`).not.toMatch(/\/auth\?mode=login/);
    }

    await hardLogout(page);
  });

  // ── TEST 5: Each account has products ──────────────────────────────────────
  test('[Products] Products page loads for each account', async ({ page }) => {
    for (const account of ACCOUNTS) {
      await login(page, account.email, account.password);

      const link = page.locator('a[href="/dashboard/products"]').first();
      await link.click();
      await page.waitForURL(/\/dashboard\/products/, { timeout: 8000 });
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(2000);

      const url = page.url();
      console.log(`  ${account.name.padEnd(20)} → ${url}`);
      expect(url).toContain('/dashboard/products');
      expect(url).not.toContain('/join');

      await hardLogout(page);
      // Navigate to login for next iteration
      await page.goto(`${BASE_URL}/auth?mode=login`);
    }
  });
});
