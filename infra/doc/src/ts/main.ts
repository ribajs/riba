import "../scss/main.scss";
import { ready } from "@ribajs/utils/src/dom.js";

ready(async () => {
  const { Riba, coreModule } = await import("@ribajs/core");
  const { extrasModule } = await import("@ribajs/extras");
  const { routerModule } = await import("@ribajs/router");
  const { i18nModule, LocalesStaticService } = await import("@ribajs/i18n");
  const { bs5Module } = await import("@ribajs/bs5");
  const { EventDispatcher } = await import("@ribajs/events");
  const { DocModule } = await import("./doc.module.js");

  const Prism = await import("prismjs");
  await import("prismjs/components/prism-javascript");
  await import("prismjs/components/prism-typescript");
  await import("prismjs/components/prism-scss");

  const riba = new Riba();
  const dispatcher = new EventDispatcher("main");
  const model: any = {};

  riba.module.register(coreModule.init());
  riba.module.register(extrasModule.init());
  riba.module.register(routerModule.init());
  riba.module.register(
    i18nModule.init({
      localesService: new LocalesStaticService({ locales: {} }),
    }),
  );
  riba.module.register(bs5Module.init());
  riba.module.register(DocModule.init());

  dispatcher.on(
    "newPageReady",
    (
      viewId: string,
      currentStatus: any,
      prevStatus: any,
      container: HTMLElement,
      newPageRawHTML: string,
      dataset: any,
    ) => {
      Prism.highlightAll();
    },
  );

  riba.bind(document.body, model);
});
