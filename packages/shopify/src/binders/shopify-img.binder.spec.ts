import { Riba, dotAdapter } from "@ribajs/core";
import { ShopifyImgBinder } from "./shopify-img.binder.js";

describe("riba.binders", () => {
  let el: HTMLImageElement;

  const riba = new Riba();
  riba.module.adapter.regist(dotAdapter);
  riba.module.binder.regist(ShopifyImgBinder);

  beforeEach(() => {
    el = document.createElement("img");
    document.body.appendChild(el);
  });

  afterEach(() => {
    if (!el.parentNode) {
      throw new Error("el.parentNode is not defined!");
    }
    el.parentNode.removeChild(el);
  });

  describe("ShopifyImg", () => {
    it.skip("sets the image srcset and sizes attributes", () => {
      el.setAttribute("rv-shopify-img", "");
      el.setAttribute("src", "//cdn.shopify.com/s/files/1/0087/0462/products/shirt14.jpeg?v=1309278311&width=500")
      riba.bind(el, {});
      expect(el.src).toEqual(
        ""
      );
      expect(el.srcset).toEqual(
        ""
      );
      expect(el.sizes).toEqual(
        ""
      );
    });
  });
});
