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

  // Demo example components
  const { EachItemExampleComponent } = await import(
    "@ribajs/demo-core-each-item/src/ts/components/each-item-example/each-item-example.component.js"
  );
  const { I18nStaticExampleComponent } = await import(
    "@ribajs/demo-i18n-static/src/ts/components/i18n-static-example/i18n-static-example.component.js"
  );
  const { TouchEventsExampleComponent } = await import(
    "@ribajs/demo-extras-touch-events/src/ts/components/touch-events-example/touch-events-example.component.js"
  );
  const { ExtrasScrollEventsExampleComponent } = await import(
    "@ribajs/demo-extras-scroll-events/src/ts/components/extras-scroll-events-example/extras-scroll-events-example.component.js"
  );

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

  // Register demo example components
  riba.module.component.registerAll({
    EachItemExampleComponent,
    I18nStaticExampleComponent,
    TouchEventsExampleComponent,
    ExtrasScrollEventsExampleComponent,
  });

  // Pre-register custom elements so they are upgraded immediately
  // when inserted via innerHTML (e.g. by BindContentComponent).
  // Without this, customElements.define() only happens during View.build()
  // which is too late for components nested inside rv-bind-content.
  const allComponents = { ...riba.components };
  for (const [tagName, ComponentClass] of Object.entries(allComponents)) {
    if (!customElements.get(tagName)) {
      customElements.define(tagName, ComponentClass as CustomElementConstructor);
    }
  }

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
      // Restore body scroll after page navigation
      // (sidebar may leave overflow:hidden on body when open during navigation)
      document.body.style.overflow = "";
    },
  );

  riba.bind(document.body, model);
});
