import { test, expect } from "@playwright/test";
import { prepare, final, clickAndNavigate } from "../helpers/router-assertions";

test.describe("SVG transition navigation", () => {
  test("navigates from home to detail", async ({ page }) => {
    await prepare(page, {
      url: "/",
      title: "Home",
      namespace: "home",
    });
    await clickAndNavigate(page, "a.intro__link");
    await final(page, {
      url: "/page.html",
      title: "Detail",
      namespace: "detail",
    });
  });

  test("navigates from detail back to home", async ({ page }) => {
    await prepare(page, {
      url: "/page.html",
      title: "Detail",
      namespace: "detail",
    });
    await clickAndNavigate(page, "a.back");
    await final(page, {
      url: "/index.html",
      title: "Home",
      namespace: "home",
    });
  });

  test("is-animating class applied during transition", async ({ page }) => {
    await prepare(page, {
      url: "/",
      title: "Home",
      namespace: "home",
    });

    // Install a MutationObserver to detect is-animating class
    await page.evaluate(() => {
      (window as any).__sawAnimatingClass = false;
      const rv = document.querySelector("router-view");
      if (!rv) return;
      const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
          if (
            m.type === "attributes" &&
            m.attributeName === "class" &&
            rv.classList.contains("is-animating")
          ) {
            (window as any).__sawAnimatingClass = true;
          }
        }
      });
      observer.observe(rv, { attributes: true });
    });

    await clickAndNavigate(page, "a.intro__link");

    // Verify the class was added at some point during transition
    const sawClass = await page.evaluate(
      () => (window as any).__sawAnimatingClass,
    );
    expect(sawClass).toBe(true);

    // Verify it was removed after transition
    const routerView = page.locator("router-view");
    await expect(routerView).not.toHaveClass(/is-animating/);
  });

  test("container swap leaves only one child", async ({ page }) => {
    await prepare(page, {
      url: "/",
      title: "Home",
      namespace: "home",
    });
    await clickAndNavigate(page, "a.intro__link");
    await expect(page.locator("router-view > *")).toHaveCount(1);
    await expect(
      page.locator("router-view > *:first-child"),
    ).toHaveAttribute("data-namespace", "detail");
  });
});
