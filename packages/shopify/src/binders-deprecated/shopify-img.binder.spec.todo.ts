import { Riba } from "@ribajs/core";

import { shopifyImgBinder } from "./shopify-img.binder";

describe("riba.binders", () => {
  let el: HTMLImageElement;

  const riba = new Riba();
  riba.module.binderDeprecated.regist(shopifyImgBinder);

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
    it("sets the element's text content", () => {
      (riba.binders["shopify-img"] as any).routine(el, "<em>hello</em>");
      expect(el.innerHTML).toEqual(
        "<em>hello</em> from test-app-example <strong>binder</strong>!"
      );
    });
  });
});
