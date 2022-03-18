import { Riba } from "../../riba";

import { dotAdapter } from "../../adapters/dot.adapter.js";

import { parseFormatter } from "./parse.formatter.js";
import { TextBinder } from "../../binders/text.binder.js";
import { AssignPropertyBinder } from "../../binders/assign-property.binder.js";

const riba = new Riba();
riba.module.adapter.regist(dotAdapter);
riba.module.formatter.regists([parseFormatter]);
riba.module.binder.regists([TextBinder, AssignPropertyBinder]);

interface Model {
  numStr: string;
  num?: number;
  bolStr: string;
  bol?: boolean;
  strArrStr: string;
  strArr?: string[]
  objStr: string;
  obj?: {
    a: number;
    b: number;
    c: number;
  };
  base64Str: string;
  base64?: string;
}

describe("riba.formatters", () => {
  describe("parse", () => {
    let model: Model = {
      numStr: '42',
      bolStr: 'true',
      strArrStr: "['a', 'b', 'c']",
      objStr: "{'a': 1, 'b': 2, 'c': 3}",
      base64Str: "base64:QSUyMHB1cHBldCUyMHRoYXQlMjBjYW4lMjBubyUyMGxvbmdlciUyMGJlJTIwdXNlZCUyMGlzJTIwbWVyZSUyMGdhcmJhZ2UuJTIwVGhpcyUyMHB1cHBldCdzJTIwcm9sZSUyMGhhcyUyMGp1c3QlMjBlbmRlZC4uLg=="
    };

    it("A string number should be parsed to a number", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-assign-num", "numStr | parse");
      riba.bind(el, model);
      expect(model.num).toEqual(42);
    });

    it("A string boolean should be parsed to a boolean", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-assign-bol", "bolStr | parse");
      riba.bind(el, model);
      expect(model.bol).toBeTrue();
    });

    it("A json string of a string array should be parsed to a string array", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-assign-str-arr", "strArrStr | parse");
      riba.bind(el, model);
      expect(model.strArr).toEqual(['a', 'b', 'c']);
    });

    it("A json string object should be parsed to a object", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-assign-obj", "objStr | parse");
      riba.bind(el, model);
      expect(model.obj).toEqual({'a': 1, 'b': 2, 'c': 3});
    });

    it("A base64 string should be decoded to a to its real value", () => {
      const el = document.createElement("div");
      el.setAttribute("rv-assign-base64", "base64Str | parse");
      riba.bind(el, model);
      expect(model.base64).toEqual("A puppet that can no longer be used is mere garbage. This puppet's role has just ended...");
    });

  });
});
