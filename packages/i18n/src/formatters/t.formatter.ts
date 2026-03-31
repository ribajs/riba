import { Formatter, FormatterContext } from "@ribajs/core";
import { I18nService } from "../services/i18n.service.js";
import { LocalesService } from "../types/locales-service.js";

const translate = async (
  translateMePathString: string,
  localesService: LocalesService,
  langcode?: string,
) => {
  const properties = translateMePathString.split(".");
  if (!langcode) {
    langcode = localesService.getLangcode();
    if (!langcode) {
      return null;
    }
  }
  return localesService
    .get([langcode, ...properties] /*, vars */)
    .then((locale: string) => {
      return locale;
    })
    .catch((error: Error) => {
      console.error(error);
    });
};

export const tFormatter: Formatter = {
  name: "t",
  read(
    translateMePathString: string,
    langcodeOrContext?: string | FormatterContext /*, ...vars: string[]*/,
    contextArg?: FormatterContext,
  ) {
    const localesService = I18nService.options.localesService;
    const isFormatterContext = (
      value?: string | FormatterContext,
    ): value is FormatterContext => {
      return !!value && typeof value === "object" && "invalidate" in value;
    };
    const context = isFormatterContext(langcodeOrContext)
      ? langcodeOrContext
      : contextArg;
    const langcode =
      typeof langcodeOrContext === "string" ? langcodeOrContext : undefined;

    if (context) {
      const invalidate = () => context.invalidate();
      context.on(localesService.event, "changed", invalidate, "changed");
      if (!localesService.ready) {
        const onReady = () => {
          invalidate();
          localesService.event.off("ready", onReady);
        };
        localesService.event.on("ready", onReady);
        context.addCleanup(() => {
          localesService.event.off("ready", onReady);
        }, "ready");
      }
    }

    if (!localesService.ready) {
      return "";
    }

    return translate(translateMePathString, localesService, langcode);
  },
};
