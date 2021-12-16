import { ready } from "@ribajs/utils";
import { Riba, coreModule } from "@ribajs/core";

// Own
import { HelloCsrComponent } from "./components/hello-csr/hello-csr.component";

const riba = new Riba();

riba.configure({
  prefix: ["rv", "csr-rv"],
  blockUnknownCustomElements: false,
  templateDelimiters: ["[", "]"],
});

// Regist custom components
riba.module.component.regist(HelloCsrComponent);

// Regist modules
riba.module.regist(coreModule.init({}));

riba.lifecycle.events.on("ComponentLifecycle:error", (error: Error) => {
  console.error(error);
});

ready(() => {
  riba.bind(document?.body);
});
