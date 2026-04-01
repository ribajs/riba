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
  });
});

