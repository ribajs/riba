export const ROUTER_HOOKS = [
  "ready",
  "beforeOnce",
  "once",
  "afterOnce",
  "before",
  "beforeLeave",
  "leave",
  "afterLeave",
  "beforeEnter",
  "enter",
  "afterEnter",
  "after",
] as const;

export type RouterHookName = (typeof ROUTER_HOOKS)[number];
