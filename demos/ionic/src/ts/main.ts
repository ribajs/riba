import { coreModule, Riba } from "@ribajs/core";
import { ready } from "@ribajs/utils";
import { ionicModule } from "@ribajs/ionic";
import { IonicDemoModule } from "./ionic-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(ionicModule.init());
riba.module.regist(IonicDemoModule);

ready(() => {
  // Bind Riba
  riba.bind(document.body, model);
  const htmlEl: HTMLHeadElement =
    (document.body.parentNode as HTMLHeadElement) ||
    (document.getElementsByName("html")[0] as HTMLHeadElement);
  htmlEl?.classList.add("hydrated"); // Workaround
});
