import { Riba } from "../../riba.js";
import { parseType, isBase64 } from "@ribajs/utils/src/index.js";

import { dotAdapter } from "../../adapters/dot.adapter.js";

import { toBase64Formatter } from "./to-base64.formatter.js";
import { parseFormatter } from "./parse.formatter.js";
import { jsonFormatter } from "./json.formatter.js";
import { TextBinder } from "../../binders/text.binder.js";

const riba = new Riba();
riba.module.adapter.register(dotAdapter);
riba.module.formatter.registerAll([
  toBase64Formatter,
  parseFormatter,
  jsonFormatter,
]);
riba.module.binder.register(TextBinder);

interface Model {
  obj?: {
    str: string;
    num: number;
    bol: boolean;
  };
}

describe("riba.formatters", () => {
  describe("base64", () => {
    let model: Model = {};

    beforeEach(() => {
      model.obj = {
        str: "A puppet that can no longer be used is mere garbage. This puppet's role has just ended...",
        num: 42,
        bol: true,
      };
    });

    it("A normal string should be encoded to a base64 string and should be encoded back", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "obj.str | toBase64");
      riba.bind(el, model);
      expect(isBase64(el.textContent)).toBeTrue();
      expect(parseType(el.textContent).value).toEqual(model.obj?.str);
    });

    it("A normal string should be encoded to a base64 string and should be encoded back using the parse formatter", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "obj.str | toBase64 | parse");
      riba.bind(el, model);
      expect(isBase64(el.textContent)).toBeFalse();
      expect(el.textContent).toEqual(model.obj?.str);
    });

    it("A number should be encoded to a base64 string and should be encoded back", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "obj.num | toBase64");
      riba.bind(el, model);
      expect(isBase64(el.textContent)).toBeTrue();
      expect(parseType(el.textContent).value).toEqual(model.obj?.num);
    });

    it("A number should be encoded to a base64 string and should be encoded back using the parse formatter", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "obj.num | toBase64 | parse");
      riba.bind(el, model);
      expect(isBase64(el.textContent)).toBeFalse();
      expect(Number(el.textContent)).toEqual(model.obj?.num);
    });

    it("A boolean should be encoded to a base64 string and should be encoded back", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "obj.bol | toBase64");
      riba.bind(el, model);
      expect(isBase64(el.textContent)).toBeTrue();
      expect(parseType(el.textContent).value).toEqual(model.obj?.bol);
    });

    it("A boolean should be encoded to a base64 string and should be encoded back using the parse formatter", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "obj.bol | toBase64 | parse");
      riba.bind(el, model);
      expect(isBase64(el.textContent)).toBeFalse();
      expect(Boolean(el.textContent)).toEqual(model.obj?.bol);
    });

    it("A object should be encoded to a base64 string and should be encoded back", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-text", "obj | toBase64");
      riba.bind(el, model);
      expect(isBase64(el.textContent)).toBeTrue();
      if (!model.obj) {
        throw new Error("beforeEach was not called correctly!");
      }
      expect(parseType(el.textContent).value).toMatchObject(model.obj);
    });
  });
});
