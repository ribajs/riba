import { beforeEach, describe, expect, it, vi } from "vitest";
import { Pjax } from "./index.js";
import { RouterService } from "../router.service.js";
import { resetRouterTestState } from "../__test__/helpers/reset-singletons.js";
import { mountRouterFixture } from "../__test__/fixtures/pages.js";
import { withUrl } from "../__test__/helpers/with-url.js";

describe("Pjax click interception", () => {
  beforeEach(() => {
    resetRouterTestState();
    RouterService.setSingleton({ transitions: [] });
  });

  it("delegates nested click target to anchor href", async () => {
    await withUrl("https://example.test/current.html", async () => {
      const { wrapper, link } = mountRouterFixture("home");
      const child = document.createElement("span");
      child.textContent = "inner";
      link.appendChild(child);
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

      const event = {
        target: child,
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
      } as unknown as Event;
      (pjax as any).onLinkClickIntern(event);
      expect(onLinkClickSpy).toHaveBeenCalledTimes(1);
      expect(onLinkClickSpy.mock.calls[0]?.[2]).toContain("/next.html");
    });
  });

  it("skips links already handled by rv-route", async () => {
    await withUrl("https://example.test/current.html", () => {
      const { wrapper, link } = mountRouterFixture("home");
      link.setAttribute("rv-route", "{'url': '/next.html'}");
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

      const event = {
        target: link,
        stopPropagation: vi.fn(),
        preventDefault: vi.fn(),
      } as unknown as Event;
      (pjax as any).onLinkClickIntern(event);
      expect(onLinkClickSpy).not.toHaveBeenCalled();
    });
  });

  it("prevents default and calls goTo for eligible links", async () => {
    await withUrl("https://example.test/current.html", () => {
      const { wrapper, link } = mountRouterFixture("home");
      const pjax = new Pjax({
        id: "main",
        wrapper,
        containerSelector: "#app > [data-namespace]",
        listenAllLinks: false,
        listenPopstate: false,
      });
      const goToSpy = vi.spyOn(pjax, "goTo").mockImplementation(() => undefined);
      const evt = new MouseEvent("click", { bubbles: true, cancelable: true });

      pjax.onLinkClick(evt, link, link.href);

      expect(evt.defaultPrevented).toBe(true);
      expect(goToSpy).toHaveBeenCalledWith(expect.stringContaining("/next.html"), false);
    });
  });
});

