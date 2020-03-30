import { Riba, Adapter } from "../index";

import { dotAdapter } from "../adapters/dot.adapter";

import { textBinder } from "../binders/text.binder";

import { valueBinder } from "../binders/value.binder";

import { Data } from "../../spec/lib/moch.data";

describe("Functional", () => {
  let data: Data;
  let bindData: { data: Data };
  let el: HTMLUnknownElement;
  let originalPrefix: string;
  let adapter: Adapter;

  const riba = new Riba();
  riba.module.adapter.regist(dotAdapter);
  riba.module.binder.regist(textBinder);
  riba.module.binder.regist(valueBinder);

  beforeEach(() => {
    originalPrefix = riba.prefix;
    riba.prefix = "data";
    adapter = {
      name: ":",
      observe: (obj, keypath, callback) => {
        obj.on(keypath, callback);
      },
      unobserve: (obj, keypath, callback) => {
        obj.off(keypath, callback);
      },
      get: (obj, keypath) => {
        return obj.get(keypath);
      },
      set: (obj, keypath, value) => {
        const attributes: { [keypath: string]: any } = {};
        attributes[keypath] = value;
        obj.set(attributes);
      },
    };

    riba.adapters[adapter.name] = adapter;
    riba.configure({ preloadData: true });

    data = new Data({
      foo: "bar",
      items: [{ name: "a" }, { name: "b" }],
    });

    bindData = { data };

    el = document.createElement("div");
  });

  afterEach(() => {
    riba.prefix = originalPrefix;
  });

  describe("Adapter", () => {
    it("should read the initial value", () => {
      jest.spyOn(data, "get");
      el.setAttribute("data-text", "data:foo");
      riba.bind(el, bindData);
      if (data === null) {
        throw new Error("data is null!");
      }
      expect(data.get).toHaveBeenCalledWith("foo");
    });

    it("should read the initial value unless preloadData is false", () => {
      riba.configure({ preloadData: false });
      jest.spyOn(data, "get");
      el.setAttribute("data-value", "data:foo");
      riba.bind(el, bindData);
      if (data === null) {
        throw new Error("data is null!");
      }
      expect(data.get).not.toHaveBeenCalled();
    });

    it("should subscribe to updates", () => {
      jest.spyOn(data, "on");
      el.setAttribute("data-value", "data:foo");
      riba.bind(el, bindData);
      if (data === null) {
        throw new Error("data is null!");
      }
      expect(data.on).toHaveBeenCalled();
    });
  });
});
