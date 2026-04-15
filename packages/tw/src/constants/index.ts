import type { Breakpoint, TwModuleOptions } from "../types/index.js";

export const DEFAULT_BP_SM: Breakpoint = { dimension: 640, name: "sm" };
export const DEFAULT_BP_MD: Breakpoint = { dimension: 768, name: "md" };
export const DEFAULT_BP_LG: Breakpoint = { dimension: 1024, name: "lg" };
export const DEFAULT_BP_XL: Breakpoint = { dimension: 1280, name: "xl" };
export const DEFAULT_BP_2XL: Breakpoint = { dimension: 1536, name: "2xl" };

export const DEFAULT_MODULE_OPTIONS: TwModuleOptions = {
  breakpoints: [
    DEFAULT_BP_SM,
    DEFAULT_BP_MD,
    DEFAULT_BP_LG,
    DEFAULT_BP_XL,
    DEFAULT_BP_2XL,
  ],
  allowStoreDataInBrowser: true,
};

export const TOGGLE_BUTTON = {
  nsPrefix: "tw-toggle-button-",
  eventNames: {
    toggle: "toggle",
    toggled: "toggled",
    init: "init",
    state: "state",
  },
};

export const TOGGLE_ATTRIBUTE = {
  elEventNames: {
    removed: "attribute-removed",
    added: "attribute-added",
  },
};

export const TOGGLE_CLASS = {
  elEventNames: {
    removed: "class-removed",
    added: "class-added",
  },
};
