import { HttpService } from "@ribajs/core";
import { LocalesService } from "./locales.service.js";

describe("shopify-tda LocalesService", () => {
  beforeEach(() => {
    document.documentElement.lang = "en";
    (LocalesService as any).instance = undefined;
    (window as any).Shopify = { theme: { id: 7 }, shop: "demo.myshopify.com" };
  });
  afterEach(() => {
    delete (window as any).Shopify;
    vi.restoreAllMocks();
  });

  it("reads the languages from one file, adds ?shop= and requests it once", async () => {
    const getJSON = vi.spyOn(HttpService, "getJSON").mockResolvedValue({
      body: { de: { hello: "Hallo" }, fr: { hello: "Bonjour" } },
    } as never);
    const service = LocalesService.getSingleton("https://host.test");
    await service.init();
    await service.setLangcode("fr");
    await service.setLangcode("de");
    expect(service.getAvailableLangcodes().map((l) => l.code)).toEqual([
      "de",
      "fr",
    ]);
    expect(service.translate("hello")).toBe("Hallo");
    expect(getJSON).toHaveBeenCalledTimes(1);
    expect(getJSON).toHaveBeenCalledWith(
      "https://host.test/shopify/api/themes/7/locales?shop=demo.myshopify.com",
    );
    expect(LocalesService.getSingleton()).toBe(service);
  });

  it("leaves the url alone outside a shop", async () => {
    delete (window as any).Shopify.shop;
    const getJSON = vi.spyOn(HttpService, "getJSON").mockResolvedValue({
      body: { de: {} },
    } as never);
    await LocalesService.getSingleton("https://host.test").init();
    expect(getJSON).toHaveBeenCalledWith(
      "https://host.test/shopify/api/themes/7/locales",
    );
  });
});
