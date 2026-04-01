import { beforeEach, describe, expect, it, vi } from "vitest";
import { Pjax } from "./index.js";
import { RouterService } from "../router.service.js";
import { resetRouterTestState } from "../__test__/helpers/reset-singletons.js";
import { withUrl } from "../__test__/helpers/with-url.js";
import { mountRouterFixture } from "../__test__/fixtures/pages.js";

describe("Pjax.goTo trigger handling", () => {
  beforeEach(() => {
    resetRouterTestState();
    RouterService.setSingleton({ transitions: [] });
  });

  it("preserves existing trigger set by click flow", async () => {
    await withUrl("https://example.test/home.html", async () => {
      const { wrapper } = mountRouterFixture("home");
      const pjax = new Pjax({
        id: "main",
        wrapper,
        containerSelector: "#app > [data-namespace]",
        listenAllLinks: false,
        listenPopstate: false,
      });
      const trigger = document.createElement("a");
      trigger.dataset.direction = "prev";
      (pjax as any).currentTrigger = trigger;
      vi.spyOn(pjax as any, "onStateChange").mockResolvedValue(undefined);

      await pjax.goTo("/page-1.html");

      expect((pjax as any).currentTrigger).toBe(trigger);
      expect(((pjax as any).currentTrigger as HTMLElement).dataset.direction).toBe(
        "prev",
      );
    });
  });

  it("falls back to barba trigger for direct goTo call", async () => {
    await withUrl("https://example.test/home.html", async () => {
      const { wrapper } = mountRouterFixture("home");
      const pjax = new Pjax({
        id: "main",
        wrapper,
        containerSelector: "#app > [data-namespace]",
        listenAllLinks: false,
        listenPopstate: false,
      });
      vi.spyOn(pjax as any, "onStateChange").mockResolvedValue(undefined);

      await pjax.goTo("/page-2.html");

      expect((pjax as any).currentTrigger).toBe("barba");
    });
  });
});

