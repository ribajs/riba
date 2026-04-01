import { test, expect } from "@playwright/test";

const expectedOnce = [
  "global:beforeOnce",
  "beforeOnce",
  "global:once",
  "once",
  "global:afterOnce",
  "afterOnce",
];

// In sync mode, leave and enter hooks run in parallel via Promise.all.
// Each runTransitionHook call is: await routerHooks.do(name) then await transition[name]().
// With Promise.all, the microtask interleaving produces:
// global:leave, global:enter (both started), then leave, enter (both awaited).
const expectedPageSync = [
  "global:before",
  "before",
  "global:beforeLeave",
  "beforeLeave",
  "global:beforeEnter",
  "beforeEnter",
  "global:leave",
  "global:enter",
  "leave",
  "enter",
  "global:afterLeave",
  "afterLeave",
  "global:afterEnter",
  "afterEnter",
  "global:after",
  "after",
];

test("sync transition fires hooks with leave and enter in parallel", async ({
  page,
}) => {
  await page.goto("/e2e-hooks.html");

  const routerView = page.locator("router-view");
  await routerView.waitFor();
  await expect(routerView).toHaveClass(/transition-complete/, {
    timeout: 10_000,
  });

  // Click the sync link
  await routerView.evaluate((el) => el.classList.remove("transition-complete"));
  await page.locator("#link-sync").click();
  await expect(routerView).toHaveClass(/transition-complete/, {
    timeout: 10_000,
  });

  const items = await page.locator("#hooks-list li").allTextContents();

  const expected = [...expectedOnce, ...expectedPageSync];
  expect(items).toEqual(expected);
});
