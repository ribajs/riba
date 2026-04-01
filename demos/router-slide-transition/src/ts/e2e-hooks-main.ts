import { Riba, coreModule } from "@ribajs/core";
import { routerModule } from "@ribajs/router";
import type { TransitionDefinition, TransitionData } from "@ribajs/router";

const list = document.getElementById("hooks-list")!;

function append(name: string) {
  const item = document.createElement("li");
  item.textContent = name;
  list.appendChild(item);
}

function sleep(ms = 10) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeHook(name: string) {
  return async (_data: TransitionData) => {
    append(name);
    await sleep();
  };
}

// Register global hooks
const hookNames = [
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

for (const name of hookNames) {
  routerModule.hooks[name](async () => {
    append(`global:${name}`);
    await sleep();
  });
}

const defaultTransition: TransitionDefinition = {
  name: "default",
  custom: (data) => {
    const trigger = data.trigger;
    return (
      trigger === "barba" ||
      (typeof trigger !== "string" && trigger?.id === "link-default")
    );
  },
  beforeOnce: makeHook("beforeOnce"),
  once: makeHook("once"),
  afterOnce: makeHook("afterOnce"),
  before: makeHook("before"),
  beforeLeave: makeHook("beforeLeave"),
  leave: makeHook("leave"),
  afterLeave: makeHook("afterLeave"),
  beforeEnter: makeHook("beforeEnter"),
  enter: makeHook("enter"),
  afterEnter: makeHook("afterEnter"),
  after: makeHook("after"),
};

const syncTransition: TransitionDefinition = {
  name: "sync",
  sync: true,
  custom: (data) => {
    const trigger = data.trigger;
    return typeof trigger !== "string" && trigger?.dataset?.sync === "true";
  },
  beforeOnce: makeHook("beforeOnce"),
  once: makeHook("once"),
  afterOnce: makeHook("afterOnce"),
  before: makeHook("before"),
  beforeLeave: makeHook("beforeLeave"),
  leave: makeHook("leave"),
  afterLeave: makeHook("afterLeave"),
  beforeEnter: makeHook("beforeEnter"),
  enter: makeHook("enter"),
  afterEnter: makeHook("afterEnter"),
  after: makeHook("after"),
};

const riba = new Riba();
riba.module.register(coreModule.init());
riba.module.register(
  routerModule.init({
    transitions: [defaultTransition, syncTransition],
  }),
);
riba.bind(document.body, {});
