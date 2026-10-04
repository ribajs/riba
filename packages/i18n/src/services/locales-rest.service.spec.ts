import { HttpService } from "@ribajs/core";
import { LocalesRestService } from "./locales-rest.service.js";

const files: Record<string, unknown> = {
  "/locales/de.json": { hello: "Hallo" },
  "/locales/fr.json": { hello: "Bonjour" },
  "/all.json": { de: { hello: "Hallo" }, fr: { hello: "Bonjour" } },
};

const mockHttp = () =>
  vi.spyOn(HttpService, "getJSON").mockImplementation(async (url: string) => {
    if (!(url in files)) {
      throw new Error(`404 ${url}`);
    }
    return { body: files[url] } as never;
  });

describe("LocalesRestService", () => {
  beforeEach(() => {
    document.documentElement.lang = "en";
    localStorage.clear();
  });
  afterEach(() => vi.restoreAllMocks());

  it("loads only the active language and not the source language", async () => {
    const getJSON = mockHttp();
    const service = new LocalesRestService((code) => `/locales/${code}.json`, {
      langcodes: ["en", "de", "fr"],
    });
    await service.init();
    expect(getJSON).not.toHaveBeenCalled();
    expect(service.ready).toBe(true);
  });

  it("loads a language lazily on switch and caches it", async () => {
    const getJSON = mockHttp();
    const service = new LocalesRestService((code) => `/locales/${code}.json`, {
      langcodes: ["en", "de", "fr"],
    });
    await service.setLangcode("de");
    expect(service.translate("hello")).toBe("Hallo");
    await service.setLangcode("en");
    await service.setLangcode("de");
    expect(getJSON).toHaveBeenCalledTimes(1);
    expect(getJSON).toHaveBeenCalledWith("/locales/de.json");
  });

  it("fetches the source catalog on request", async () => {
    files["/locales/en.json"] = { hello: "Hello" };
    const getJSON = mockHttp();
    const service = new LocalesRestService((code) => `/locales/${code}.json`, {
      langcodes: ["en", "de"],
      loadSourceCatalog: true,
    });
    await service.init();
    expect(getJSON).toHaveBeenCalledWith("/locales/en.json");
    delete files["/locales/en.json"];
  });

  it("starts in a stored language directly, loading only that one", async () => {
    const getJSON = mockHttp();
    localStorage.setItem("riba:i18n:langcode", "fr");
    const service = new LocalesRestService((code) => `/locales/${code}.json`, {
      langcodes: ["en", "de", "fr"],
      detect: ["storage"],
      sourceLangcode: "en",
    });
    await service.init();
    expect(getJSON).toHaveBeenCalledTimes(1);
    expect(service.translate("hello")).toBe("Bonjour");
  });

  it("shares one request between languages in one file and applies hooks", async () => {
    const getJSON = mockHttp();
    class Shop extends LocalesRestService {
      protected buildUrl(url: string) {
        return url;
      }
      protected parse(body: unknown, langcode: string) {
        return (body as Record<string, never>)[langcode];
      }
      protected async resolveLangcodes() {
        const body = (await this.fetchJSON(this.urlFor("en"))) as object;
        return Object.keys(body);
      }
    }
    const service = new Shop("/all.json", { sourceLangcode: "en" });
    await service.init();
    expect(service.getAvailableLangcodes().map((l) => l.code)).toEqual([
      "de",
      "fr",
    ]);
    await service.setLangcode("fr");
    expect(service.translate("hello")).toBe("Bonjour");
    expect(getJSON).toHaveBeenCalledTimes(1);
  });

  it("emits error, rejects the switch and keeps the language when a request fails", async () => {
    mockHttp();
    const service = new LocalesRestService((code) => `/missing/${code}.json`, {
      langcodes: ["en", "de"],
    });
    await service.init();
    const onError = vi.fn();
    service.on("error", onError);
    await expect(service.setLangcode("de")).rejects.toThrow("404");
    expect(onError).toHaveBeenCalledTimes(1);
    expect(service.getLangcode()).toBe("en");
  });

  it("retries a failed language on the next switch", async () => {
    const getJSON = mockHttp();
    const service = new LocalesRestService("/flaky.json", {
      langcodes: ["en", "de"],
    });
    await service.init();
    await expect(service.setLangcode("de")).rejects.toThrow();
    files["/flaky.json"] = { hello: "Hallo" };
    await service.setLangcode("de");
    expect(service.translate("hello")).toBe("Hallo");
    expect(getJSON).toHaveBeenCalledTimes(2);
    delete files["/flaky.json"];
  });

  it("requires langcodes and a url", async () => {
    expect(() => new LocalesRestService("")).toThrow(/url/);
    const service = new LocalesRestService("/locales/x.json");
    await expect(service.init()).rejects.toThrow(/langcodes/);
  });
});
