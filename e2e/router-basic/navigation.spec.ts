import { test, expect } from "@playwright/test";

test.describe("Router basic navigation (no transitions)", () => {
  test("loads home page with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Index/);
    await expect(page.locator("h1")).toContainText("You are on home");
  });

  test("navigates from home to page-1 via nav link", async ({ page }) => {
    await page.goto("/");
    const routerView = page.locator("router-view");
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });

    await routerView.evaluate((el) =>
      el.classList.remove("transition-complete"),
    );
    await page.locator('a.nav-link[href="/page-1.html"]').click();
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });

    await expect(page).toHaveTitle(/Page 1/);
    await expect(page).toHaveURL(/page-1/);
    await expect(page.locator("h1")).toContainText("You are on page 1");
  });

  test("navigates to page-2 and back to home", async ({ page }) => {
    await page.goto("/");
    const routerView = page.locator("router-view");
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });

    // Go to page-2
    await routerView.evaluate((el) =>
      el.classList.remove("transition-complete"),
    );
    await page.locator('a.nav-link[href="/page-2.html"]').click();
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });
    await expect(page).toHaveTitle(/Page 2/);

    // Go back to home
    await routerView.evaluate((el) =>
      el.classList.remove("transition-complete"),
    );
    await page.locator('a.nav-link[href="/index.html"]').click();
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });
    await expect(page).toHaveTitle(/Index/);
    await expect(page.locator("h1")).toContainText("You are on home");
  });

  test("browser back button works after navigation", async ({ page }) => {
    await page.goto("/");
    const routerView = page.locator("router-view");
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });

    // Navigate to page-1
    await routerView.evaluate((el) =>
      el.classList.remove("transition-complete"),
    );
    await page.locator('a.nav-link[href="/page-1.html"]').click();
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });
    await expect(page).toHaveURL(/page-1/);

    // Go back
    await page.goBack();
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });
    await expect(page).toHaveURL(/index\.html|\/$/);
  });

  test("container swap leaves only one child in router-view", async ({
    page,
  }) => {
    await page.goto("/");
    const routerView = page.locator("router-view");
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });

    await routerView.evaluate((el) =>
      el.classList.remove("transition-complete"),
    );
    await page.locator('a.nav-link[href="/page-1.html"]').click();
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });

    // Only one direct child should remain
    await expect(routerView.locator("> *")).toHaveCount(1);
  });
});
