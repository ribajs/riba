import { beforeEach, describe, expect, it, vi } from "vitest";
import { Pjax } from "./index.js";
import { RouterService } from "../router.service.js";
import { resetRouterTestState } from "../__test__/helpers/reset-singletons.js";
import { withUrl } from "../__test__/helpers/with-url.js";

describe("Pjax interaction regressions", () => {
  beforeEach(() => {
    resetRouterTestState();
    RouterService.setSingleton({ transitions: [] });
  });

  it("handles clicks on nested nodes inside an anchor (back-link remains clickable)", async () => {
    await withUrl("https://example.test/page.html", async () => {
      const wrapper = document.createElement("div");
      wrapper.id = "app";
      const container = document.createElement("main");
      container.dataset.namespace = "detail";
      const link = document.createElement("a");
      link.href = "/index.html";
      const nested = document.createElement("strong");
      nested.textContent = "Back to home";
      link.appendChild(nested);
      container.appendChild(link);
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

      const onLinkClickSpy = vi
        .spyOn(pjax, "onLinkClick")
        .mockImplementation(() => undefined);

      (pjax as any).onLinkClickIntern({
        target: nested,
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
      } as Event);

      expect(onLinkClickSpy).toHaveBeenCalledTimes(1);
      expect(onLinkClickSpy.mock.calls[0]?.[2]).toContain("/index.html");
    });
  });
});

