import type { TransitionDefinition } from "@ribajs/router";
import { once } from "./once.js";
import { slideUp } from "./slideUp.js";
import { morphSvg } from "./svg.js";

export interface SvgTransitionOptions {
  isMatchingNamespace?: (namespace?: string | null) => boolean;
  namePrefix?: string;
  homeNamespace?: string;
  pageNamespace?: string;
  duration?: number;
}

export const createSvgTransitions = (
  options: SvgTransitionOptions = {},
): TransitionDefinition[] => {
  const homeNamespace = options.homeNamespace ?? "home";
  const pageNamespace = options.pageNamespace ?? "page";
  const isMatchingNamespace =
    options.isMatchingNamespace ??
    ((namespace?: string | null) =>
      namespace === homeNamespace || namespace === pageNamespace);
  const namePrefix = options.namePrefix ?? "svg";
  const duration = options.duration ?? 1200;
  const revealNextContainer = (container?: HTMLElement) => {
    if (container) {
      container.style.visibility = "visible";
      container.style.pointerEvents = "auto";
    }
  };

  return [
    {
      name: `${namePrefix}-from-home`,
      sync: true,
      custom: (data) => data.current.namespace === homeNamespace,
      beforeEnter: ({ next }) => {
        if (next.container) {
          next.container.style.visibility = "visible";
          next.container.style.pointerEvents = "auto";
          next.container.style.zIndex = "-1";
        }
      },
      leave: ({ current }) =>
        Promise.all([
          slideUp(current.container, duration, 0, -100),
          morphSvg(current.container, duration),
        ]),
    },
    {
      name: `${namePrefix}-to-home`,
      sync: true,
      custom: (data) => data.current.namespace === pageNamespace,
      beforeEnter: ({ next }) => revealNextContainer(next.container),
      leave: ({ current }) =>
        slideUp(current.container, duration * 0.5, 0, 100),
      enter: ({ next }) => slideUp(next.container, duration * 0.5, -100, 0),
    },
    {
      name: `${namePrefix}-once`,
      custom: (data) =>
        !isMatchingNamespace(data.current.namespace) &&
        data.next.namespace === homeNamespace,
      once: ({ next }) => once(next.container),
    },
  ];
};
