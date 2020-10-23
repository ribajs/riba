import { coreModule, Riba } from "@ribajs/core";
import { ready } from '@ribajs/utils/src/dom';
import { bs4Module } from "@ribajs/bs4";
import { extrasModule } from "@ribajs/extras";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(extrasModule);

ready(() => {
    riba.bind(document.body, model);
    // TODO https://stackoverflow.com/a/59814127/1465919
    console.debug("window.electron", (window as any).electron);
});
