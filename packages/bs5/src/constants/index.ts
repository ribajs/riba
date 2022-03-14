import { Bs5ModuleOptions, Breakpoint } from "../types/index.js";

export * from "./theme-choices";

// Breakpoints
export const DEFAULT_BP_XS: Breakpoint = {
  dimension: 0,
  name: "xs",
};
export const DEFAULT_BP_SM: Breakpoint = {
  dimension: 576,
  name: "sm",
};
export const DEFAULT_BP_MD: Breakpoint = {
  dimension: 768,
  name: "md",
};
export const DEFAULT_BP_LG: Breakpoint = {
  dimension: 992,
  name: "lg",
};
export const DEFAULT_BP_XL: Breakpoint = {
  dimension: 1200,
  name: "xl",
};
export const DEFAULT_BP_XXL: Breakpoint = {
  dimension: 1400,
  name: "xxl",
};

export const DEFAULT_MODULE_OPTIONS: Bs5ModuleOptions = {
  breakpoints: [
    DEFAULT_BP_XS,
    DEFAULT_BP_SM,
    DEFAULT_BP_MD,
    DEFAULT_BP_LG,
    DEFAULT_BP_XL,
    DEFAULT_BP_XXL,
  ],
  allowStoreDataInBrowser: true,
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
