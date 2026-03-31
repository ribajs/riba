import { describe, it, expect, beforeAll } from "vitest";
import { Riba, coreModule } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { bs5Module } from "@ribajs/bs5";
import { routerModule } from "@ribajs/router";
import { i18nModule, LocalesStaticService } from "@ribajs/i18n";

describe("Module availability for documentation site", () => {
  let riba: Riba;

  beforeAll(() => {
    // Set lang attribute required by LocalesStaticService
    document.documentElement.setAttribute("lang", "en");

    riba = new Riba();
    riba.module.register(coreModule.init());
    riba.module.register(extrasModule.init());
    riba.module.register(bs5Module.init());
    riba.module.register(routerModule.init());
    riba.module.register(
      i18nModule.init({
        localesService: new LocalesStaticService({ locales: {} }),
      }),
    );
  });

  describe("Riba singleton", () => {
    it("new Riba() returns the same singleton instance", () => {
      const riba2 = new Riba();
      expect(riba).toBe(riba2);
    });

    it("singleton shares registered binders", () => {
      const riba2 = new Riba();
      expect(Object.keys(riba2.binders).length).toBeGreaterThan(0);
      expect(riba2.binders).toBe(riba.binders);
    });
  });

  describe("Core binders", () => {
    const requiredBinders = [
      "add-class",
      "remove-class",
      "assign",
      "assign-*",
      "class-*",
      "checked",
      "unchecked",
      "disabled",
      "enabled",
      "each-*",
      "hide",
      "show",
      "html",
      "text",
      "template",
      "if",
      "unless",
      "on-*",
      "value",
      "block",
      "srcset-*",
      "style-*",
    ];

    it.each(requiredBinders)("binder '%s' is registered", (binderName) => {
      expect(riba.binders[binderName]).toBeDefined();
    });
  });

  describe("Extras binders", () => {
    it("scrollbar-draggable binder is registered", () => {
      expect(riba.binders["scrollbar-draggable"]).toBeDefined();
    });
  });

  describe("BS5 binders", () => {
    it("bs5-scrollspy-* (wildcard) binder is registered", () => {
      expect(riba.binders["bs5-scrollspy-*"]).toBeDefined();
    });

    it("scroll-to-on-* binder is registered", () => {
      expect(riba.binders["scroll-to-on-*"]).toBeDefined();
    });
  });

  describe("Router binders", () => {
    it("route binder is registered", () => {
      expect(riba.binders["route"]).toBeDefined();
    });

    it("route-class-* binder is registered", () => {
      expect(riba.binders["route-class-*"]).toBeDefined();
    });
  });

  describe("Core formatters", () => {
    const requiredFormatters = [
      "append",
      "prepend",
      "not",
      "args",
      "size",
      "gt",
      "eq",
      "and",
      "or",
      "contains",
    ];

    it.each(requiredFormatters)(
      "formatter '%s' is registered",
      (formatterName) => {
        expect(riba.formatters[formatterName]).toBeDefined();
      },
    );
  });

  describe("BS5 components", () => {
    const requiredComponents = [
      "bs5-sidebar",
      "bs5-navbar",
      "bs5-toggle-button",
      "bs5-scrollspy",
      "bs5-contents",
      "bs5-tabs",
      "bs5-icon",
    ];

    it.each(requiredComponents)(
      "component '%s' is registered",
      (componentName) => {
        expect(riba.components[componentName]).toBeDefined();
      },
    );
  });
});
