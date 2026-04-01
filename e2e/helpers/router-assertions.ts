import { type Page, expect } from "@playwright/test";

export interface PageOptions {
  url: string;
  title: string;
  namespace: string;
}

/**
 * Navigate to a page and verify initial state.
 * Equivalent to Barba's cy.prepare().
 */
export async function prepare(page: Page, opts: PageOptions) {
  await page.goto(opts.url);
  const routerView = page.locator("router-view");
  await routerView.waitFor();
  await expect(page).toHaveTitle(new RegExp(opts.title, "i"));
  const container = routerView.locator("> *:first-child");
  await expect(container).toHaveAttribute("data-namespace", opts.namespace);
  await expect(routerView).toHaveClass(/transition-complete/, {
    timeout: 10_000,
  });
}

/**
 * Assert the page state after a PJAX navigation completed.
 * Equivalent to Barba's cy.final().
 */
export async function final(page: Page, opts: PageOptions) {
  const routerView = page.locator("router-view");
  await expect(routerView).toHaveClass(/transition-complete/, {
    timeout: 10_000,
  });
  await expect(page).toHaveURL(new RegExp(opts.url));
  await expect(page).toHaveTitle(new RegExp(opts.title, "i"));
  const container = routerView.locator("> *:first-child");
  await expect(container).toHaveAttribute("data-namespace", opts.namespace);
  // Old container should have been removed - only one direct child remains
  await expect(routerView.locator("> *")).toHaveCount(1);
}

/**
 * Click a link and wait for the PJAX transition to complete.
 */
export async function clickAndNavigate(page: Page, selector: string) {
  const routerView = page.locator("router-view");
  // Remove transition-complete so we can detect when it reappears
  await routerView.evaluate((el) => el.classList.remove("transition-complete"));
  await page.locator(selector).click();
  await expect(routerView).toHaveClass(/transition-complete/, {
    timeout: 10_000,
  });
}
