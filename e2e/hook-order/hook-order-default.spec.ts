import { test, expect } from "@playwright/test";

const expectedOnce = [
  "global:beforeOnce",
  "beforeOnce",
  "global:once",
  "once",
  "global:afterOnce",
  "afterOnce",
];

const expectedPage = [
  "global:before",
  "before",
  "global:beforeLeave",
  "beforeLeave",
  "global:leave",
  "leave",
  "global:afterLeave",
  "afterLeave",
  "global:beforeEnter",
  "beforeEnter",
  "global:enter",
  "enter",
  "global:afterEnter",
  "afterEnter",
  "global:after",
  "after",
];

test("non-sync transition fires hooks in sequential order", async ({
  page,
}) => {
  await page.goto("/e2e-hooks.html");

  // Wait for router-view to exist and once transition to complete
  const routerView = page.locator("router-view");
  await routerView.waitFor();
  await expect(routerView).toHaveClass(/transition-complete/, {
    timeout: 10_000,
  });

  // Click the default (non-sync) link
  await routerView.evaluate((el) => el.classList.remove("transition-complete"));
  await page.locator("#link-default").click();
  await expect(routerView).toHaveClass(/transition-complete/, {
    timeout: 10_000,
  });

  // Read the hooks list
  const items = await page.locator("#hooks-list li").allTextContents();

  const expected = [...expectedOnce, ...expectedPage];
  expect(items).toEqual(expected);
});
