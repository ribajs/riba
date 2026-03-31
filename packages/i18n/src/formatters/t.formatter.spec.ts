import { Riba, coreModule, CoreService } from "@ribajs/core";
import { i18nModule } from "../i18n.module.js";
import { LocalesStaticService } from "../services/locales-static.service.js";
import { I18nService } from "../services/i18n.service.js";

const waitFor = async (
  condition: () => boolean,
  timeoutMs = 500,
  intervalMs = 10,
) => {
  const startedAt = Date.now();
  while (!condition()) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error("Timed out waiting for condition");
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
};

describe("t formatter", () => {
  const locales = {
    en: {
      examples: {
        newsletter: {
          title: "Hello",
        },
      },
    },
    de: {
      examples: {
        newsletter: {
          title: "Hallo",
        },
      },
    },
  };

  const resetI18nSingletons = () => {
    (CoreService as any).instance = undefined;
    (CoreService as any)._options = {};
    (I18nService as any).instance = undefined;
    (I18nService as any)._options = undefined;
    LocalesStaticService.instances = {};
  };

  beforeEach(() => {
    document.documentElement.lang = "en";
    resetI18nSingletons();
  });

  it("updates rendered text when language changes", async () => {
    const localesService = new LocalesStaticService(locales);
    const riba = new Riba();
    riba.module.register(coreModule.init());
    riba.module.register(i18nModule.init({ localesService }));

    const el = document.createElement("div");
    el.textContent = "{ 'examples.newsletter.title' | t }";
    const view = riba.bind(el, {});

    await waitFor(() => el.textContent === "Hello");

    localesService.setLangcode("de");
    await waitFor(() => el.textContent === "Hallo");

    view.unbind();
  });

  it("cleans changed listeners on unbind", async () => {
    const localesService = new LocalesStaticService(locales);
    const riba = new Riba();
    riba.module.register(coreModule.init());
    riba.module.register(i18nModule.init({ localesService }));

    const changedListenerCount = () => {
      const events = (localesService.event as any).events || {};
      return Array.isArray(events.changed) ? events.changed.length : 0;
    };

    expect(changedListenerCount()).toBe(0);

    const el = document.createElement("div");
    el.textContent = "{ 'examples.newsletter.title' | t }";
    const view = riba.bind(el, {});
    await waitFor(() => changedListenerCount() >= 1);

    view.unbind();
    expect(changedListenerCount()).toBe(0);
  });
});
