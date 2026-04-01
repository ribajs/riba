import { test, expect } from "@playwright/test";
import { prepare, final, clickAndNavigate } from "../helpers/router-assertions";

test.describe("Slide transition navigation", () => {
  test("navigates from home to page-1", async ({ page }) => {
    await prepare(page, {
      url: "/",
      title: "Home",
      namespace: "home",
    });
    await clickAndNavigate(page, 'a[data-direction="next"]');
    await final(page, {
      url: "/page-1.html",
      title: "Page 1",
      namespace: "page-1",
    });
  });

  test("navigates from page-1 back to home via prev", async ({ page }) => {
    await prepare(page, {
      url: "/page-1.html",
      title: "Page 1",
      namespace: "page-1",
    });
    await clickAndNavigate(page, 'a[data-direction="prev"]');
    await final(page, {
      url: "/index.html",
      title: "Home",
      namespace: "home",
    });
  });

  test("container swap leaves only one child", async ({ page }) => {
    await prepare(page, {
      url: "/",
      title: "Home",
      namespace: "home",
    });
    await clickAndNavigate(page, 'a[data-direction="next"]');
    await expect(page.locator("router-view > *")).toHaveCount(1);
    await expect(
      page.locator("router-view > *:first-child"),
    ).toHaveAttribute("data-namespace", "page-1");
  });

  test("browser back button works after PJAX navigation", async ({ page }) => {
    await prepare(page, {
      url: "/",
      title: "Home",
      namespace: "home",
    });
    await clickAndNavigate(page, 'a[data-direction="next"]');
    await final(page, {
      url: "/page-1.html",
      title: "Page 1",
      namespace: "page-1",
    });

    await page.goBack();
    const routerView = page.locator("router-view");
    await expect(routerView).toHaveClass(/transition-complete/, {
      timeout: 10_000,
    });
    await expect(page).toHaveURL(/index\.html|\/$/);
    await expect(
      routerView.locator("> *:first-child"),
    ).toHaveAttribute("data-namespace", "home");
  });
});
