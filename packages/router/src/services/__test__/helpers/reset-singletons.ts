import { RouterHooks } from "../../Hooks.js";
import { Pjax } from "../../Pjax/index.js";
import { Prefetch } from "../../Pjax/Prefetch.js";
import { RouterService } from "../../router.service.js";

export const resetRouterTestState = () => {
  RouterHooks.instance.clear();
  Pjax.cache.reset();
  (Pjax as any).instances = {};
  (Prefetch as any).instances = {};
  (RouterService as any).instance = undefined;
  (RouterService as any)._options = undefined;
};
