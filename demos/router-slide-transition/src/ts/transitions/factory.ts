import type { TransitionData, TransitionDefinition } from "@ribajs/router";
import { slide } from "./slide.js";

export interface SlideTransitionOptions {
  isMatchingNamespace?: (namespace?: string | null) => boolean;
  namePrefix?: string;
}

const getDirection = (data: TransitionData): "next" | "prev" => {
  if (
    data.trigger &&
    typeof data.trigger !== "string" &&
    data.trigger.dataset.direction === "prev"
  ) {
    return "prev";
  }
  return "next";
};

export const createSlideTransitions = (
  options: SlideTransitionOptions = {},
): TransitionDefinition[] => {
  const { isMatchingNamespace = () => true, namePrefix = "slide" } = options;
  const revealNextContainer = (container?: HTMLElement) => {
    if (container) {
      container.style.visibility = "visible";
    }
  };

  return [
    {
      name: `${namePrefix}-next`,
      sync: true,
      custom: (data) =>
        isMatchingNamespace(data.current.namespace) &&
        (!data.next.namespace || isMatchingNamespace(data.next.namespace)) &&
        getDirection(data) === "next",
      beforeEnter: ({ next }) => revealNextContainer(next.container),
      leave: ({ current }) => slide(current.container, "next", "leave"),
      enter: ({ next }) => slide(next.container, "next", "enter"),
    },
    {
      name: `${namePrefix}-prev`,
      sync: true,
      custom: (data) =>
        isMatchingNamespace(data.current.namespace) &&
        (!data.next.namespace || isMatchingNamespace(data.next.namespace)) &&
        getDirection(data) === "prev",
      beforeEnter: ({ next }) => revealNextContainer(next.container),
      leave: ({ current }) => slide(current.container, "prev", "leave"),
      enter: ({ next }) => slide(next.container, "prev", "enter"),
    },
  ];
};
