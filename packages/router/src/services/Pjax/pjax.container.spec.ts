import { beforeEach, describe, expect, it, vi } from "vitest";
import { Pjax } from "./index.js";
import { RouterService } from "../router.service.js";
import { resetRouterTestState } from "../__test__/helpers/reset-singletons.js";
import { withUrl } from "../__test__/helpers/with-url.js";

describe("Pjax container lifecycle", () => {
  beforeEach(() => {
    resetRouterTestState();
    RouterService.setSingleton({ transitions: [] });
  });

  it("replaces old container with new one after declarative transition", async () => {
    await withUrl("https://example.test/home.html", async () => {
      const wrapper = document.createElement("div");
      wrapper.id = "app";
      const oldContainer = document.createElement("main");
      oldContainer.dataset.namespace = "home";
      oldContainer.textContent = "old";
      wrapper.appendChild(oldContainer);
      document.body.textContent = "";
      document.body.appendChild(wrapper);

      const pjax = new Pjax({
        id: "main",
        wrapper,
        containerSelector: "#app > [data-namespace]",
        listenAllLinks: false,
        listenPopstate: false,
        transitions: [
          {
            name: "default",
            leave: async () => undefined,
          },
        ],
      });
      pjax.history.add("/home.html", "home");
      const nextContainer = document.createElement("main");
      nextContainer.dataset.namespace = "detail";
      nextContainer.style.visibility = "hidden";
      nextContainer.textContent = "next";

      vi.spyOn(pjax, "loadCached").mockImplementation(async () => {
        wrapper.appendChild(nextContainer);
        return nextContainer;
      });

      await (pjax as any).onStateChange(undefined, "/detail.html");

      const remaining = Array.from(wrapper.children) as HTMLElement[];
      expect(remaining).toHaveLength(1);
      expect(remaining[0]).toBe(nextContainer);
      expect(nextContainer.style.visibility).toBe("visible");
    });
  });

  it("keeps both containers mounted during sync leave/enter", async () => {
    await withUrl("https://example.test/home.html", async () => {
      const wrapper = document.createElement("div");
      wrapper.id = "app";
      const oldContainer = document.createElement("main");
      oldContainer.dataset.namespace = "home";
      wrapper.appendChild(oldContainer);
      document.body.textContent = "";
      document.body.appendChild(wrapper);

      const lifecycleCounts: number[] = [];
      const pjax = new Pjax({
        id: "main",
        wrapper,
        containerSelector: "#app > [data-namespace]",
        listenAllLinks: false,
        listenPopstate: false,
        transitions: [
          {
            name: "sync",
            sync: true,
            leave: async () => {
              lifecycleCounts.push(wrapper.children.length);
            },
            enter: async () => {
              lifecycleCounts.push(wrapper.children.length);
            },
          },
        ],
      });
      pjax.history.add("/home.html", "home");
      const nextContainer = document.createElement("main");
      nextContainer.dataset.namespace = "detail";
      nextContainer.style.visibility = "hidden";

      vi.spyOn(pjax, "loadCached").mockImplementation(async () => {
        wrapper.appendChild(nextContainer);
        return nextContainer;
      });

      await (pjax as any).onStateChange(undefined, "/detail.html");

      expect(lifecycleCounts.every((count) => count === 2)).toBe(true);
      expect(wrapper.children.length).toBe(1);
    });
  });
});

