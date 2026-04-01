import type {
  RouterHookName,
  TransitionData,
  TransitionDefinition,
} from "../types/index.js";
import { ROUTER_HOOKS } from "../types/index.js";

export type RouterHookCallback = (
  data: TransitionData,
  transition?: TransitionDefinition,
) => void | Promise<void>;

type HookRegistration = {
  fn: RouterHookCallback;
  ctx?: unknown;
};

export class RouterHooks {
  protected static _instance?: RouterHooks;

  public static get instance() {
    if (!this._instance) {
      this._instance = new RouterHooks();
    }
    return this._instance;
  }

  protected registered = new Map<RouterHookName, Set<HookRegistration>>();

  public clear() {
    this.registered.clear();
  }

  public on(name: RouterHookName, fn: RouterHookCallback, ctx?: unknown) {
    if (!this.registered.has(name)) {
      this.registered.set(name, new Set());
    }
    this.registered.get(name)?.add({ fn, ctx });
  }

  public off(name: RouterHookName, fn: RouterHookCallback, ctx?: unknown) {
    const set = this.registered.get(name);
    if (!set) {
      return;
    }
    for (const item of set.values()) {
      if (item.fn === fn && item.ctx === ctx) {
        set.delete(item);
      }
    }
  }

  public async do(
    name: RouterHookName,
    data: TransitionData,
    transition?: TransitionDefinition,
  ) {
    const set = this.registered.get(name);
    if (!set) {
      return;
    }
    for (const hook of set.values()) {
      await hook.fn.call(hook.ctx ?? {}, data, transition);
    }
  }
}

type HooksApi = {
  [K in RouterHookName]: (fn: RouterHookCallback, ctx?: unknown) => void;
};

export const routerHooks = {
  do: RouterHooks.instance.do.bind(RouterHooks.instance),
  clear: RouterHooks.instance.clear.bind(RouterHooks.instance),
  off: RouterHooks.instance.off.bind(RouterHooks.instance),
  ...Object.fromEntries(
    ROUTER_HOOKS.map((name) => [
      name,
      (fn: RouterHookCallback, ctx?: unknown) =>
        RouterHooks.instance.on(name, fn, ctx),
    ]),
  ),
} as {
  do: typeof RouterHooks.instance.do;
  clear: typeof RouterHooks.instance.clear;
  off: typeof RouterHooks.instance.off;
} & HooksApi;
