import { Riba, coreModule, CoreService } from "@ribajs/core";
import { i18nModule } from "./i18n.module.js";
import { I18nService } from "./services/i18n.service.js";
import { LocalesRestService } from "./services/locales-rest.service.js";
import { LocalesStaticService } from "./services/locales-static.service.js";

const catalog = { en: { a: "A" }, de: { a: "Ä" } };

const waitFor = async (condition: () => boolean, timeoutMs = 1000) => {
  const startedAt = Date.now();
  while (!condition()) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error("Timed out waiting for condition");
    }
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
};

describe("i18nModule", () => {
  beforeEach(() => {
    document.documentElement.lang = "en";
    (CoreService as any).instance = undefined;
    (CoreService as any)._options = {};
    I18nService.reset();
  });

  it("requires a locales service", () => {
    expect(() => i18nModule.init({} as never)).toThrow(/localesService/);
    expect(() => i18nModule.init(undefined)).toThrow(/localesService/);
  });

  it("starts the service and can be initialized twice with the same service", async () => {
    const localesService = new LocalesStaticService(catalog);
    i18nModule.init({ localesService });
    i18nModule.init({ localesService });
    await localesService.whenReady();
    expect(localesService.ready).toBe(true);
    expect(I18nService.getLocalesService()).toBe(localesService);
  });

  it("rejects a second, different locales service until reset", () => {
    i18nModule.init({ localesService: new LocalesStaticService(catalog) });
    const other = new LocalesStaticService(catalog);
    expect(() => i18nModule.init({ localesService: other })).toThrow(
      /already defined/,
    );
    I18nService.reset();
    expect(() => i18nModule.init({ localesService: other })).not.toThrow();
  });

  it("reports a failing service through the console instead of an unhandled rejection", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    class Broken extends LocalesRestService {
      protected async load(): Promise<never> {
        throw new Error("boom");
      }
    }
    const localesService = new Broken("/x.json", { langcodes: ["en"] });
    i18nModule.init({ localesService });
    await expect(localesService.init()).rejects.toThrow("boom");
    await Promise.resolve();
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });

  it("the switcher lists the configured languages and follows the active one", async () => {
    const localesService = new LocalesStaticService(catalog);
    const riba = new Riba();
    riba.module.register(coreModule.init());
    riba.module.register(i18nModule.init({ localesService }));

    const el = document.createElement("div");
    el.innerHTML = `<i18n-switcher>
      <button rv-each-langcode="langcodes" rv-text="langcode.code" rv-on-click="switch | args langcode" rv-class-active="langcode.active"></button>
    </i18n-switcher>`;
    document.body.appendChild(el);
    const view = riba.bind(el, {});

    const buttons = () => [...el.querySelectorAll("button")];
    await waitFor(() => buttons().length === 2);
    expect(buttons().map((b) => b.textContent)).toEqual(["en", "de"]);
    expect(buttons()[0].classList.contains("active")).toBe(true);

    buttons()[1].click();
    await waitFor(() => localesService.getLangcode() === "de");
    await waitFor(() => buttons()[1].classList.contains("active"));
    expect(buttons()[0].classList.contains("active")).toBe(false);

    view.unbind();
    el.remove();
  });
});
