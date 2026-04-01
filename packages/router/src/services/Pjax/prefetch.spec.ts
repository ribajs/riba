import { beforeEach, describe, expect, it, vi } from "vitest";
import { Prefetch } from "./Prefetch.js";
import { Pjax } from "./index.js";
import { RouterService } from "../router.service.js";
import { resetRouterTestState } from "../__test__/helpers/reset-singletons.js";
import { withUrl } from "../__test__/helpers/with-url.js";
import { ROUTE_ERROR_CLASS } from "../../constants.js";

describe("Prefetch", () => {
  beforeEach(() => {
    resetRouterTestState();
    RouterService.setSingleton({ transitions: [] });
  });

  it("prefetches url via matching pjax instance", async () => {
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
      const loadSpy = vi
        .spyOn(pjax, "loadResponseCached")
        .mockResolvedValue({ fromCache: false, responsePromise: Promise.resolve({} as any) });
      const prefetch = new Prefetch("main");

      prefetch.url("/detail.html");
      expect(loadSpy).toHaveBeenCalledWith("/detail.html", false, false);
    });
  });

  it("marks link with error class when prefetch request fails", async () => {
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
      vi.spyOn(pjax, "loadResponseCached").mockRejectedValue(new Error("failed"));
      const prefetch = new Prefetch("main");
      const link = document.createElement("a");
      link.href = "/detail.html";

      prefetch.onLinkEnter("/detail.html", link, new MouseEvent("mouseover"));
      await Promise.resolve();

      expect(link.classList.contains(ROUTE_ERROR_CLASS)).toBe(true);
    });
  });
});

