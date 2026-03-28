import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import { Riba, coreModule } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { bs5Module } from "@ribajs/bs5";

describe("Doc components", () => {
  let riba: Riba;

  beforeAll(() => {
    document.documentElement.setAttribute("lang", "en");
    riba = new Riba();
    riba.module.register(coreModule.init());
    riba.module.register(extrasModule.init());
    riba.module.register(bs5Module.init());
  });

  describe("BindContentComponent", () => {
    beforeEach(async () => {
      const { BindContentComponent } = await import(
        "../components/bind-content/bind-content.component.js"
      );
      riba.module.component.register(BindContentComponent);
    });

    it("is registered as rv-bind-content", () => {
      expect(riba.components["rv-bind-content"]).toBeDefined();
    });

    it("captures template content from child <template> element", async () => {
      const el = document.createElement("div");
      // Build-time trusted template content used for test setup
      const tpl = document.createElement("template");
      tpl.innerHTML = '<div class="test-content">Hello World</div>';
      const rvBindContent = document.createElement("rv-bind-content");
      rvBindContent.appendChild(tpl);
      el.appendChild(rvBindContent);
      document.body.appendChild(el);
      riba.bind(el, {});

      // Wait for async template loading
      await new Promise((r) => setTimeout(r, 100));

      const bindContent = el.querySelector("rv-bind-content") as any;
      expect(bindContent).toBeDefined();
      // After init, the component should show the placeholder
      expect(bindContent.textContent).toContain("Click to load example");

      document.body.removeChild(el);
    });
  });

  describe("ExampleTabsComponent", () => {
    beforeEach(async () => {
      const { ExampleTabsComponent } = await import(
        "../components/example-tabs/example-tabs.component.js"
      );
      riba.module.component.register(ExampleTabsComponent);
    });

    it("is registered as rv-example-tabs", () => {
      expect(riba.components["rv-example-tabs"]).toBeDefined();
    });
  });

  describe("Custom element registration via View", () => {
    it("rv-bind-content is defined as custom element after view binding", async () => {
      const el = document.createElement("div");
      const rvBindContent = document.createElement("rv-bind-content");
      const tpl = document.createElement("template");
      tpl.textContent = "test";
      rvBindContent.appendChild(tpl);
      el.appendChild(rvBindContent);
      document.body.appendChild(el);
      riba.bind(el, {});

      const defined = customElements.get("rv-bind-content");
      expect(defined).toBeDefined();

      document.body.removeChild(el);
    });
  });
});
