import { Bs5ModuleOptions } from "../types";

// Breakpoints
export const DEFAULT_BP_XS = 0;
export const DEFAULT_BP_SM = 576;
export const DEFAULT_BP_MD = 768;
export const DEFAULT_BP_LG = 992;
export const DEFAULT_BP_XL = 1200;
export const DEFAULT_BP_XXL = 1400;

export const DEFAULT_MODULE_OPTIONS: Bs5ModuleOptions = {
  breakpoints: {
    xs: DEFAULT_BP_XS,
    sm: DEFAULT_BP_SM,
    md: DEFAULT_BP_MD,
    lg: DEFAULT_BP_LG,
    xl: DEFAULT_BP_XL,
    xxl: DEFAULT_BP_XXL,
  },
};

// EventDispatcher events
export const TOGGLE_BUTTON = {
  nsPrefix: "bs5-toggle-button:",
  eventNames: {
    toggle: "toggle",
    toggled: "toggled",
    init: "init",
    state: "state",
  },
};

export const TOGGLE_ATTRIBUTE = {
  elEventNames: {
    removed: "removed",
    added: "added",
  },
};

export const TOGGLE_CLASS = {
  elEventNames: {
    removed: "removed",
    added: "added",
  },
};
