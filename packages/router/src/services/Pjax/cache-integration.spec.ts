import { beforeEach, describe, expect, it, vi } from "vitest";
import { Pjax } from "./index.js";
import { RouterService } from "../router.service.js";
import { resetRouterTestState } from "../__test__/helpers/reset-singletons.js";
import { withUrl } from "../__test__/helpers/with-url.js";
import { installHttpGetMock } from "../__test__/stubs/fetch-mock.js";
import { createPageHtml } from "../__test__/fixtures/pages.js";

describe("Pjax cache integration", () => {
  beforeEach(() => {
    resetRouterTestState();
    RouterService.setSingleton({ transitions: [] });
  });

  it("returns cached response promise on repeated loadResponseCached calls", async () => {
    await withUrl("https://example.test/home.html", async () => {
      const responseHtml = createPageHtml({
        namespace: "detail",
        content: "detail content",
      });
      const getSpy = installHttpGetMock({
        "/detail.html": responseHtml,
      });
      const wrapper = document.createElement("div");
      wrapper.id = "app";
      const container = document.createElement("main");
      container.dataset.namespace = "home";
      wrapper.appendChild(container);
      document.body.textContent = "";
      document.body.appendChild(wrapper);

      const pjax = new Pjax({
        id: "main",
        wrapper,
        containerSelector: "#app > [data-namespace]",
        listenAllLinks: false,
        listenPopstate: false,
      });

      const first = await pjax.loadResponseCached("/detail.html");
      const second = await pjax.loadResponseCached("/detail.html");

      expect(first.fromCache).toBe(false);
      expect(second.fromCache).toBe(true);
      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(Pjax.cache.get("/detail.html")).toBe(first.responsePromise);
    });
  });

  it("forces browser navigation fallback when loadCached fails", async () => {
    await withUrl("https://example.test/home.html", async () => {
      const wrapper = document.createElement("div");
      wrapper.id = "app";
      const container = document.createElement("main");
      container.dataset.namespace = "home";
      wrapper.appendChild(container);
      document.body.textContent = "";
      document.body.appendChild(wrapper);

      const pjax = new Pjax({
        id: "main",
        wrapper,
        containerSelector: "#app > [data-namespace]",
        listenAllLinks: false,
        listenPopstate: false,
      });
      const forceSpy = vi.spyOn(pjax, "forceGoTo").mockImplementation(() => undefined);
      vi.spyOn(pjax, "loadResponseCached").mockRejectedValue(new Error("network"));

      await expect(pjax.loadCached("/error.html")).rejects.toThrow("network");
      expect(forceSpy).toHaveBeenCalledWith("/error.html");
    });
  });
});

