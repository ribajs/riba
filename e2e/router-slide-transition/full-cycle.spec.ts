import { test } from "@playwright/test";
import { prepare, final, clickAndNavigate } from "../helpers/router-assertions";

const pages = [
  { url: "/page-1.html", title: "Page 1", namespace: "page-1" },
  { url: "/page-2.html", title: "Page 2", namespace: "page-2" },
  { url: "/page-3.html", title: "Page 3", namespace: "page-3" },
  { url: "/index.html", title: "Home", namespace: "home" },
];

test("full cycle: home -> page-1 -> page-2 -> page-3 -> home", async ({
  page,
}) => {
  await prepare(page, {
    url: "/",
    title: "Home",
    namespace: "home",
  });

  for (const target of pages) {
    await clickAndNavigate(page, 'a[data-direction="next"]');
    await final(page, target);
  }
});
