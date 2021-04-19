import { BindersCreator } from "@ribajs/core";
import { Bs5ModuleOptions } from "../types";

import { collapseOnUrlBinder } from "./bs5-collapse-on-url.binder";
import { toggleCollapseOnEventBinder } from "./bs5-toggle-collapse-on-event.binder";
import { dropdownBinder } from "./bs5-dropdown.binder";
import { expandOnUrlBinder } from "./bs5-expand-on-url.binder";
import { popoverBinder } from "./bs5-popover.binder";
import { showToastOnEventBinder } from "./bs5-show-toast-on.binder";
import { scrollspyClassBinder } from "./bs5-scrollspy-class.binder";
import { tooltipBinder } from "./bs5-tooltip.binder";
import { scrollToOnEventBinder } from "./scroll-to-on-event.binder";
import { toggleAttributeBinder } from "./toggle-attribute.binder";
import { toggleClassBinder } from "./toggle-class.binder";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const binders: BindersCreator<unknown> = (options: Bs5ModuleOptions) => {
  return {
    collapseOnUrlBinder,
    toggleCollapseOnEventBinder,
    dropdownBinder,
    expandOnUrlBinder,
    popoverBinder,
    showToastOnEventBinder,
    scrollspyClassBinder,
    tooltipBinder,
    scrollToOnEventBinder,
    toggleAttributeBinder,
    toggleClassBinder,
  };
};

export default binders;
