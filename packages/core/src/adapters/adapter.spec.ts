import { jest } from '@jest/globals';
import { Riba } from "../riba.js";
import { Adapter, ObserverSyncCallback } from "../types/index.js";
import { dotAdapter } from "../adapters/dot.adapter.js";
import { TextBinder } from "../binders/text.binder.js";
import { ValueBinder } from "../binders/value.binder.js";
import { Data } from "../../spec/lib/moch.data.js";

describe("Functional", () => {
  let data: Data;
  let bindData: { data: Data };
  let el: HTMLUnknownElement;
  let originalPrefix: string[];
  let adapter: Adapter;

  const riba = new Riba();
  riba.module.adapter.register(dotAdapter);
  riba.module.binder.register(TextBinder);
  riba.module.binder.register(ValueBinder);

  beforeEach(() => {
    originalPrefix = riba.prefix;
    riba.prefix = ["data"];
    adapter = {
      name: ":",
      observe: (obj: any, keypath: string, callback: ObserverSyncCallback) => {
        obj.on(keypath, callback);
      },
      unobserve: (obj: any, keypath: string, callback: ObserverSyncCallback) => {
        obj.off(keypath, callback);
      },
      get: (obj:any, keypath: string) => {
        return obj.get(keypath);
      },
      set: (obj: any, keypath: string, value: any) => {
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
