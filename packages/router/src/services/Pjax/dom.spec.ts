import { describe, expect, it } from "vitest";
import { Dom } from "./Dom.js";

describe("Pjax Dom helpers", () => {
  it("puts a container into wrapper as hidden", () => {
    const wrapper = document.createElement("div");
    const next = document.createElement("main");
    next.dataset.namespace = "next";

    Dom.putContainer(next, wrapper);

    expect(wrapper.lastElementChild).toBe(next);
    expect(next.style.visibility).toBe("hidden");
  });

  it("parses container by selector from HTML response", () => {
    const html =
      "<html><body><div id='app'><main data-namespace='page'>next</main></div></body></html>";
    const response = Dom.parseResponse(html, true, "#app > [data-namespace]");

    expect(response.container.dataset.namespace).toBe("page");
    expect(response.containers).toHaveLength(1);
    expect(response.containers[0]).toBe(response.container);
  });

  it("collects every direct child of the wrapper for multi-child outlets", () => {
    const html =
      "<html><body><div id='app'>" +
      "<section data-namespace='primary'>first</section>" +
      "<section data-namespace='secondary'>second</section>" +
      "</div></body></html>";
    const response = Dom.parseResponse(html, false, "#app > [data-namespace]");

    expect(response.container.dataset.namespace).toBe("primary");
    expect(response.containers).toHaveLength(2);
    expect(response.containers.map((el) => el.dataset.namespace)).toEqual([
      "primary",
      "secondary",
    ]);
  });
});

