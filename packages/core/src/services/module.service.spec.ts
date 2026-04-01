import { describe, it, expect, beforeEach } from "vitest";
import { Riba } from "../riba.js";
import { DotAdapter } from "../adapters/dot.adapter.js";
import { TextBinder } from "../binders/text.binder.js";
import type { Formatter, RibaModule } from "../types/index.js";

describe("ModulesService", () => {
  let riba: Riba;

  beforeEach(() => {
    riba = new Riba();
    riba.module.adapter.register(new DotAdapter());
  });

  describe("binder registration", () => {
    it("registers a binder and makes it available for binding", () => {
      riba.module.binder.register(TextBinder);
      const el = document.createElement("div");
      el.setAttribute("rv-text", "name");
      const view = riba.bind(el, { name: "test" });
      expect(view.bindings.length).toBeGreaterThanOrEqual(1);
      expect(el.textContent).toBe("test");
    });
  });

  describe("formatter registration", () => {
    it("registers a formatter and makes it usable in bindings", () => {
      riba.module.binder.register(TextBinder);
      const fmt: Formatter = {
        name: "exclaim",
        read: (v: string) => v + "!",
      };
      riba.module.formatter.register(fmt);

      const el = document.createElement("div");
      el.setAttribute("rv-text", "name | exclaim");
      riba.bind(el, { name: "hello" });
      expect(el.textContent).toBe("hello!");
    });

    it("allows overwriting a formatter with the same name", () => {
      riba.module.formatter.register({
        name: "fmt",
        read: () => "v1",
      });
      riba.module.formatter.register({
        name: "fmt",
        read: () => "v2",
      });
      riba.module.binder.register(TextBinder);

      const el = document.createElement("div");
      el.setAttribute("rv-text", "x | fmt");
      riba.bind(el, { x: "ignored" });
      expect(el.textContent).toBe("v2");
    });
  });

  describe("module registration", () => {
    it("registers binders and formatters from a module", () => {
      const testModule: RibaModule = {
        binders: { text: TextBinder },
        formatters: {
          double: {
            name: "double",
            read: (v: number) => v * 2,
          },
        },
        components: {},
        init() {
          return this;
        },
      };

      riba.module.register(testModule);

      const el = document.createElement("div");
      el.setAttribute("rv-text", "count | double");
      riba.bind(el, { count: 5 });
      expect(el.textContent).toBe("10");
    });

    it("throws when module is falsy", () => {
      expect(() => riba.module.register(null as any)).toThrow(
        "The Riba module is falsy",
      );
    });
  });
});
